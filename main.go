package main

import (
	"context"
	"github.com/joho/godotenv"
	"log"
	"os"
	"webcrawler/awsx"
	"webcrawler/dynamo_db_x"
	"webcrawler/handler"
	"webcrawler/ignore_list"
	"webcrawler/queue"
)

func main() {
	err := godotenv.Load()
	ctx := context.Background()
	conf := ignore_list.Fetch()
	if err != nil {
		log.Fatalf("Failed to load .env file with error: %v", err)
	}

	if err != nil {
		log.Fatalf("Cannot load the AWS config: %s", err)
	}

	cfg, err := awsx.GetConfig(ctx)
	if err != nil {
		log.Fatalf("Cannot load the AWS config: %s", err)
	}
	sqsClient := queue.New(
		os.Getenv("LINKS_QUEUE"),
		cfg,
	)
	dbClient := dynamo_db_x.New(
		os.Getenv("DB_TABLE_PAGE"),
		os.Getenv("DB_TABLE_WEBSITE"),
		cfg,
	)
	initialLink := queue.NewMessage("https://bbc.co.uk")

	server := handler.New(dbClient, sqsClient, conf)
	err = server.Queue.Add(ctx, initialLink)
	if err != nil {
		log.Printf("adding", err)
		return
	}
	server.Scan(ctx)

}
