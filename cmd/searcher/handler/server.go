package handler

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
	"webcrawler/cmd/searcher/metrics"
	"webcrawler/cmd/searcher/tokeniser"
	"webcrawler/pkg/generated/service/searcher"
	"webcrawler/pkg/generated/types/site"
)

type Handler struct {
	searcher.UnimplementedSearcherServer

	db     *sql.DB
	cache  *resultCache
	health *healthStats
}

func NewRPCServer(db *sql.DB) *Handler {
	return &Handler{
		db:     db,
		cache:  newResultCache(cacheSize(), cacheTTL()),
		health: newHealthStats(healthStatsTTL),
	}
}

// defaultMaxCandidates bounds how many matching rows get ranked. See the
// comment in SearchPages for the measurements behind this value.
const defaultMaxCandidates = 5000

// maxCandidates reads SEARCH_MAX_CANDIDATES so the cap can be tuned against a
// live index without rebuilding the image. Invalid or non-positive values fall
// back to the default rather than disabling the cap.
func maxCandidates() int {
	raw := os.Getenv("SEARCH_MAX_CANDIDATES")
	if raw == "" {
		return defaultMaxCandidates
	}
	n, err := strconv.Atoi(raw)
	if err != nil || n <= 0 {
		return defaultMaxCandidates
	}
	return n
}
func (c *Handler) SearchPages(ctx context.Context, request *searcher.SearchRequest) (*searcher.SearchResponse, error) {
	start := time.Now()
	tokens := tokeniser.Tokenise(request.GetQuery())

	// If no tokens, return empty response
	if len(tokens) == 0 {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.QueriesProcessed.WithLabelValues("no_results").Inc()
		return &searcher.SearchResponse{}, nil
	}

	// Set default limit and offset
	limit := request.GetLimit()
	if limit <= 0 {
		limit = 10
	}
	offset := int32(0)
	if request.GetOffset() > 0 {
		offset = request.GetOffset()
	}

	// Build full-text search query
	// Join tokens with & for AND search
	queryVector := strings.Join(tokens, " & ")

	// Identical queries are served from a short-lived cache, and identical
	// concurrent queries share one database call. The key is the tokenised,
	// lower-cased query (plainto_tsquery lower-cases terms, so case never changes
	// the results) so "Go  Lang" and "go lang" hit the same entry.
	key := fmt.Sprintf("%s|%d|%d", strings.ToLower(queryVector), limit, offset)
	resp, shared, err := c.cache.do(ctx, key, func() (*searcher.SearchResponse, error) {
		return c.runSearch(ctx, queryVector, limit, offset)
	})
	if shared && err == nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.QueriesProcessed.WithLabelValues("cached").Inc()
	}
	return resp, err
}

