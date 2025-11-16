package handler

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
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
	tokens := tokeniser.Tokenise(request.GetQuery())

	// If no tokens, return empty response
	if len(tokens) == 0 {
		return &searcher.SearchResponse{}, nil
	}

	// Set default limit if not provided
	limit := request.GetLimit()
	if limit <= 0 {
		limit = 10
	}

	// Build WHERE clause for token matching
	var whereConditions []string
	var args []interface{}
	argIndex := 1

	for _, token := range tokens {
		whereConditions = append(whereConditions, fmt.Sprintf("url ILIKE $%d", argIndex))
		args = append(args, "%"+token+"%")
		argIndex++
	}

	// Build and execute query - join with SeenPages to get title and body
	query := fmt.Sprintf(`
		SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at
		FROM PageRankResults pr
		INNER JOIN SeenPages sp ON pr.url = sp.url
		WHERE pr.is_latest = TRUE
		AND (%s)
		ORDER BY pr.rank_score DESC
		LIMIT $%d
	`, strings.Join(whereConditions, " OR "), argIndex)

	args = append(args, limit)

	rows, err := c.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query pages: %w", err)
	}
	defer rows.Close()

	// Collect results
	var pages []*site.Page
	for rows.Next() {
		var url string
		var title sql.NullString
		var body sql.NullString
		var rankScore float64
		var computedAt sql.NullTime

		if err := rows.Scan(&url, &title, &body, &rankScore, &computedAt); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		var lastSeen int64
		if computedAt.Valid {
			lastSeen = computedAt.Time.Unix()
		}

		pages = append(pages, &site.Page{
			Url:      url,
			Title:    title.String,
			Body:     body.String,
			LastSeen: lastSeen,
		})
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	return &searcher.SearchResponse{
		Pages: pages,
	}, nil
}
