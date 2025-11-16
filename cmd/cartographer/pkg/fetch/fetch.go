package fetch

import (
	"database/sql"
	"log/slog"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/slice"
)

const (
	// PostgreSQL random sampling query
	// Uses TABLESAMPLE for efficient random sampling on large tables
	randomSampleQuery = `
		SELECT url, title, body, prominence, links
		FROM SeenPages
		ORDER BY RANDOM()
		LIMIT $1;`
)

// Fetch retrieves a random sample of pages from the SeenPages table
// limit: number of random pages to fetch
func Fetch(db *sql.DB, limit int) []*site.Page {
	if db == nil {
		slog.Error("Database connection is nil")
		return []*site.Page{}
	}

	rows, err := db.Query(randomSampleQuery, limit)
	if err != nil {
		slog.Error("Error fetching random pages", slog.Any("error", err))
		return []*site.Page{}
	}
	defer rows.Close()

	var pages []*site.Page
	for rows.Next() {
		page := &site.Page{}
		var linksStr string

		err := rows.Scan(
			&page.URL,
			&page.Title,
			&page.Body,
			&page.ProminenceValue,
			&linksStr,
		)
		if err != nil {
			slog.Error("Error scanning page row", slog.Any("error", err))
			continue
		}

		// Convert stored links string to array
		page.Links = slice.StringToArray(linksStr)
		if page.Links == nil {
			page.Links = []string{}
		}
		pages = append(pages, page)
	}

	if err = rows.Err(); err != nil {
		slog.Error("Error iterating page rows", slog.Any("error", err))
		return []*site.Page{}
	}

	slog.Info("Fetched random pages for PageRank computation", slog.Int("count", len(pages)))
	return pages
}
