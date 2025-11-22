package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Spider Service Metrics
var (
	// PagesFetched tracks the number of pages successfully fetched
	PagesFetched = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "spider_pages_fetched_total",
			Help: "Total number of pages fetched by the spider",
		},
		[]string{"domain"},
	)

	// PagesFailed tracks fetch errors
	PagesFailed = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "spider_pages_failed_total",
			Help: "Total number of failed page fetches",
		},
		[]string{"reason"}, // "timeout", "network", "not_found", etc.
	)

	// RobotsBlocked tracks pages blocked by robots.txt
	RobotsBlocked = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "spider_robots_blocked_total",
			Help: "Total number of pages blocked by robots.txt",
		},
		[]string{"domain"},
	)

	// CrawlDuration tracks time spent crawling
	CrawlDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "spider_crawl_duration_seconds",
			Help:    "Time spent crawling a page",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"domain"},
	)

	// ActiveCrawls tracks currently active crawls
	ActiveCrawls = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "spider_active_crawls",
			Help: "Current number of active crawls",
		},
	)

	// QueueDepth tracks the number of URLs in the crawl queue
	QueueDepth = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "spider_queue_depth",
			Help: "Number of URLs waiting to be crawled",
		},
	)

	// LinksExtracted tracks total links found
	LinksExtracted = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "spider_links_extracted_total",
			Help: "Total number of links extracted from pages",
		},
		[]string{"domain"},
	)
)