// runSearch executes the ranked full-text query against Postgres.
func (c *Handler) runSearch(ctx context.Context, queryVector string, limit, offset int32) (*searcher.SearchResponse, error) {
	start := time.Now()

	// Cap the candidate set before ranking. ts_rank has to detoast search_vector
	// for every matching row, so ranking all matches of a common term touched
	// ~4GB of buffers and took 85s -- far past the caller's deadline, which
	// tripped the frontend circuit breaker and took down unrelated queries too.
	// Capping bounds that work: measured on "python" (51,524 matches),
	// uncapped 85.5s, 10,000 candidates 6.8s, 2,000 candidates 1.65s.
	//
	// The trade-off is that for very broad terms we rank an arbitrary slice of
	// the matches rather than all of them, so results are approximate. Returning
	// good-enough results beats timing out and returning none.
	candidates := maxCandidates()
	if min := int(limit + offset); candidates < min {
		candidates = min
	}

	// Full-text search query combining ts_rank (30%) with PageRank score (70%).
	// ts_rank is computed once in the subquery to avoid calling it twice per row.
	//
	// Ranking works on ids and scores only. The text columns are fetched in the
	// outer query for just the page of results being returned, not for every
	// candidate, and body is cut to a snippet in SQL (left(), 2x the 200-rune
	// snippet so multi-byte text still fills it) instead of shipping each
	// result's full body to be truncated in Go.
	query := `
		SELECT sp.url, sp.title, left(sp.body, 400) AS body, sp.description,
			r.pagerank_score, r.text_relevance, r.combined_score, sp.crawl_time
		FROM (
			SELECT id, pagerank_score, text_relevance,
				text_relevance * 0.3 + pagerank_score * 0.7 as combined_score
			FROM (
				SELECT
					c.id,
					COALESCE(pr.score, 0.0) as pagerank_score,
					ts_rank(c.search_vector, plainto_tsquery('english', $1)) as text_relevance
				FROM (
					SELECT sp.id, sp.search_vector
					FROM seenpages sp
					WHERE sp.search_vector @@ plainto_tsquery('english', $1)
					  AND sp.is_indexable = true
					LIMIT $4
				) c
				LEFT JOIN pagerankresults pr ON c.id = pr.page_id AND pr.is_latest = true
			) scored
			ORDER BY combined_score DESC
			LIMIT $2 OFFSET $3
		) r
		JOIN seenpages sp ON sp.id = r.id
		ORDER BY r.combined_score DESC
	`

	rows, err := c.db.QueryContext(ctx, query, queryVector, limit, offset, candidates)
	if err != nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.DatabaseErrors.Inc()
		metrics.QueriesProcessed.WithLabelValues("error").Inc()
		return nil, fmt.Errorf("failed to query pages: %w", err)
	}
	defer rows.Close()

	// Collect results
	var pages []*site.Page
	for rows.Next() {
		var url string
		var title sql.NullString
		var body sql.NullString
		var description sql.NullString
		var pagerankScore float64
		var textRelevance float64
		var combinedScore float64
		var crawlTime sql.NullTime

		if err := rows.Scan(&url, &title, &body, &description, &pagerankScore, &textRelevance, &combinedScore, &crawlTime); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		var lastSeen int64
		if crawlTime.Valid {
			lastSeen = crawlTime.Time.Unix()
		}

		// Create snippet from description or body
		snippet := description.String
		if snippet == "" && body.Valid {
			// Truncate at rune boundary to avoid splitting multi-byte UTF-8 sequences
			runes := []rune(body.String)
			if len(runes) > 200 {
				snippet = string(runes[:200]) + "..."
			} else {
				snippet = body.String
			}
		}

		pages = append(pages, &site.Page{
			Url:      strings.ToValidUTF8(url, ""),
			Title:    strings.ToValidUTF8(title.String, ""),
			Body:     strings.ToValidUTF8(snippet, ""),
			LastSeen: lastSeen,
		})
	}

	if err := rows.Err(); err != nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.DatabaseErrors.Inc()
		metrics.QueriesProcessed.WithLabelValues("error").Inc()
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	metrics.QueryDuration.Observe(time.Since(start).Seconds())
	metrics.ResultsReturned.Observe(float64(len(pages)))
	if len(pages) > 0 {
		metrics.QueriesProcessed.WithLabelValues("success").Inc()
	} else {
		metrics.QueriesProcessed.WithLabelValues("no_results").Inc()
	}

	return &searcher.SearchResponse{
		Pages: pages,
	}, nil
}

func (c *Handler) GetHealth(ctx context.Context, req *searcher.HealthRequest) (*searcher.HealthResponse, error) {
	// Check database connection
	if err := c.db.PingContext(ctx); err != nil {
		return &searcher.HealthResponse{
			Healthy: false,
			Message: fmt.Sprintf("database unhealthy: %v", err),
		}, nil
	}

	// Index counts are cached briefly and the page count is a planner estimate:
	// an exact COUNT(*) over SeenPages is a full scan of a multi-GB table.
	pagesCount, pagerankCount := c.health.get(ctx, c.db)

	message := "searcher operational"
	if pagerankCount == 0 {
		message = "no PageRank data available (degraded)"
	}

	return &searcher.HealthResponse{
		Healthy:         true,
		Message:         message,
		PagesIndexed:    pagesCount,
		PagerankResults: pagerankCount,
	}, nil
}
