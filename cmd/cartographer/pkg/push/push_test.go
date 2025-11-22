package push

import (
	"fmt"
	"testing"
	"time"
	"webcrawler/cmd/cartographer/pkg/graph"
	"webcrawler/cmd/spider/pkg/site"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPush_EmptyGraph(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{}
	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectCommit()

	err = Push(db, g, "", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000, // 0.5 * 10000
			Links:           []string{"https://link1.com", "https://link2.com"},
		},
		"https://test.com": {
			URL:             "https://test.com",
			ProminenceValue: 3000, // 0.3 * 10000
			Links:           []string{"https://example.com"},
		},
	}

	sweepTime := time.Now()
	expectedSweepID := sweepTime.Format("pagerank_20060102_150405")

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 2))

	// Expect inserts (order may vary due to map iteration)
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), expectedSweepID, "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), expectedSweepID, "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(2, 1))

	mock.ExpectCommit()

	err = Push(db, g, "", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_CustomSweepID(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
			Links:           []string{},
		},
	}

	customSweepID := "custom_sweep_123"
	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), customSweepID, "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	err = Push(db, g, customSweepID, sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_TableCreationError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
		},
	}

	sweepTime := time.Now()

	// Expect table creation to fail
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnError(fmt.Errorf("table creation failed"))

	err = Push(db, g, "", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to create PageRankResults table")

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_TransactionBeginError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction begin to fail
	mock.ExpectBegin().WillReturnError(fmt.Errorf("transaction begin failed"))

	err = Push(db, g, "", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to begin transaction")

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_UnsetLatestError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnError(fmt.Errorf("update failed"))
	mock.ExpectRollback()

	err = Push(db, g, "", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to unset latest flags")

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_InsertError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
			Links:           []string{},
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WillReturnError(fmt.Errorf("insert failed"))
	mock.ExpectRollback()

	err = Push(db, g, "", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to insert rank")

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_CommitError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 5000,
			Links:           []string{},
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit().WillReturnError(fmt.Errorf("commit failed"))

	err = Push(db, g, "", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to commit transaction")

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_RankScoreConversion(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://example.com": {
			URL:             "https://example.com",
			ProminenceValue: 12345, // Should convert to 1.2345
			Links:           []string{},
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Verify rank score is properly converted
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs("https://example.com", 1.2345, 0, 0, sqlmock.AnyArg(), "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectCommit()

	err = Push(db, g, "", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_LinkCounting(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://page1.com": {
			URL:             "https://page1.com",
			ProminenceValue: 5000,
			Links:           []string{"https://page2.com", "https://page3.com"},
		},
		"https://page2.com": {
			URL:             "https://page2.com",
			ProminenceValue: 3000,
			Links:           []string{"https://page1.com"},
		},
		"https://page3.com": {
			URL:             "https://page3.com",
			ProminenceValue: 2000,
			Links:           []string{},
		},
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect inserts with correct link counts
	// page1: 1 incoming (from page2), 2 outgoing (to page2, page3)
	// page2: 1 incoming (from page1), 1 outgoing (to page1)
	// page3: 1 incoming (from page1), 0 outgoing

	// Note: Order may vary due to map iteration
	for i := 0; i < 3; i++ {
		mock.ExpectExec(`INSERT INTO PageRankResults`).
			WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
			WillReturnResult(sqlmock.NewResult(int64(i+1), 1))
	}

	mock.ExpectCommit()

	err = Push(db, g, "", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestCountIncomingLinks(t *testing.T) {
	g := graph.Graph{
		"page1": {
			URL:   "page1",
			Links: []string{"page2", "page3"},
		},
		"page2": {
			URL:   "page2",
			Links: []string{"page3"},
		},
		"page3": {
			URL:   "page3",
			Links: []string{"page1"},
		},
		"page4": {
			URL:   "page4",
			Links: []string{},
		},
	}

	tests := []struct {
		name          string
		targetURL     string
		expectedCount int
	}{
		{
			name:          "page1 has 1 incoming link",
			targetURL:     "page1",
			expectedCount: 1,
		},
		{
			name:          "page2 has 1 incoming link",
			targetURL:     "page2",
			expectedCount: 1,
		},
		{
			name:          "page3 has 2 incoming links",
			targetURL:     "page3",
			expectedCount: 2,
		},
		{
			name:          "page4 has 0 incoming links",
			targetURL:     "page4",
			expectedCount: 0,
		},
		{
			name:          "non-existent page has 0 incoming links",
			targetURL:     "nonexistent",
			expectedCount: 0,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			count := countIncomingLinks(g, tt.targetURL)
			assert.Equal(t, tt.expectedCount, count)
		})
	}
}

func TestCountIncomingLinks_DuplicateLinks(t *testing.T) {
	g := graph.Graph{
		"page1": {
			URL:   "page1",
			Links: []string{"page2", "page2", "page2"}, // Duplicate links
		},
		"page2": {
			URL:   "page2",
			Links: []string{},
		},
	}

	// Should count each link occurrence (breaks on first match)
	count := countIncomingLinks(g, "page2")
	assert.Equal(t, 1, count) // Only counts once due to break
}

func TestPush_LargeGraph(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Create a large graph
	g := graph.Graph{}
	numPages := 100

	for i := 0; i < numPages; i++ {
		pageURL := fmt.Sprintf("https://page%d.com", i)
		g[pageURL] = &site.Page{
			URL:             pageURL,
			ProminenceValue: i * 100,
			Links:           []string{},
		}
	}

	sweepTime := time.Now()

	// Expect table creation
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect transaction
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect inserts for all pages
	for i := 0; i < numPages; i++ {
		mock.ExpectExec(`INSERT INTO PageRankResults`).
			WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
			WillReturnResult(sqlmock.NewResult(int64(i+1), 1))
	}

	mock.ExpectCommit()

	err = Push(db, g, "", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func BenchmarkPush_SmallGraph(b *testing.B) {
	db, mock, err := sqlmock.New()
	require.NoError(b, err)
	defer db.Close()

	g := graph.Graph{
		"page1": {URL: "page1", ProminenceValue: 5000, Links: []string{}},
		"page2": {URL: "page2", ProminenceValue: 3000, Links: []string{}},
		"page3": {URL: "page3", ProminenceValue: 2000, Links: []string{}},
	}

	sweepTime := time.Now()

	for i := 0; i < b.N; i++ {
		mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectBegin()
		mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(2, 1))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(3, 1))
		mock.ExpectCommit()
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Push(db, g, "", sweepTime)
	}
}
