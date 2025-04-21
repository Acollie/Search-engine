package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"os"
	"webcrawler/cmd/spider/handler"
	"webcrawler/pkg/bootstrap"
	"webcrawler/pkg/config"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"
	"webcrawler/pkg/sqlRelational"
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

	dbConfig := sqlRelational.New(pg, connType)
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
		panic(err)
	}
	// Initialize OpenTelemetry
	err = bootstrap.Observability()
	if err != nil {
		log.Fatalf("Failed to initialize OpenTelemetry: %v", err)
	}

	// Initialize HealthCheck
	err = bootstrap.HealthCheck()
	if err != nil {
		log.Fatalf("Failed to initialize HealthCheck: %v", err)
	}

	//go func() {
	//	server.Scan(ctx)
	//}()

	// GRPC server
	var opts []grpc.ServerOption
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", grpcx.SpiderPort))
	if err != nil {
		panic(err)
	}
	grpcServer := grpc.NewServer(opts...)
	spider.RegisterSpiderServer(grpcServer, handler.NewRPCServer(server.Db))
	reflection.Register(grpcServer)
	grpcServer.Serve(lis)

}
