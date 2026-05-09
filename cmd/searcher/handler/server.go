package handler

import (
	"context"
	"database/sql"
	"fmt"
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

	// Full-text search query combining ts_rank (30%) with PageRank score (70%)
	query := `
		SELECT
			sp.url,
			sp.title,
			sp.body,
			sp.description,
			COALESCE(pr.score, 0.0) as pagerank_score,
			ts_rank(sp.search_vector, plainto_tsquery('english', $1)) as text_relevance,
			(ts_rank(sp.search_vector, plainto_tsquery('english', $1)) * 0.3 +
			 COALESCE(pr.score, 0.0) * 0.7) as combined_score,
			sp.crawl_time
		FROM seenpages sp
		LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
		WHERE sp.search_vector @@ plainto_tsquery('english', $1)
		  AND sp.is_indexable = true
		ORDER BY combined_score DESC
		LIMIT $2 OFFSET $3
	`

	rows, err := c.db.QueryContext(ctx, query, queryVector, limit, offset)
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
			// Take first 200 characters of body as snippet
			snippet = body.String
			if len(snippet) > 200 {
				snippet = snippet[:200] + "..."
			}
		}

		pages = append(pages, &site.Page{
			Url:      url,
			Title:    title.String,
			Body:     snippet,
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
