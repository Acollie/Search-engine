package main

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
	"webcrawler/cmd/spider/handler"
	"webcrawler/pkg/bootstrap"
	"webcrawler/pkg/config"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"
	"webcrawler/pkg/sqlx"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	databaseName = "databaseName"
)

func main() {
	// Load .env file
	//err := godotenv.Load()
	ctx := context.Background()
	//if err != nil {
	//	log.Fatalf("Failed to load .env file with error: %v", err)
	//}
	var err error

	config := config.Fetch()

	pg, connType, err := dbx.Postgres(
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		5432,
		databaseName,
	)
	if err != nil {
		panic(err)
	}
	defer pg.Close()

	dbConfig := sqlx.New(pg, connType)
	server := handler.New(dbConfig, config)

	initialLinks := []string{
		"https://blog.alexcollie.com/",
		"https://alexcollie.com",

		"https://reddit.com",
		"https://reddit.com/r/golang",
		"https://reddit.com/r/technology",
		"https://reddit.com/r/python",
		"https://reddit.com/r/javascript",
		"https://reddit.com/r/rust",
		"https://reddit.com/r/java",

		"https://bbc.co.uk",
		"https://bbc.co.uk/news",
		"https://bbc.co.uk/sport",
		"https://bbc.co.uk/weather",
		"https://bbc.co.uk/food",

		"https://cnn.com",
		"https://cnn.com/world",
		"https://cnn.com/us",

		"https://news.ycombinator.com",
		"https://news.ycombinator.com/newest",

		"https://hackernews.com",

		"https://techcrunch.com",
		"https://techcrunch.com/startups",

		"https://waitbutwhy.com/",

		"https://arstechnica.com/",

		"https://www.wired.com/",

		"https://www.theverge.com/",
	}

	err = server.Db.Queue.AddLinks(ctx, initialLinks)
	if err != nil {
		// Ignore duplicate key errors - links may already exist
		if !strings.Contains(err.Error(), "duplicate key value") {
			panic(err)
		}
		slog.Warn("Some initial links already exist in queue", slog.Any("error", err))
	}
	// Initialize OpenTelemetry
	err = bootstrap.Observability()
	if err != nil {
		slog.Error("Failed to initialize OpenTelemetry", slog.Any("error", err))
		os.Exit(1)
	}

	// Initialize HealthCheck
	err = bootstrap.HealthCheck()
	if err != nil {
		slog.Error("Failed to initialize HealthCheck", slog.Any("error", err))
		os.Exit(1)
	}

	// GRPC server
	var opts []grpc.ServerOption
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", grpcx.SpiderPort))
	if err != nil {
		panic(err)
	}
	grpcServer := grpc.NewServer(opts...)
	spider.RegisterSpiderServer(grpcServer, handler.NewRPCServer(server.Db))
	reflection.Register(grpcServer)

	// Create cancellable context for crawler
	crawlerCtx, cancelCrawler := context.WithCancel(ctx)
	defer cancelCrawler()

	// Start crawler in background goroutine
	go func() {
		slog.Info("Starting Spider crawler")
		server.Scan(crawlerCtx)
		slog.Info("Spider crawler stopped")
	}()

	// Handle graceful shutdown with signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))

		// Cancel crawler first
		cancelCrawler()

		// Give crawler time to finish current batch
		time.Sleep(2 * time.Second)

		// Stop gRPC server
		grpcServer.GracefulStop()
		pg.Close()
		os.Exit(0)
	}()

	slog.Info("Spider service started",
		slog.Int("grpc_port", grpcx.SpiderPort),
		slog.Int("initial_links", len(initialLinks)))

	// Start serving gRPC
	if err := grpcServer.Serve(lis); err != nil {
		slog.Error("Failed to serve", slog.Any("error", err))
		cancelCrawler()
		os.Exit(1)
	}
}
