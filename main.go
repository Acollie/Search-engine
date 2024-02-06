package main

import (
	"context"
	"github.com/joho/godotenv"
	"log"
	"os"
	"webcrawler/awsx"
	"webcrawler/database"
	"webcrawler/handler"
	"webcrawler/queue"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	ctx := context.Background()
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
	dbClient := database.New(
		os.Getenv("DB_TABLE_PAGE"),
		os.Getenv("DB_TABLE_WEBSITE"),
		cfg,
	)
	//initalLink := queue.NewMessage("https://alexcollie.com")

	server := handler.New(dbClient, sqsClient)
	server.Scan(ctx)

}
