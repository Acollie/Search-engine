package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"
	"sync"
	"time"
)

type StatsResponse struct {
	PagesIndexed   int64 `json:"pagesIndexed"`
	CrawledLast24h int64 `json:"crawledLast24h"`
	QueueDepth     int64 `json:"queueDepth"`
	CrawlRatePerHr int64 `json:"crawlRatePerHr"`
}

type StatsHandler struct {
	db       *sql.DB
	mu       sync.RWMutex
	cached   *StatsResponse
	cachedAt time.Time
	cacheTTL time.Duration
}

func NewStatsHandler(db *sql.DB) *StatsHandler {
	return &StatsHandler{
		db:       db,
		cacheTTL: 5 * time.Minute,
	}
}

func (h *StatsHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	h.mu.RLock()
	if h.cached != nil && time.Since(h.cachedAt) < h.cacheTTL {
		cached := h.cached
		h.mu.RUnlock()
		json.NewEncoder(w).Encode(cached) //nolint:errcheck
		return
	}
	h.mu.RUnlock()

	stats, err := h.fetchStats(r.Context())
	if err != nil {
		slog.Error("Failed to fetch stats", slog.Any("error", err))
		w.WriteHeader(http.StatusServiceUnavailable)
		json.NewEncoder(w).Encode(map[string]string{"error": "stats unavailable"}) //nolint:errcheck
		return
	}

	h.mu.Lock()
	h.cached = stats
	h.cachedAt = time.Now()
	h.mu.Unlock()

	json.NewEncoder(w).Encode(stats) //nolint:errcheck
}

// fetchStats queries live counts in a single round-trip.
// pg_class.reltuples gives a fast O(1) approximate total; crawl window counts
// use indexed timestamp ranges and are bounded by the 5-minute cache.
func (h *StatsHandler) fetchStats(ctx context.Context) (*StatsResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	var stats StatsResponse
	row := h.db.QueryRowContext(ctx, `
		SELECT
			CASE
				WHEN (SELECT reltuples FROM pg_class WHERE relname = 'seenpages') >= 0
				THEN (SELECT reltuples::bigint FROM pg_class WHERE relname = 'seenpages')
				ELSE (SELECT COUNT(*) FROM SeenPages)
			END,
			COALESCE((SELECT COUNT(*) FROM SeenPages WHERE crawl_time >= now() - interval '24 hours'), 0),
			COALESCE((SELECT COUNT(*) FROM Queue WHERE status = 'pending'), 0),
			COALESCE((SELECT COUNT(*) FROM SeenPages WHERE crawl_time >= now() - interval '1 hour'), 0)
	`)
	if err := row.Scan(&stats.PagesIndexed, &stats.CrawledLast24h, &stats.QueueDepth, &stats.CrawlRatePerHr); err != nil {
		return nil, err
	}
	return &stats, nil
}
