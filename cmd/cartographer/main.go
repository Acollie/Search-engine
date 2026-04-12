package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	handler "webcrawler/cmd/cartographer/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"

	"github.com/caarlos0/env/v11"
)

type conf struct {
	DBUsername       string `env:"DB_USER"`
	DBPassword       string `env:"DB_PASSWORD"`
	DBHost           string `env:"DB_HOST"`
	DBName           string `env:"DB_NAME" envDefault:"databaseName"`
	SweepCount       int    `env:"SWEEP_COUNT" envDefault:"100"`
	SweepBreath      int    `env:"SWEEP_BREATH" envDefault:"100000"`
	EnableHTTPTrigger bool   `env:"ENABLE_HTTP_TRIGGER" envDefault:"false"`
}

var (
	ErrMissingDBUsername = fmt.Errorf("missing database username")
	ErrMissingDBPassword = fmt.Errorf("missing database password")
	ErrMissingDBHost     = fmt.Errorf("missing database host")
	ErrMissingDBName     = fmt.Errorf("missing database name")
)

func validateConfig(cfg conf) error {
	if cfg.DBUsername == "" {
		return ErrMissingDBUsername
	}
	if cfg.DBPassword == "" {
		return ErrMissingDBPassword
	}
	if cfg.DBHost == "" {
		return ErrMissingDBHost
	}
	if cfg.DBName == "" {
		return ErrMissingDBName
	}
	return nil
}

func main() {
	// Parse configuration
	cfg := conf{}
	if err := env.Parse(&cfg); err != nil {
		slog.Error("Failed to parse environment config", slog.Any("error", err))
	}
	if err := validateConfig(cfg); err != nil {
		slog.Error("Invalid configuration", slog.Any("error", err))
	}

	// Fallback to os.Getenv if env tags don't work
	if cfg.DBUsername == "" {
		cfg.DBUsername = os.Getenv("DB_USER")
	}
	if cfg.DBPassword == "" {
		cfg.DBPassword = os.Getenv("DB_PASSWORD")
	}
	if cfg.DBHost == "" {
		cfg.DBHost = os.Getenv("DB_HOST")
	}
	if cfg.DBName == "" {
		cfg.DBName = os.Getenv("DB_NAME")
		if cfg.DBName == "" {
			cfg.DBName = "databaseName"
		}
	}

	// Connect to database
	db, _, err := dbx.Postgres(cfg.DBUsername, cfg.DBPassword, cfg.DBHost, 5432, cfg.DBName)
	if err != nil {
		slog.Error("Failed to connect to database", slog.Any("error", err))
	}
	defer db.Close()

	// Initialize observability first
	err = bootstrap.Observability()
	if err != nil {
		slog.Error("Failed to initialize OpenTelemetry", slog.Any("error", err))
		os.Exit(1)
	}

	// Create handler for PageRank computation
	h := handler.New(db, cfg.SweepCount, cfg.SweepBreath)
	hp := &h

	// Start health check server in background
	healthServer := startHealthServer(db, hp, cfg.EnableHTTPTrigger)
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := healthServer.Shutdown(ctx); err != nil {
			slog.Error("Health server shutdown error", slog.Any("error", err))
		}
	}()

	// Handle graceful shutdown with signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	// If HTTP trigger is enabled, wait for signals instead of running immediately
	if cfg.EnableHTTPTrigger {
		slog.Info("HTTP trigger mode enabled - waiting for /compute requests or shutdown signal")
		sig := <-sigChan
		slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))
		db.Close()
		os.Exit(0)
	} else {
		// Normal mode: run once and exit
		go func() {
			sig := <-sigChan
			slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))
			db.Close()
			os.Exit(0)
		}()

		slog.Info("Starting PageRank computation")
		err = hp.Traverse()
		if err != nil {
			slog.Error("PageRank computation failed", slog.Any("error", err))
		}

		slog.Info("PageRank computation completed successfully")
	}
}

type traverser interface {
	Traverse() error
}

func startHealthServer(db interface{ PingContext(context.Context) error }, h traverser, enableHTTPTrigger bool) *http.Server {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()

		if err := db.PingContext(ctx); err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			json.NewEncoder(w).Encode(map[string]string{
				"status": "unhealthy",
				"error":  err.Error(),
			})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"status": "healthy",
		})
	})

	mux.HandleFunc("/ready", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"status": "ready",
		})
	})

	// Add HTTP trigger endpoint for E2E testing
	if enableHTTPTrigger {
		slog.Info("HTTP trigger endpoint /compute enabled")
		mux.HandleFunc("/compute", func(w http.ResponseWriter, r *http.Request) {
			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			slog.Info("Received /compute request, starting PageRank computation")
			err := h.Traverse()
			if err != nil {
				slog.Error("PageRank computation failed", slog.Any("error", err))
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"status": "error",
					"error":  err.Error(),
				})
				return
			}

			slog.Info("PageRank computation completed successfully")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]string{
				"status": "success",
			})
		})
	}

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	go func() {
		slog.Info("Starting health check server on :8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("Health server error", slog.Any("error", err))
		}
	}()

	return server
}
