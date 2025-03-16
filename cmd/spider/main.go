package main

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"webcrawler/cmd/spider/handler"
	"webcrawler/cmd/spider/pkg/db"
	"webcrawler/pkg/config"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	ctx := context.Background()
	if err != nil {
		log.Fatalf("Failed to load .env file with error: %v", err)
	}

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

	go func() {
		server.Scan(ctx)
	}()
	http.HandleFunc("/seen", func(writer http.ResponseWriter, request *http.Request) {

	})

	http.HandleFunc("/health", func(writer http.ResponseWriter, request *http.Request) {
		fmt.Fprintf(writer, "OK")
	})
}
