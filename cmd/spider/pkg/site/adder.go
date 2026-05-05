package site

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/url"
	"strings"
	"time"

	"github.com/lib/pq"
)

type Adder struct {
	db *sql.DB
}

func NewAdder(db *sql.DB) *Adder {
	return &Adder{
		db: db,
	}
}

// Add inserts a crawled page into the SeenPages table with deduplication
func (a *Adder) Add(ctx context.Context, page Page) error {
	// Extract domain from URL
	domain, err := extractDomain(page.URL)
	if err != nil {
		return fmt.Errorf("invalid URL %s: %w", page.URL, err)
	}

	// Sanitize text fields to valid UTF-8 before inserting into PostgreSQL
	page.Title = strings.ToValidUTF8(page.Title, "")
	page.Body = strings.ToValidUTF8(page.Body, "")
	for k, v := range page.Meta {
		page.Meta[k] = strings.ToValidUTF8(v, "")
	}

	// Convert meta map to JSONB
	metaJSON, err := json.Marshal(page.Meta)
	if err != nil {
		return fmt.Errorf("failed to marshal meta: %w", err)
	}

	// Insert into SeenPages table
	query := `
		INSERT INTO SeenPages (
			url, title, description, body, headers,
			crawl_time, domain, is_indexable
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		ON CONFLICT (url) DO NOTHING
		RETURNING id
	`

	var pageID int
	err = a.db.QueryRowContext(
		ctx,
		query,
		page.URL,
		page.Title,
		extractDescription(page.Meta),
		page.Body,
		metaJSON,
		time.Unix(int64(page.CrawledDate), 0),
		domain,
		true, // is_indexable
	).Scan(&pageID)

	if err != nil {
		// If no rows were returned, it's a duplicate (ON CONFLICT triggered)
		if err == sql.ErrNoRows {
			return fmt.Errorf("duplicate key value violates unique constraint")
		}
		// Check for PostgreSQL unique violation error
		if pqErr, ok := err.(*pq.Error); ok && pqErr.Code == "23505" {
			return fmt.Errorf("duplicate key value violates unique constraint")
		}
		return fmt.Errorf("failed to insert page: %w", err)
	}

	// Insert links into Links table if we have a page ID
	if pageID > 0 && len(page.Links) > 0 {
		if err := a.insertLinks(ctx, pageID, page.Links); err != nil {
			slog.Warn("Failed to insert links",
				slog.Int("page_id", pageID),
				slog.Any("error", err))
		}
	}

	// Also insert links into Queue table for future crawling
	if len(page.Links) > 0 {
		if err := a.insertIntoQueue(ctx, page.Links); err != nil {
			slog.Warn("Failed to insert links into queue",
				slog.String("url", page.URL),
				slog.Any("error", err))
		}
	}

	return nil
}

// insertLinks inserts link relationships into the Links table
func (a *Adder) insertLinks(ctx context.Context, sourcePageID int, links []string) error {
	if len(links) == 0 {
		return nil
	}

	// Build batch insert query
	valueStrings := make([]string, 0, len(links))
	valueArgs := make([]interface{}, 0, len(links)*2)
	argPosition := 1

	for _, link := range links {
		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d)", argPosition, argPosition+1))
		valueArgs = append(valueArgs, sourcePageID, link)
		argPosition += 2
	}

	query := fmt.Sprintf(`
		INSERT INTO Links (source_page_id, target_url)
		VALUES %s
		ON CONFLICT DO NOTHING
	`, strings.Join(valueStrings, ","))

	_, err := a.db.ExecContext(ctx, query, valueArgs...)
	if err != nil {
		return fmt.Errorf("failed to insert links: %w", err)
	}

	return nil
}

// insertIntoQueue adds new URLs to the Queue table for future crawling
func (a *Adder) insertIntoQueue(ctx context.Context, links []string) error {
	if len(links) == 0 {
		return nil
	}

	// Build batch insert query
	valueStrings := make([]string, 0, len(links))
	valueArgs := make([]interface{}, 0, len(links)*2)
	argPosition := 1

	for _, link := range links {
		domain, err := extractDomain(link)
		if err != nil {
			continue // Skip invalid URLs
		}

		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d)", argPosition, argPosition+1))
		valueArgs = append(valueArgs, link, domain)
		argPosition += 2
	}

	if len(valueStrings) == 0 {
		return nil
	}

	query := fmt.Sprintf(`
		INSERT INTO Queue (url, domain, status, priority)
		VALUES %s
		ON CONFLICT (url) DO NOTHING
	`, strings.Join(valueStrings, ","))

	_, err := a.db.ExecContext(ctx, query, valueArgs...)
	if err != nil {
		return fmt.Errorf("failed to insert into queue: %w", err)
	}

	return nil
}

// extractDomain extracts the domain from a URL
func extractDomain(rawURL string) (string, error) {
	parsedURL, err := url.Parse(rawURL)
	if err != nil {
		return "", err
	}
	return parsedURL.Host, nil
}

// extractDescription extracts description from meta tags
func extractDescription(meta map[string]string) string {
	if desc, ok := meta["description"]; ok {
		return desc
	}
	if desc, ok := meta["og:description"]; ok {
		return desc
	}
	return ""
}
