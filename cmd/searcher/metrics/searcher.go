package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Searcher Service Metrics
var (
	// QueriesProcessed tracks search query volume
	QueriesProcessed = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "searcher_queries_processed_total",
			Help: "Total number of search queries processed",
		},
		[]string{"status"}, // "success", "error", "no_results"
	)

	// QueryDuration tracks query latency
	QueryDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "searcher_query_duration_seconds",
			Help:    "Query latency distribution (p50, p95, p99)",
			Buckets: []float64{0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0},
		},
		[]string{"query_type"}, // "fulltext", "filtered"
	)

	// ResultsReturned tracks result distribution
	ResultsReturned = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "searcher_results_returned",
			Help:    "Number of results returned per query",
			Buckets: []float64{0, 1, 5, 10, 25, 50, 100},
		},
		[]string{"query_type"},
	)

	// CacheHits tracks cache performance
	CacheHits = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "searcher_cache_hits_total",
			Help: "Total cache hits for query results",
		},
		[]string{"cache_type"}, // "query_results", "index"
	)

	// CacheMisses tracks cache misses
	CacheMisses = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "searcher_cache_misses_total",
			Help: "Total cache misses",
		},
		[]string{"cache_type"},
	)

	// DatabaseErrors tracks query failures
	DatabaseErrors = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "searcher_database_errors_total",
			Help: "Total database query failures",
		},
		[]string{"error_type"}, // "syntax", "timeout", "connection"
	)

	// CacheSize tracks current cache size
	CacheSize = promauto.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "searcher_cache_size_bytes",
			Help: "Current cache size in bytes",
		},
		[]string{"cache_type"},
	)

	// TotalIndices tracks active indices
	TotalIndices = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "searcher_total_indices",
			Help: "Total number of active indices",
		},
	)
)
