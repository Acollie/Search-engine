// A simple conductor service that listens to a SQS queue and sends URLs to the spider service.
package main

import (
	"log"
	"webcrawler/pkg/bootstrap"
)

func main() {
	err := bootstrap.Observability()
	if err != nil {
		log.Fatalf("Failed to initialize OpenTelemetry: %v", err)
	}

	// Initialize HealthCheck and metrics
	err = bootstrap.HealthCheck()
	if err != nil {
		log.Fatalf("Failed to initialize HealthCheck: %v", err)
	}

}
