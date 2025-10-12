package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	SitesProcessed = promauto.NewCounterVec(prometheus.CounterOpts{
		Name: "site_processed",
		Help: "number of sites processed",
	}, []string{})
	Sweeps = promauto.NewCounter(prometheus.CounterOpts{
		Name: "Sweeps",
		Help: "number of times the sweep as run",
	})
)
