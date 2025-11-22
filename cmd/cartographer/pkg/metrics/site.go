package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Cartographer Service Metrics
var (
	// SweepsCompleted tracks completed PageRank sweeps
	SweepsCompleted = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "cartographer_sweeps_completed_total",
			Help: "Total number of completed PageRank sweeps",
		},
	)

	// SweepDuration tracks time per sweep
	SweepDuration = promauto.NewHistogram(
		prometheus.HistogramOpts{
			Name:    "cartographer_sweep_duration_seconds",
			Help:    "Time taken for a single PageRank sweep",
			Buckets: prometheus.DefBuckets,
		},
	)

	// PagesRanked tracks pages processed per sweep
	PagesRanked = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "cartographer_pages_ranked_total",
			Help: "Total number of pages assigned PageRank scores",
		},
	)

	// ConvergenceIterations tracks iterations to convergence
	ConvergenceIterations = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "cartographer_convergence_iterations",
			Help:    "Number of iterations required for convergence",
			Buckets: []float64{1, 5, 10, 15, 20},
		},
		[]string{"sweep_id"},
	)

	// ScoreDelta tracks score changes between sweeps
	ScoreDelta = promauto.NewHistogram(
		prometheus.HistogramOpts{
			Name:    "cartographer_score_delta",
			Help:    "Average score delta between PageRank sweeps",
			Buckets: []float64{0.0001, 0.001, 0.01, 0.1, 1.0},
		},
	)

	// Errors tracks computation failures
	Errors = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "cartographer_errors_total",
			Help: "Total errors during PageRank computation",
		},
		[]string{"error_type"}, // "fetch", "compute", "store"
	)

	// ActiveSweep tracks if sweep is running
	ActiveSweep = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "cartographer_active_sweep",
			Help: "Whether a PageRank sweep is currently running (1=yes, 0=no)",
		},
	)

	// SitesProcessed (deprecated: use PagesRanked instead)
	SitesProcessed = promauto.NewCounterVec(prometheus.CounterOpts{
		Name: "site_processed",
		Help: "number of sites processed (deprecated)",
	}, []string{})

	// Sweeps (deprecated: use SweepsCompleted instead)
	Sweeps = promauto.NewCounter(prometheus.CounterOpts{
		Name: "sweeps_completed_total",
		Help: "number of times the sweep has run (deprecated)",
	})
)
