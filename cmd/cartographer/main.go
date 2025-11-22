package main

import (
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	handler "webcrawler/cmd/cartographer/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"

	"github.com/caarlos0/env/v11"
)

type conf struct {
	DBUsername  string `env:"DB_USER"`
	DBPassword  string `env:"DB_PASSWORD"`
	DBHost      string `env:"DB_HOST"`
	DBName      string `env:"DB_NAME" envDefault:"databaseName"`
	SweepCount  int    `env:"SWEEP_COUNT" envDefault:"100"`
	SweepBreath int    `env:"SWEEP_BREATH" envDefault:"100000"`
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

	// Handle graceful shutdown with signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))
		db.Close()
		os.Exit(0)
	}()

	slog.Info("Starting PageRank computation")
	// Run PageRank computation
	h := handler.New(db, cfg.SweepCount, cfg.SweepBreath)
	err = h.Traverse()
	if err != nil {
		slog.Error("PageRank computation failed", slog.Any("error", err))
	}

	slog.Info("PageRank computation completed successfully")

}
