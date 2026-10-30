package handler

import (
	"context"
	"database/sql"
	"sync"
	"time"
)

// healthStatsTTL is how long the index counts are reused. They only feed the
// health message and the homepage numbers, so a stale-by-seconds value is fine,
// and recomputing them on every call is not.
const healthStatsTTL = 30 * time.Second

// healthStats caches the page and PageRank counts reported by GetHealth.
type healthStats struct {
	mu       sync.Mutex
	ttl      time.Duration
	at       time.Time
	pages    int64
	pagerank int64
	now      func() time.Time
}

func newHealthStats(ttl time.Duration) *healthStats {
	return &healthStats{ttl: ttl, now: time.Now}
}

// get returns the cached counts, refreshing them when older than the TTL.
// Query failures report zero for that count, matching the previous behaviour,
// and are not cached so the next call retries.
func (h *healthStats) get(ctx context.Context, db *sql.DB) (pages, pagerank int64) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if !h.at.IsZero() && h.now().Sub(h.at) < h.ttl {
		return h.pages, h.pagerank
	}

	pages, pagesOK := estimatePages(ctx, db)
	if err := db.QueryRowContext(ctx,
		"SELECT COUNT(*) FROM PageRankResults WHERE is_latest = TRUE").Scan(&pagerank); err != nil {
		pagerank = 0
		pagesOK = false
	}

	if pagesOK {
		h.pages, h.pagerank, h.at = pages, pagerank, h.now()
	}
	return pages, pagerank
}

// estimatePages reads the planner's row estimate for SeenPages, which is free,
// instead of counting every row of a multi-million-row table. The estimate is
// 0 on a table that has never been analysed (fresh or tiny databases), so
// fall back to an exact count there, where it is cheap.
func estimatePages(ctx context.Context, db *sql.DB) (int64, bool) {
	var est int64
	err := db.QueryRowContext(ctx,
		"SELECT GREATEST(reltuples, 0)::bigint FROM pg_class WHERE oid = to_regclass('seenpages')").Scan(&est)
	if err == nil && est > 0 {
		return est, true
	}
	var exact int64
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages").Scan(&exact); err != nil {
		return 0, false
	}
	return exact, true
}
