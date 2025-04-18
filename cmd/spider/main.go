package main

import (
	"context"
	"fmt"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/prometheus"
	"go.opentelemetry.io/otel/sdk/metric"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"net/http"
	"webcrawler/cmd/spider/handler"
	"webcrawler/cmd/spider/pkg/db"
	"webcrawler/pkg/config"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"
	"webcrawler/pkg/health"
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

	server := handler.New(db.New(), config)

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
	exporter, err := prometheus.New()
	if err != nil {
		log.Fatalf("Failed to create Prometheus exporter: %v", err)
	}
	meterProvider := metric.NewMeterProvider(metric.WithReader(exporter))
	otel.SetMeterProvider(meterProvider)

	// K8s health check
	http.HandleFunc("/health", health.Ok)
	http.Handle("/metrics", promhttp.Handler())

	// Start HTTP server in a separate goroutine
	go func() {
		log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
	}()
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
