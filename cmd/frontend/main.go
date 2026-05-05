package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"webcrawler/cmd/frontend/handler"
	"webcrawler/pkg/bootstrap"

	"github.com/caarlos0/env/v11"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type config struct {
	Port         string  `env:"PORT" envDefault:"3000"`
	HealthPort   string  `env:"HEALTH_PORT" envDefault:"8080"`
	SearcherHost string  `env:"SEARCHER_HOST" envDefault:"localhost"`
	SearcherPort string  `env:"SEARCHER_PORT" envDefault:"9002"`
	RateLimitRPS float64 `env:"RATE_LIMIT_RPS" envDefault:"10"`
	RateLimitBurst int   `env:"RATE_LIMIT_BURST" envDefault:"20"`
}

func main() {
	// Parse configuration
	cfg := config{}
	if err := env.Parse(&cfg); err != nil {
		slog.Error("Failed to parse environment config", slog.Any("error", err))
		os.Exit(1)
	}

	// Initialize observability
	if err := bootstrap.Observability(); err != nil {
		slog.Error("Failed to initialize OpenTelemetry", slog.Any("error", err))
		os.Exit(1)
	}

	// Initialize gRPC client to Searcher service
	searcherAddr := fmt.Sprintf("%s:%s", cfg.SearcherHost, cfg.SearcherPort)
	searchHandler, err := handler.NewSearchHandler(searcherAddr)
	if err != nil {
		slog.Error("Failed to create search handler", slog.Any("error", err))
		os.Exit(1)
	}
	defer searchHandler.Close()

	// Create HTTP router
	mux := http.NewServeMux()

	// Register handlers
	mux.HandleFunc("/", searchHandler.HandleIndex)
	mux.HandleFunc("/search", searchHandler.HandleSearch)

	// Serve static files
	fs := http.FileServer(http.Dir("cmd/frontend/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Apply per-IP+Host rate limiting to all user-facing traffic.
	// Static assets are also wrapped so that scraper floods don't bypass limits.
	rateLimited := handler.RateLimitMiddleware(cfg.RateLimitRPS, cfg.RateLimitBurst, mux)

	// Main HTTP server for user traffic
	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      rateLimited,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Health check server
	healthMux := http.NewServeMux()
	healthMux.HandleFunc("/health", handler.HealthCheckHandler)
	healthMux.HandleFunc("/ready", handler.ReadinessHandler)
	healthMux.Handle("/metrics", promhttp.Handler())

	healthServer := &http.Server{
		Addr:         ":" + cfg.HealthPort,
		Handler:      healthMux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	// Start health server in background
	go func() {
		slog.Info("Starting health check server", slog.String("port", cfg.HealthPort))
		if err := healthServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("Health server error", slog.Any("error", err))
		}
	}()

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			slog.Error("Server shutdown error", slog.Any("error", err))
		}
		if err := healthServer.Shutdown(ctx); err != nil {
			slog.Error("Health server shutdown error", slog.Any("error", err))
		}
	}()

	// Start main server
	slog.Info("Starting frontend server", slog.String("port", cfg.Port))
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("Server error", slog.Any("error", err))
		os.Exit(1)
	}

	slog.Info("Server stopped gracefully")
}
