package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Conductor Service Metrics
var (
	// PagesReceived tracks pages from spider
	PagesReceived = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "conductor_pages_received_total",
			Help: "Total number of pages received from spider",
		},
		[]string{"source"},
	)

	// DuplicatesFound tracks duplicate detections
	DuplicatesFound = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "conductor_duplicates_found_total",
			Help: "Total number of duplicate pages found",
		},
	)

	// NewPagesStored tracks new pages added to database
	NewPagesStored = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "conductor_new_pages_stored_total",
			Help: "Total number of new pages stored in database",
		},
	)

	// ProcessingDuration tracks processing time per page
	ProcessingDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "conductor_processing_duration_seconds",
			Help:    "Time to process a page through conductor",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"operation"}, // "dedup", "store", "queue"
	)

	// QueueDepth tracks queue size
	QueueDepth = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "conductor_queue_depth",
			Help: "Current depth of the URL queue",
		},
	)

	// BackpressureTriggered tracks backpressure events
	BackpressureTriggered = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "conductor_backpressure_triggered_total",
			Help: "Total times backpressure was applied to spider",
		},
	)

	// DatabaseErrors tracks database operation failures
	DatabaseErrors = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "conductor_database_errors_total",
			Help: "Total database operation failures",
		},
		[]string{"operation"}, // "insert", "query", "delete"
	)
)
