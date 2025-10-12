package main

import (
	"log"
	handler "webcrawler/cmd/cartographer/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"

	"github.com/caarlos0/env/v11"
)

type conf struct {
	dbUsername string `env:"dbUsername"`
	dbPassword string `env:"dbPassword"`
	dbHost     string `env:"dbHost"`
	dbName     string `env:"dbHost"`
}

func main() {
	cfg := conf{}
	if err := env.Parse(&cfg); err != nil {
		log.Fatalf("%+v", err)
	}
	db, _, err := dbx.Postgres(cfg.dbUsername, cfg.dbPassword, cfg.dbHost, 5432, cfg.dbName)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	h := handler.New(db, sweepCount, sweepBreath)
	err = h.Traverse()
	if err != nil {
		log.Fatal(err)
	}

	// Initialize HealthCheck and metrics
	err = bootstrap.HealthCheck()
	if err != nil {
		log.Fatalf("Failed to initialize HealthCheck: %v", err)
	}
}
