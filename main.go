package main

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
	"webcrawler/awsx"
	"webcrawler/config"
	"webcrawler/dynamoDBx"
	"webcrawler/handler"
	"webcrawler/queue"
	"webcrawler/sqlRelational"
)

func main() {

	ctx := context.Background()
	err := godotenv.Load()
	//ctx := context.Background()
	conf := config.Fetch()
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
	dbClient := dynamoDBx.New(
		os.Getenv("DB_TABLE_PAGE"),
		os.Getenv("DB_TABLE_WEBSITE"),
		cfg,
	)
	sqlClient := sqlRelational.New(
		os.Getenv("SQL_TABLE"),
	)
	initialLink := queue.NewMessage("https://bbc.co.uk")

	server := handler.New(dbClient, sqsClient, sqlClient, conf)
	err = server.Queue.Add(ctx, initialLink)
	if err != nil {
		err = fmt.Errorf("add %s", err)
		panic(err)
	}
	server.Scan(ctx)

}
