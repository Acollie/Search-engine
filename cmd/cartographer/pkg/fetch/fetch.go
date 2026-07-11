package fetch

import (
	"context"
	"database/sql"
	"log/slog"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/slice"
)

// fetchTimeout bounds a single random-sample query. Without it, a query
// stuck on a stalled/half-open connection blocks forever (db.Query has no
// timeout of its own), which can wedge an entire CronJob run indefinitely.
const fetchTimeout = 30 * time.Second

const (
	// PostgreSQL random sampling query
	// NOTE: this is ORDER BY RANDOM(), not TABLESAMPLE - it does a full table
	// sort and gets slower as SeenPages grows. Left as-is (a query rewrite is
	// a behavior change, not made without sign-off); flagged as a follow-up.
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

	ctx, cancel := context.WithTimeout(context.Background(), fetchTimeout)
	defer cancel()

	rows, err := db.QueryContext(ctx, randomSampleQuery, limit)
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
