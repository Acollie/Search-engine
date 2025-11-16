package push

import (
	"database/sql"
	"fmt"
	"log/slog"
	"time"
	"webcrawler/cmd/cartographer/pkg/graph"
)

const (
	createTableSQL = `
		CREATE TABLE IF NOT EXISTS PageRankResults (
			url VARCHAR(768) NOT NULL,
			rank_score FLOAT NOT NULL,
			incoming_links INT DEFAULT 0,
			outgoing_links INT DEFAULT 0,
			sweep_id VARCHAR(100) NOT NULL,
			computed_at TIMESTAMP DEFAULT NOW(),
			algorithm_name VARCHAR(50) DEFAULT 'damped_pagerank',
			is_latest BOOLEAN DEFAULT FALSE,
			PRIMARY KEY (url, sweep_id)
		);`

	createIndexLatest = `
		CREATE INDEX IF NOT EXISTS idx_latest_rank
		ON PageRankResults(rank_score DESC)
		WHERE is_latest = TRUE;`

	createIndexSweep = `
		CREATE INDEX IF NOT EXISTS idx_sweep
		ON PageRankResults(sweep_id);`

	unsetLatestSQL = `
		UPDATE PageRankResults
		SET is_latest = FALSE
		WHERE is_latest = TRUE;`

	insertRankSQL = `
		INSERT INTO PageRankResults
		(url, rank_score, incoming_links, outgoing_links, sweep_id, algorithm_name, is_latest)
		VALUES ($1, $2, $3, $4, $5, $6, TRUE)
		ON CONFLICT (url, sweep_id)
		DO UPDATE SET
			rank_score = EXCLUDED.rank_score,
			incoming_links = EXCLUDED.incoming_links,
			outgoing_links = EXCLUDED.outgoing_links,
			is_latest = TRUE;`
)

// Push saves PageRank computation results to the database
func Push(db *sql.DB, g graph.Graph, indexName string, sweepTime time.Time) error {
	// Create table and indices if they don't exist
	if _, err := db.Exec(createTableSQL); err != nil {
		return fmt.Errorf("failed to create PageRankResults table: %w", err)
	}

	if _, err := db.Exec(createIndexLatest); err != nil {
		slog.Warn("Failed to create idx_latest_rank", slog.Any("error", err))
	}

	if _, err := db.Exec(createIndexSweep); err != nil {
		slog.Warn("Failed to create idx_sweep", slog.Any("error", err))
	}

	// Generate sweep ID if not provided
	sweepID := indexName
	if sweepID == "" {
		sweepID = fmt.Sprintf("pagerank_%s", sweepTime.Format("20060102_150405"))
	}

	// Begin transaction
	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Unset previous latest flags
	if _, err := tx.Exec(unsetLatestSQL); err != nil {
		return fmt.Errorf("failed to unset latest flags: %w", err)
	}

	// Insert all page ranks
	insertedCount := 0
	for url, page := range g {
		// Convert int prominence back to float rank score
		rankScore := float64(page.ProminenceValue) / graph.ScaleFactor

		// Count incoming and outgoing links
		incomingLinks := countIncomingLinks(g, url)
		outgoingLinks := len(page.Links)

		_, err := tx.Exec(
			insertRankSQL,
			url,
			rankScore,
			incomingLinks,
			outgoingLinks,
			sweepID,
			"damped_pagerank",
		)
		if err != nil {
			return fmt.Errorf("failed to insert rank for %s: %w", url, err)
		}
		insertedCount++
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	slog.Info("Successfully pushed PageRank results", slog.Int("count", insertedCount), slog.String("sweep_id", sweepID))
	return nil
}

// countIncomingLinks counts how many pages in the graph link to the target URL
func countIncomingLinks(g graph.Graph, targetURL string) int {
	count := 0
	for _, page := range g {
		for _, link := range page.Links {
			if link == targetURL {
				count++
				break
			}
		}
	}
	return count
}
