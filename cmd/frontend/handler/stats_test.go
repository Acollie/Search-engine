package handler

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	mainStatsSQL   = `(?s)SELECT.*n_live_tup.*SearchSessions`
	domainSampling = `SELECT COUNT\(DISTINCT split_part\(url, '/', 3\)\)\s+FROM SeenPages TABLESAMPLE`
	linkSampling   = `AVG\(GREATEST\(cardinality\(string_to_array\(links.*TABLESAMPLE`
)

var statsCols = []string{"pages", "c24", "queue", "c1h", "domains", "links", "ranked", "q24", "q1h"}

func TestFetchStats_ExactCountsNeedNoEstimates(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	// Only the main query is expected; sqlmock fails the test on any sampling query.
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(1000, 1, 2, 3, 40, 5000, 900, 6, 7))

	s, err := NewStatsHandler(db).fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(40), s.UniqueDomains)
	assert.Equal(t, int64(5000), s.TotalLinks)
	assert.Empty(t, s.Approximate)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestFetchStats_EstimatesWhenExactCountsAreEmpty(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(3000000, 0, 0, 0, 0, 0, 0, 0, 0))
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"n"}).AddRow(37))
	mock.ExpectQuery(linkSampling).WillReturnRows(sqlmock.NewRows([]string{"avg"}).AddRow(120.5))

	s, err := NewStatsHandler(db).fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(37), s.UniqueDomains)
	assert.Equal(t, int64(120.5*3000000), s.TotalLinks)
	assert.ElementsMatch(t, []string{"uniqueDomains", "totalLinks"}, s.Approximate)
	assert.Equal(t, int64(0), s.PagesRanked, "a genuine zero stays zero")
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestFetchStats_EstimatesAreReusedWithinTheHour(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(1000, 0, 0, 0, 0, 0, 0, 0, 0))
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"n"}).AddRow(5))
	mock.ExpectQuery(linkSampling).WillReturnRows(sqlmock.NewRows([]string{"avg"}).AddRow(10.0))
	// Second refresh: only the main query, no sampling.
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(2000, 0, 0, 0, 0, 0, 0, 0, 0))

	h := NewStatsHandler(db)
	_, err = h.fetchStats(context.Background())
	require.NoError(t, err)
	s2, err := h.fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(5), s2.UniqueDomains)
	assert.Equal(t, int64(20000), s2.TotalLinks, "average reused, applied to the new page count")
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestFetchStats_FailedEstimateNeverFailsTheStats(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(1000, 0, 0, 0, 0, 0, 0, 0, 0))
	mock.ExpectQuery(domainSampling).WillReturnError(errors.New("canceling statement due to statement timeout"))
	mock.ExpectQuery(linkSampling).WillReturnError(errors.New("boom"))

	s, err := NewStatsHandler(db).fetchStats(context.Background())
	require.NoError(t, err, "a broken sample must not take the dashboard down")
	assert.Equal(t, int64(1000), s.PagesIndexed)
	assert.Equal(t, int64(0), s.UniqueDomains)
	assert.Empty(t, s.Approximate)
}

func TestFetchStats_FailedEstimateIsRetriedNextTime(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(1000, 0, 0, 0, 0, 0, 0, 0, 0))
	mock.ExpectQuery(domainSampling).WillReturnError(errors.New("timeout"))
	mock.ExpectQuery(linkSampling).WillReturnError(errors.New("timeout"))
	// A failure must not start the one-hour reuse window.
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(1000, 0, 0, 0, 0, 0, 0, 0, 0))
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"n"}).AddRow(9))
	mock.ExpectQuery(linkSampling).WillReturnRows(sqlmock.NewRows([]string{"avg"}).AddRow(3.0))

	h := NewStatsHandler(db)
	_, _ = h.fetchStats(context.Background())
	s, err := h.fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(9), s.UniqueDomains)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestEstimates_StaleAfterTTL(t *testing.T) {
	assert.True(t, time.Since(time.Time{}) >= estimateTTL, "a zero-valued estimate must count as stale")
}
