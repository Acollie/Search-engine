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

	db *sql.DB
}

func NewRPCServer(db *sql.DB) *Handler {
	return &Handler{
		db: db,
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
	query := `
		SELECT url, title, body, description, pagerank_score, text_relevance,
			text_relevance * 0.3 + pagerank_score * 0.7 as combined_score,
			crawl_time
		FROM (
			SELECT
				c.url,
				c.title,
				c.body,
				c.description,
				COALESCE(pr.score, 0.0) as pagerank_score,
				ts_rank(c.search_vector, plainto_tsquery('english', $1)) as text_relevance,
				c.crawl_time
			FROM (
				SELECT sp.id, sp.url, sp.title, sp.body, sp.description,
				       sp.search_vector, sp.crawl_time
				FROM seenpages sp
				WHERE sp.search_vector @@ plainto_tsquery('english', $1)
				  AND sp.is_indexable = true
				LIMIT $4
			) c
			LEFT JOIN pagerankresults pr ON c.id = pr.page_id AND pr.is_latest = true
		) sub
		ORDER BY combined_score DESC
		LIMIT $2 OFFSET $3
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

	// Get count of indexed pages
	var pagesCount int64
	err := c.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages").Scan(&pagesCount)
	if err != nil {
		pagesCount = 0
	}

	// Get count of latest PageRank results
	var pagerankCount int64
	err = c.db.QueryRowContext(ctx,
		"SELECT COUNT(*) FROM PageRankResults WHERE is_latest = TRUE").Scan(&pagerankCount)
	if err != nil {
		pagerankCount = 0
	}

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
