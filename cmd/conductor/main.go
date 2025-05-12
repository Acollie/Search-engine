package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"os"
	"webcrawler/cmd/conductor/handler"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/awsx"
	"webcrawler/pkg/awsx/queue"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"
)

const (
	spiderURL = "0.0.0.0"
)

var (
	queueUrl = os.Getenv("QUEUE_URL")
)

func main() {
	ctx := context.Background()
	awsConfig, err := awsx.GetConfig(ctx)
	if err != nil {
		panic(err)
	}

	// postgres
	db, _, err := dbx.Postgres("admin", "example", "localhost", 5432, "main")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	sqsClient := queue.New(queueUrl, awsConfig)

	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	conn, err := grpc.NewClient(fmt.Sprintf("%s:%d", spiderURL, grpcx.SpiderPort), opts...)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	spiderClient := spider.NewSpiderClient(conn)
	adder := site.NewAdder(db)
	h := handler.New(adder, sqsClient, spiderClient)

	go func() {
		h.Listen(ctx)
	}()
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

}
