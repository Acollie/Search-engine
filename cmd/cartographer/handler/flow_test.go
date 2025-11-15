package handler

import (
	"testing"
	"webcrawler/cmd/cartographer/pkg/graph"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestHandler_New(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 10
	sweepBreath := 1000

	handler := New(db, sweepCount, sweepBreath)

	assert.NotNil(t, handler)
	assert.Equal(t, db, handler.db)
	assert.Equal(t, sweepCount, handler.sweepCount)
	assert.Equal(t, sweepBreath, handler.sweepBreath)
}

func TestHandler_Traverse_EmptyDatabase(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 2
	sweepBreath := 10

	// Mock fetch returning empty results for each sweep
	for i := 0; i < sweepCount; i++ {
		rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"})
		mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
			WithArgs(sweepBreath).
			WillReturnRows(rows)
	}

	// Mock push operations
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectCommit()

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_WithData(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 1
	sweepBreath := 5

	// Mock fetch returning sample pages
	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
		AddRow("https://page1.com", "Page 1", "Content 1", 0, "https://page2.com,https://page3.com").
		AddRow("https://page2.com", "Page 2", "Content 2", 0, "https://page3.com").
		AddRow("https://page3.com", "Page 3", "Content 3", 0, "https://page1.com").
		AddRow("https://page4.com", "Page 4", "Content 4", 0, "").
		AddRow("https://page5.com", "Page 5", "Content 5", 0, "https://page1.com")

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
		WithArgs(sweepBreath).
		WillReturnRows(rows)

	// Mock push operations
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect 5 inserts (one for each page)
	for i := 0; i < 5; i++ {
		mock.ExpectExec(`INSERT INTO PageRankResults`).
			WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
			WillReturnResult(sqlmock.NewResult(int64(i+1), 1))
	}
	mock.ExpectCommit()

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_MultipleSweeps(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 3
	sweepBreath := 2

	// Mock fetch for each sweep
	for i := 0; i < sweepCount; i++ {
		rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
			AddRow("https://page1.com", "Page 1", "Content", 0, "https://page2.com").
			AddRow("https://page2.com", "Page 2", "Content", 0, "https://page1.com")

		mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
			WithArgs(sweepBreath).
			WillReturnRows(rows)
	}

	// Mock push operations (merged results)
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	// Expect inserts for merged pages
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
		WillReturnResult(sqlmock.NewResult(2, 1))

	mock.ExpectCommit()

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_FetchError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 1
	sweepBreath := 10

	// Mock fetch returning error (database error)
	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
		WithArgs(sweepBreath).
		WillReturnError(assert.AnError)

	// Mock push operations for empty graph
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectCommit()

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	// Should complete even if fetch returns error (handled gracefully)
	// Fetch returns empty slice on error, which creates empty graph that can be pushed
	assert.NoError(t, err)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_PushError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 1
	sweepBreath := 2

	// Mock successful fetch
	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
		AddRow("https://page1.com", "Page 1", "Content", 0, "")

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
		WithArgs(sweepBreath).
		WillReturnRows(rows)

	// Mock push table creation failure
	mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
		WillReturnError(assert.AnError)

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	assert.Error(t, err)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_PageRankError(t *testing.T) {
	t.Skip("PageRank errors are context-based and difficult to simulate in unit tests")
	// This would require cancelling the context mid-execution
	// Integration tests would be better suited for this
}

func TestHandler_Traverse_MergeError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	sweepCount := 0 // Will cause merge to receive empty graphs
	sweepBreath := 10

	handler := New(db, sweepCount, sweepBreath)
	err = handler.Traverse()

	// Merge should return ErrNoGraphs
	assert.Error(t, err)
	assert.Equal(t, graph.ErrNoGraphs, err)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestHandler_Traverse_Configuration(t *testing.T) {
	tests := []struct {
		name        string
		sweepCount  int
		sweepBreath int
	}{
		{
			name:        "Small configuration",
			sweepCount:  1,
			sweepBreath: 10,
		},
		{
			name:        "Medium configuration",
			sweepCount:  10,
			sweepBreath: 100,
		},
		{
			name:        "Large configuration",
			sweepCount:  100,
			sweepBreath: 1000,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			// Mock fetch for each sweep
			for i := 0; i < tt.sweepCount; i++ {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
					AddRow("https://page1.com", "Page 1", "Content", 0, "")

				mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
					WithArgs(tt.sweepBreath).
					WillReturnRows(rows)
			}

			// Mock push
			mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).
				WillReturnResult(sqlmock.NewResult(0, 0))
			mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).
				WillReturnResult(sqlmock.NewResult(0, 0))
			mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).
				WillReturnResult(sqlmock.NewResult(0, 0))
			mock.ExpectBegin()
			mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
				WillReturnResult(sqlmock.NewResult(0, 0))
			mock.ExpectExec(`INSERT INTO PageRankResults`).
				WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(), "damped_pagerank").
				WillReturnResult(sqlmock.NewResult(1, 1))
			mock.ExpectCommit()

			handler := New(db, tt.sweepCount, tt.sweepBreath)
			err = handler.Traverse()

			assert.NoError(t, err)
		})
	}
}

func BenchmarkHandler_Traverse(b *testing.B) {
	db, mock, err := sqlmock.New()
	require.NoError(b, err)
	defer db.Close()

	sweepCount := 5
	sweepBreath := 10

	for i := 0; i < b.N; i++ {
		// Mock fetch for each sweep
		for j := 0; j < sweepCount; j++ {
			rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
				AddRow("https://page1.com", "Page 1", "Content", 0, "https://page2.com").
				AddRow("https://page2.com", "Page 2", "Content", 0, "https://page1.com")

			mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages`).
				WithArgs(sweepBreath).
				WillReturnRows(rows)
		}

		// Mock push
		mock.ExpectExec(`CREATE TABLE IF NOT EXISTS PageRankResults`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_latest_rank`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`CREATE INDEX IF NOT EXISTS idx_sweep`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectBegin()
		mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(2, 1))
		mock.ExpectCommit()
	}

	handler := New(db, sweepCount, sweepBreath)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		handler.Traverse()
	}
}
