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
	domainSampling = `(?s)WITH hosts AS.*TABLESAMPLE SYSTEM \(0\.5\).*FROM hosts`
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
	// d=419 hosts seen, 330 once, 50 twice: 419 + 330*329/(2*51) = 1483.
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"d", "f1", "f2"}).AddRow(419, 330, 50))
	mock.ExpectQuery(linkSampling).WillReturnRows(sqlmock.NewRows([]string{"avg"}).AddRow(120.5))

	s, err := NewStatsHandler(db).fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(1483), s.UniqueDomains, "Chao1 corrects the sample's undercount of rare hosts")
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
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"d", "f1", "f2"}).AddRow(5, 0, 5))
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
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"d", "f1", "f2"}).AddRow(9, 0, 9))
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

func TestChao1(t *testing.T) {
	assert.Equal(t, int64(0), chao1(0, 0, 0), "empty sample")
	assert.Equal(t, int64(10), chao1(10, 0, 4), "no singletons means the sample saw everything")
	assert.Equal(t, int64(1483), chao1(419, 330, 50))
	assert.Equal(t, int64(10), chao1(10, 1, 0), "one singleton adds nothing: f1*(f1-1) is 0")
}

func TestLogSearch_WritesOnlyColumnsThatExist(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	// The live SearchSessions table has no ip_address column; an insert that
	// mentions one fails every time.
	mock.ExpectExec(`INSERT INTO SearchSessions \(query, result_count, execution_time_ms\)\s+VALUES \(\$1, \$2, \$3\)`).
		WithArgs("golang", 10, int64(1)).
		WillReturnResult(sqlmock.NewResult(1, 1))

	(&SearchHandler{db: db}).logSearch("golang", 10, 0) // 0ms is clamped to 1 (CHECK > 0)

	require.Eventually(t, func() bool { return mock.ExpectationsWereMet() == nil }, time.Second, 5*time.Millisecond)
}

func TestFetchStats_DomainEstimateNeverExceedsPageCount(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()
	mock.ExpectQuery(mainStatsSQL).WillReturnRows(sqlmock.NewRows(statsCols).AddRow(305, 0, 0, 0, 0, 0, 0, 0, 0))
	// d=305, all singletons, no doubletons: Chao1 = 305 + 304*303/2 = 46361.
	mock.ExpectQuery(domainSampling).WillReturnRows(sqlmock.NewRows([]string{"d", "f1", "f2"}).AddRow(305, 304, 0))
	mock.ExpectQuery(linkSampling).WillReturnRows(sqlmock.NewRows([]string{"avg"}).AddRow(0.0))

	s, err := NewStatsHandler(db).fetchStats(context.Background())
	require.NoError(t, err)
	assert.Equal(t, int64(305), s.UniqueDomains)
}
