package bootstrap

import (
	"fmt"
	"log"
	"net/http"
	"webcrawler/pkg/health"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func HealthCheck() error {
	// K8s health check
	http.HandleFunc("/health", health.Ok)
	http.Handle("/metrics", promhttp.Handler())

	// Start HTTP server in a separate goroutine
	go func() {
		log.Fatal(http.ListenAndServe(fmt.Sprintf("0.0.0.0:%d", PrometheusPort), nil))
	}()
	return nil
}
