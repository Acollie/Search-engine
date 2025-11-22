// A simple conductor service that listens to a SQS queue and sends URLs to the spider service.
package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"webcrawler/cmd/conductor/handler"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/awsx"
	"webcrawler/pkg/awsx/queue"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"

	"github.com/caarlos0/env/v11"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// Config holds all configuration for the conductor service
type Config struct {
	// Database configuration
	DBUser     string `env:"DB_USER" envDefault:"postgres"`
	DBPassword string `env:"DB_PASSWORD" envDefault:"example"`
	DBHost     string `env:"DB_HOST" envDefault:"localhost"`
	DBPort     int    `env:"DB_PORT" envDefault:"5432"`
	DBName     string `env:"DB_NAME" envDefault:"main"`

	// Spider service configuration
	SpiderHost string `env:"SPIDER_HOST" envDefault:"0.0.0.0"`

	// SQS Queue configuration
	QueueURL string `env:"QUEUE_URL,required"`

	// AWS configuration
	AWSRegion string `env:"AWS_REGION" envDefault:"eu-west-1"`
}

func main() {
	// Parse configuration from environment variables
	cfg := Config{}
	if err := env.Parse(&cfg); err != nil {
		slog.Error("Failed to parse configuration", slog.Any("error", err))
		os.Exit(1)
	}

	slog.Info("Starting Conductor service",
		slog.String("db_host", cfg.DBHost),
		slog.Int("db_port", cfg.DBPort),
		slog.String("db_name", cfg.DBName),
		slog.String("spider_host", cfg.SpiderHost),
		slog.String("queue_url", cfg.QueueURL))

	ctx := context.Background()

	// Initialize AWS configuration
	awsConfig, err := awsx.GetConfig(ctx)
	if err != nil {
		slog.Error("Failed to get AWS config", slog.Any("error", err))
		os.Exit(1)
	}

	// Connect to PostgreSQL
	db, _, err := dbx.Postgres(cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)
	if err != nil {
		slog.Error("Failed to connect to PostgreSQL", slog.Any("error", err))
		os.Exit(1)
	}
	defer db.Close()
	slog.Info("Connected to PostgreSQL successfully")

	// Initialize SQS client
	sqsClient := queue.New(cfg.QueueURL, awsConfig)
	slog.Info("Initialized SQS client")

	// Connect to Spider service via gRPC
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	conn, err := grpc.NewClient(fmt.Sprintf("%s:%d", cfg.SpiderHost, grpcx.SpiderPort), opts...)
	if err != nil {
		slog.Error("Failed to connect to Spider service", slog.Any("error", err))
		os.Exit(1)
	}
	defer conn.Close()
	slog.Info("Connected to Spider service", slog.String("address", fmt.Sprintf("%s:%d", cfg.SpiderHost, grpcx.SpiderPort)))

	// Initialize handler
	spiderClient := spider.NewSpiderClient(conn)
	adder := site.NewAdder(db)
	h := handler.New(adder, sqsClient, spiderClient)

	// Initialize OpenTelemetry
	if err := bootstrap.Observability(); err != nil {
		slog.Error("Failed to initialize OpenTelemetry", slog.Any("error", err))
		os.Exit(1)
	}
	slog.Info("OpenTelemetry initialized")

	// Initialize HealthCheck and metrics
	if err := bootstrap.HealthCheck(); err != nil {
		slog.Error("Failed to initialize HealthCheck", slog.Any("error", err))
		os.Exit(1)
	}
	slog.Info("HealthCheck and metrics initialized")

	// Create a wait group and context for graceful shutdown
	var wg sync.WaitGroup
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	// Start the listener in a goroutine
	wg.Add(1)
	go func() {
		defer wg.Done()
		h.Listen(ctx)
	}()

	// Handle graceful shutdown with signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	sig := <-sigChan
	slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))

	// Cancel context to stop listener
	cancel()

	// Wait for listener to finish with timeout
	done := make(chan struct{})
	go func() {
		wg.Wait()
		close(done)
	}()

	select {
	case <-done:
		slog.Info("Listener stopped gracefully")
	case <-sigChan:
		slog.Warn("Force shutdown requested")
	}

	// Close connections
	conn.Close()
	db.Close()
	slog.Info("Conductor service stopped")
}
