package push

import (
	"database/sql"
	"fmt"
	"log/slog"
	"time"
	"webcrawler/cmd/cartographer/pkg/graph"
)

const (
	unsetLatestSQL = `
		UPDATE PageRankResults
		SET is_latest = FALSE
		WHERE is_latest = TRUE;`

	// PageRankResults (page_id, score, result_version, is_latest) is created
	// by scripts/01-init-schema.sql — this package only writes to it. The
	// join resolves URL -> page_id so a page that's since been pruned from
	// SeenPages is silently skipped (0 rows affected) instead of erroring.
	insertRankSQL = `
		INSERT INTO PageRankResults (page_id, score, result_version, is_latest)
		SELECT id, $2, $3, TRUE
		FROM SeenPages
		WHERE url = $1;`
)

// Push saves PageRank computation results to the database. sweepID is used
// only for logging; result_version (must be > 0 and shared by every row in
// this sweep, per the PageRankResults schema) is derived from sweepTime.
func Push(db *sql.DB, g graph.Graph, sweepID string, sweepTime time.Time) error {
	if len(g) == 0 {
		// Never unset the previous is_latest rows in exchange for nothing —
		// that would silently zero out PageRank's contribution to search
		// ranking until the next successful sweep. Fail loudly instead so
		// the CronJob run shows as Failed.
		return fmt.Errorf("refusing to push empty PageRank result set (sweep %s): previous is_latest results left untouched", sweepID)
	}

	resultVersion := sweepTime.Unix()

	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	if _, err := tx.Exec(unsetLatestSQL); err != nil {
		return fmt.Errorf("failed to unset latest flags: %w", err)
	}

	insertedCount := 0
	for url, page := range g {
		// Convert int prominence back to float rank score
		rankScore := float64(page.ProminenceValue) / graph.ScaleFactor

		res, err := tx.Exec(insertRankSQL, url, rankScore, resultVersion)
		if err != nil {
			return fmt.Errorf("failed to insert rank for %s: %w", url, err)
		}
		if n, _ := res.RowsAffected(); n > 0 {
			insertedCount++
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	slog.Info("Successfully pushed PageRank results",
		slog.Int("count", insertedCount),
		slog.Int("graphSize", len(g)),
		slog.String("sweep_id", sweepID),
		slog.Int64("result_version", resultVersion))
	return nil
}
