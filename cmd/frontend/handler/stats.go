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
	PagesIndexed         int64 `json:"pagesIndexed"`
	CrawledLast24h       int64 `json:"crawledLast24h"`
	QueueDepth           int64 `json:"queueDepth"`
	CrawlRatePerHr       int64 `json:"crawlRatePerHr"`
	UniqueDomains        int64 `json:"uniqueDomains"`
	TotalLinks           int64 `json:"totalLinks"`
	PagesRanked          int64 `json:"pagesRanked"`
	SearchQueriesLast24h int64 `json:"searchQueriesLast24h"`
	SearchQueriesLastHr  int64 `json:"searchQueriesLastHr"`

	// Approximate names the fields above that are sampled estimates rather than
	// exact counts, so the UI can mark them with a "~".
	Approximate []string `json:"approximate,omitempty"`
}

type StatsHandler struct {
	db       *sql.DB
	mu       sync.RWMutex
	cached   *StatsResponse
	cachedAt time.Time
	cacheTTL time.Duration

	// est holds the sampled estimates, which are slower than the counts and
	// change slowly, so they are refreshed far less often than the 5-minute stats.
	// They have their own lock so a slow sample never blocks readers of the
	// cached stats above.
	estMu sync.Mutex
	est   estimates
}

// estimateTTL is how long sampled estimates are reused.
const estimateTTL = time.Hour

type estimates struct {
	at      time.Time
	domains int64
	linkAvg float64 // average outgoing links per page
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
	fresh := h.cached != nil && time.Since(h.cachedAt) < h.cacheTTL
	cached := h.cached
	h.mu.RUnlock()

	if fresh {
		json.NewEncoder(w).Encode(cached) //nolint:errcheck
		return
	}

	stats, err := h.fetchStats(r.Context())
	if err != nil {
		slog.Error("Failed to fetch stats", slog.Any("error", err))
		if cached != nil {
			// Serve the last known-good values rather than leaving the page blank
			// while we're still within the outage.
			json.NewEncoder(w).Encode(cached) //nolint:errcheck
			return
		}
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
// pg_stat_user_tables.n_live_tup gives a fast O(1) approximate total that the
// stats collector keeps current on every write, unlike pg_class.reltuples
// which only updates on ANALYZE and goes stale on high-churn tables like
// Queue — a stale/negative reltuples was falling through to a full COUNT(*)
// on a multi-million-row table and blowing the timeout below. Crawl window
// counts use indexed timestamp ranges and are bounded by the 5-minute cache.
func (h *StatsHandler) fetchStats(ctx context.Context) (*StatsResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	var stats StatsResponse
	row := h.db.QueryRowContext(ctx, `
		SELECT
			CASE
				WHEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'seenpages') IS NOT NULL
				THEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'seenpages')
				ELSE (SELECT COUNT(*) FROM SeenPages)
			END,
			COALESCE((SELECT COUNT(*) FROM SeenPages WHERE crawl_time >= now() - interval '24 hours'), 0),
			CASE
				WHEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'queue') IS NOT NULL
				THEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'queue')
				ELSE (SELECT COUNT(*) FROM Queue WHERE status = 'pending')
			END,
			COALESCE((SELECT COUNT(*) FROM SeenPages WHERE crawl_time >= now() - interval '1 hour'), 0),
			COALESCE((SELECT COUNT(DISTINCT domain) FROM SeenPages WHERE domain IS NOT NULL), 0),
			CASE
				WHEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'links') IS NOT NULL
				THEN (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = 'links')
				ELSE (SELECT COUNT(*) FROM Links)
			END,
			COALESCE((SELECT COUNT(*) FROM PageRankResults WHERE is_latest = true), 0),
			COALESCE((SELECT COUNT(*) FROM SearchSessions WHERE created_at >= now() - interval '24 hours'), 0),
			COALESCE((SELECT COUNT(*) FROM SearchSessions WHERE created_at >= now() - interval '1 hour'), 0)
	`)
	if err := row.Scan(
		&stats.PagesIndexed,
		&stats.CrawledLast24h,
		&stats.QueueDepth,
		&stats.CrawlRatePerHr,
		&stats.UniqueDomains,
		&stats.TotalLinks,
		&stats.PagesRanked,
		&stats.SearchQueriesLast24h,
		&stats.SearchQueriesLastHr,
	); err != nil {
		return nil, err
	}

	h.fillEstimates(ctx, &stats)
	return &stats, nil
}

// fillEstimates replaces counts that the crawler's write path never populates
// with sampled estimates. SeenPages.domain is never filled and the Links table
// is empty (links live in the SeenPages.links text column), so the exact counts
// above read 0. An estimate from a tiny block sample is far closer to the truth
// than a 0, and is flagged in Approximate. Estimates fail independently and
// quietly: a slow or failing sample leaves that figure at its old value and
// never fails the rest of the stats.
func (h *StatsHandler) fillEstimates(ctx context.Context, stats *StatsResponse) {
	needDomains := stats.UniqueDomains == 0
	needLinks := stats.TotalLinks == 0
	if !needDomains && !needLinks {
		return
	}

	h.estMu.Lock()
	if time.Since(h.est.at) >= estimateTTL {
		h.refreshEstimatesLocked(ctx, needDomains, needLinks)
	}
	est := h.est
	h.estMu.Unlock()

	if needDomains && est.domains > 0 {
		stats.UniqueDomains = est.domains
		stats.Approximate = append(stats.Approximate, "uniqueDomains")
	}
	if needLinks && est.linkAvg > 0 {
		stats.TotalLinks = int64(est.linkAvg * float64(stats.PagesIndexed))
		stats.Approximate = append(stats.Approximate, "totalLinks")
	}
}

// refreshEstimatesLocked recomputes the estimates. Caller holds h.estMu.
func (h *StatsHandler) refreshEstimatesLocked(ctx context.Context, needDomains, needLinks bool) {
	fresh := h.est
	ok := false

	if needDomains {
		c, cancel := context.WithTimeout(ctx, 4*time.Second)
		var n int64
		// The host is the third '/'-separated part of "https://host/path".
		err := h.db.QueryRowContext(c, `
			SELECT COUNT(DISTINCT split_part(url, '/', 3))
			FROM SeenPages TABLESAMPLE SYSTEM (0.05)`).Scan(&n)
		cancel()
		if err != nil {
			slog.Warn("stats: domain estimate failed", slog.Any("error", err))
		} else {
			fresh.domains, ok = n, true
		}
	}
	if needLinks {
		c, cancel := context.WithTimeout(ctx, 4*time.Second)
		var avg float64
		// links is '------'-joined and its first entry is the page itself.
		err := h.db.QueryRowContext(c, `
			SELECT COALESCE(AVG(GREATEST(cardinality(string_to_array(links, '------')) - 1, 0)), 0)
			FROM SeenPages TABLESAMPLE SYSTEM (0.02)
			WHERE links IS NOT NULL AND links <> ''`).Scan(&avg)
		cancel()
		if err != nil {
			slog.Warn("stats: link estimate failed", slog.Any("error", err))
		} else {
			fresh.linkAvg, ok = avg, true
		}
	}

	// Only start the hour-long reuse window if something succeeded, so a failure
	// is retried on the next stats refresh rather than hidden for an hour.
	if ok {
		fresh.at = time.Now()
	}
	h.est = fresh
}
