// A simple conductor service that listens to a SQS queue and sends URLs to the spider service.
package main

import (
	"fmt"
	"log/slog"
	"net"
	"os"
	"webcrawler/cmd/searcher/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/generated/service/searcher"
	"webcrawler/pkg/grpcx"

	"github.com/caarlos0/env/v11"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type conf struct {
	DBUsername string `env:"DB_USER"`
	DBPassword string `env:"DB_PASSWORD"`
	DBHost     string `env:"DB_HOST"`
	DBName     string `env:"DB_NAME" envDefault:"databaseName"`
}

func main() {
	// Parse configuration
	cfg := conf{}
	if err := env.Parse(&cfg); err != nil {
		slog.Error("Failed to parse environment config", "err", err)
		os.Exit(1)
	}

	// Connect to database
	db, _, err := dbx.Postgres(cfg.DBUsername, cfg.DBPassword, cfg.DBHost, 5432, cfg.DBName)
	if err != nil {
		slog.Error("Failed to connect to database", "err", err)
		os.Exit(1)
	}
	defer db.Close()

	// GRPC server
	var opts []grpc.ServerOption
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", grpcx.SearcherPort))
	if err != nil {
		panic(err)
	}
	grpcServer := grpc.NewServer(opts...)
	searcher.RegisterSearcherServer(grpcServer, handler.NewRPCServer(db))
	reflection.Register(grpcServer)
	grpcServer.Serve(lis)

	err = bootstrap.Observability()
	if err != nil {
		slog.Error("Failed to initialize observability", "err", err)
		os.Exit(1)
	}

	// Initialize HealthCheck and metrics
	err = bootstrap.HealthCheck()
	if err != nil {
		slog.Error("Failed to initialize health check", "err", err)
		os.Exit(1)
	}

}
