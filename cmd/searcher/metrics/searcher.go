package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Searcher Service Metrics (Low Cardinality)
var (
	// QueriesProcessed tracks search query volume by success/error/no_results
	QueriesProcessed = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "searcher_queries_processed_total",
			Help: "Total number of search queries processed",
		},
		[]string{"status"}, // "success", "error", "no_results"
	)

	// QueryDuration tracks query latency (no query_type label to reduce cardinality)
	QueryDuration = promauto.NewHistogram(
		prometheus.HistogramOpts{
			Name:    "searcher_query_duration_seconds",
			Help:    "Query latency distribution (p50, p95, p99)",
			Buckets: []float64{0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0},
		},
	)

	// ResultsReturned tracks result count distribution (no query_type label)
	ResultsReturned = promauto.NewHistogram(
		prometheus.HistogramOpts{
			Name:    "searcher_results_returned",
			Help:    "Number of results returned per query",
			Buckets: []float64{0, 1, 5, 10, 25, 50, 100},
		},
	)

	// DatabaseErrors tracks total query failures (no error_type label)
	DatabaseErrors = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "searcher_database_errors_total",
			Help: "Total database query failures",
		},
	)

	// TotalIndices tracks active indices
	TotalIndices = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "searcher_total_indices",
			Help: "Total number of active indices",
		},
	)
)
