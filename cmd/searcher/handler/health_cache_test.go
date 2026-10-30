package handler

import (
	"context"
	"testing"
	"time"
	"webcrawler/pkg/generated/service/searcher"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/require"
)

const estimateSQL = `SELECT GREATEST\(reltuples, 0\)::bigint FROM pg_class`
const pagerankSQL = `SELECT COUNT\(\*\) FROM PageRankResults`

func TestHealth_UsesEstimateNotExactCount(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.MonitorPingsOption(true))
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectPing()
	mock.ExpectQuery(estimateSQL).WillReturnRows(sqlmock.NewRows([]string{"est"}).AddRow(3069078))
	mock.ExpectQuery(pagerankSQL).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(10))

	resp, err := NewRPCServer(db).GetHealth(context.Background(), &searcher.HealthRequest{})
	require.NoError(t, err)
	require.Equal(t, int64(3069078), resp.PagesIndexed)
	// No exact COUNT(*) over SeenPages was expected, so sqlmock would fail the
	// test if one had been issued.
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestHealth_FallsBackToExactCountWhenNeverAnalysed(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.MonitorPingsOption(true))
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectPing()
	mock.ExpectQuery(estimateSQL).WillReturnRows(sqlmock.NewRows([]string{"est"}).AddRow(0))
	mock.ExpectQuery(`SELECT COUNT\(\*\) FROM SeenPages`).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(42))
	mock.ExpectQuery(pagerankSQL).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(7))

	resp, err := NewRPCServer(db).GetHealth(context.Background(), &searcher.HealthRequest{})
	require.NoError(t, err)
	require.Equal(t, int64(42), resp.PagesIndexed)
	require.Equal(t, int64(7), resp.PagerankResults)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestHealth_CountsCachedButPingStaysLive(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.MonitorPingsOption(true))
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectPing()
	mock.ExpectQuery(estimateSQL).WillReturnRows(sqlmock.NewRows([]string{"est"}).AddRow(1000))
	mock.ExpectQuery(pagerankSQL).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(5))
	mock.ExpectPing() // second call: only the ping, counts come from cache

	h := NewRPCServer(db)
	now := time.Now()
	h.health.now = func() time.Time { return now }

	r1, err := h.GetHealth(context.Background(), &searcher.HealthRequest{})
	require.NoError(t, err)
	now = now.Add(10 * time.Second)
	r2, err := h.GetHealth(context.Background(), &searcher.HealthRequest{})
	require.NoError(t, err)

	require.Equal(t, r1.PagesIndexed, r2.PagesIndexed)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestHealth_RefreshesAfterTTL(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.MonitorPingsOption(true))
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectPing()
	mock.ExpectQuery(estimateSQL).WillReturnRows(sqlmock.NewRows([]string{"est"}).AddRow(1000))
	mock.ExpectQuery(pagerankSQL).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(5))
	mock.ExpectPing()
	mock.ExpectQuery(estimateSQL).WillReturnRows(sqlmock.NewRows([]string{"est"}).AddRow(2000))
	mock.ExpectQuery(pagerankSQL).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(6))

	h := NewRPCServer(db)
	now := time.Now()
	h.health.now = func() time.Time { return now }

	_, _ = h.GetHealth(context.Background(), &searcher.HealthRequest{})
	now = now.Add(healthStatsTTL + time.Second)
	r, err := h.GetHealth(context.Background(), &searcher.HealthRequest{})
	require.NoError(t, err)
	require.Equal(t, int64(2000), r.PagesIndexed)
	require.NoError(t, mock.ExpectationsWereMet())
}
