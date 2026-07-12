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

	err = Push(db, g, "pagerank_test", sweepTime)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "refusing to push empty PageRank result set")
	// No queries should have been issued at all — an empty sweep must never
	// touch the previous is_latest rows.
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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 2))

	// Order may vary due to map iteration.
	mock.ExpectExec(`INSERT INTO PageRankResults \(page_id, score, result_version, is_latest\)`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(`INSERT INTO PageRankResults \(page_id, score, result_version, is_latest\)`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(2, 1))

	mock.ExpectCommit()

	err = Push(db, g, "pagerank_test", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_SkipsRowsNotInSeenPages(t *testing.T) {
	// A page pruned from SeenPages between the sweep starting and Push()
	// running should be silently skipped (0 rows affected), not error.
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://gone.com": {
			URL:             "https://gone.com",
			ProminenceValue: 5000,
			Links:           []string{},
		},
	}

	sweepTime := time.Now()

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults \(page_id, score, result_version, is_latest\)`).
		WithArgs("https://gone.com", sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectCommit()

	err = Push(db, g, "pagerank_test", sweepTime)

	assert.NoError(t, err)
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

	mock.ExpectBegin().WillReturnError(fmt.Errorf("transaction begin failed"))

	err = Push(db, g, "pagerank_test", sweepTime)

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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnError(fmt.Errorf("update failed"))
	mock.ExpectRollback()

	err = Push(db, g, "pagerank_test", sweepTime)

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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WillReturnError(fmt.Errorf("insert failed"))
	mock.ExpectRollback()

	err = Push(db, g, "pagerank_test", sweepTime)

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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit().WillReturnError(fmt.Errorf("commit failed"))

	err = Push(db, g, "pagerank_test", sweepTime)

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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs("https://example.com", 1.2345, sweepTime.Unix()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectCommit()

	err = Push(db, g, "pagerank_test", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_ResultVersionSharedAcrossSweep(t *testing.T) {
	// Every row inserted in one Push() call must carry the same
	// result_version — the Searcher/e2e tests rely on this to identify
	// "one sweep's worth" of latest results.
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	g := graph.Graph{
		"https://page1.com": {URL: "https://page1.com", ProminenceValue: 5000, Links: []string{}},
		"https://page2.com": {URL: "https://page2.com", ProminenceValue: 3000, Links: []string{}},
	}

	sweepTime := time.Now()

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sweepTime.Unix()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sweepTime.Unix()).
		WillReturnResult(sqlmock.NewResult(2, 1))
	mock.ExpectCommit()

	err = Push(db, g, "pagerank_test", sweepTime)

	assert.NoError(t, err)
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestPush_LargeGraph(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

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

	mock.ExpectBegin()
	mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).
		WillReturnResult(sqlmock.NewResult(0, 0))

	for i := 0; i < numPages; i++ {
		mock.ExpectExec(`INSERT INTO PageRankResults`).
			WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
			WillReturnResult(sqlmock.NewResult(int64(i+1), 1))
	}

	mock.ExpectCommit()

	err = Push(db, g, "pagerank_test", sweepTime)

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
		mock.ExpectBegin()
		mock.ExpectExec(`UPDATE PageRankResults SET is_latest = FALSE`).WillReturnResult(sqlmock.NewResult(0, 0))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(2, 1))
		mock.ExpectExec(`INSERT INTO PageRankResults`).WillReturnResult(sqlmock.NewResult(3, 1))
		mock.ExpectCommit()
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Push(db, g, "pagerank_test", sweepTime)
	}
}
