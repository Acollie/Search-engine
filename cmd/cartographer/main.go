package main

import (
	"log"
	"os"
	handler "webcrawler/cmd/cartographer/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"

	"github.com/caarlos0/env/v11"
)

type conf struct {
	DBUsername string `env:"DB_USER"`
	DBPassword string `env:"DB_PASSWORD"`
	DBHost     string `env:"DB_HOST"`
	DBName     string `env:"DB_NAME" envDefault:"databaseName"`
}

func main() {
	// Initialize observability first
	err := bootstrap.Observability()
	if err != nil {
		log.Printf("Warning: Failed to initialize OpenTelemetry: %v", err)
	}

	// Parse configuration
	cfg := conf{}
	if err := env.Parse(&cfg); err != nil {
		log.Fatalf("Failed to parse environment config: %+v", err)
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

	log.Printf("Connecting to database at %s as %s", cfg.DBHost, cfg.DBUsername)

	// Connect to database
	db, _, err := dbx.Postgres(cfg.DBUsername, cfg.DBPassword, cfg.DBHost, 5432, cfg.DBName)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	log.Printf("Starting PageRank computation: %d sweeps, %d pages per sweep", sweepCount, sweepBreath)

	// Run PageRank computation
	h := handler.New(db, sweepCount, sweepBreath)
	err = h.Traverse()
	if err != nil {
		log.Fatalf("PageRank computation failed: %v", err)
	}

	log.Println("PageRank computation completed successfully")
}
