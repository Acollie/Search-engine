package fetch

import (
	"database/sql"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestFetch_NilDatabase(t *testing.T) {
	result := Fetch(nil, 10)
	assert.Empty(t, result)
}

func TestFetch_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	limit := 5

	// Setup expected rows (using "------" delimiter as per slice.StringToArray)
	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
		AddRow("https://example.com", "Example", "Example body", 100, "https://link1.com------https://link2.com").
		AddRow("https://test.com", "Test", "Test body", 50, "https://link3.com").
		AddRow("https://blog.com", "Blog", "Blog content", 75, "").
		AddRow("https://site.com", "Site", "Site content", 25, "https://link4.com------https://link5.com------https://link6.com").
		AddRow("https://news.com", "News", "News content", 90, "https://link7.com")

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
		WithArgs(limit).
		WillReturnRows(rows)

	result := Fetch(db, limit)

	require.NotNil(t, result)
	assert.Len(t, result, 5)

	// Verify first page
	assert.Equal(t, "https://example.com", result[0].URL)
	assert.Equal(t, "Example", result[0].Title)
	assert.Equal(t, "Example body", result[0].Body)
	assert.Equal(t, 100, result[0].ProminenceValue)
	assert.Len(t, result[0].Links, 2)
	assert.Contains(t, result[0].Links, "https://link1.com")
	assert.Contains(t, result[0].Links, "https://link2.com")

	// Verify page with no links
	assert.Equal(t, "https://blog.com", result[2].URL)
	assert.Empty(t, result[2].Links)

	// Verify page with multiple links
	assert.Equal(t, "https://site.com", result[3].URL)
	assert.Len(t, result[3].Links, 3)

	// Verify all expectations met
	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestFetch_QueryError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
		WithArgs(10).
		WillReturnError(sql.ErrConnDone)

	result := Fetch(db, 10)

	assert.Empty(t, result)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestFetch_ScanError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Return row with invalid data type
	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
		AddRow("https://example.com", "Example", "Body", "invalid_int", "links") // prominence should be int

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
		WithArgs(10).
		WillReturnRows(rows)

	result := Fetch(db, 10)

	// Should return empty result due to scan error
	assert.Empty(t, result)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestFetch_EmptyResult(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Return empty rows
	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"})

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
		WithArgs(10).
		WillReturnRows(rows)

	result := Fetch(db, 10)

	assert.Empty(t, result)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func TestFetch_LimitVariations(t *testing.T) {
	tests := []struct {
		name     string
		limit    int
		rowCount int
	}{
		{
			name:     "Small limit",
			limit:    1,
			rowCount: 1,
		},
		{
			name:     "Medium limit",
			limit:    100,
			rowCount: 100,
		},
		{
			name:     "Large limit",
			limit:    10000,
			rowCount: 10000,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"})
			for i := 0; i < tt.rowCount; i++ {
				rows.AddRow("https://example.com", "Example", "Body", 100, "")
			}

			mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
				WithArgs(tt.limit).
				WillReturnRows(rows)

			result := Fetch(db, tt.limit)

			assert.NotNil(t, result)
			assert.Len(t, result, tt.rowCount)

			err = mock.ExpectationsWereMet()
			assert.NoError(t, err)
		})
	}
}

func TestFetch_LinksFormat(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	tests := []struct {
		name          string
		linksStr      string
		expectedLinks []string
	}{
		{
			name:          "Empty links",
			linksStr:      "",
			expectedLinks: []string{},
		},
		{
			name:          "Single link",
			linksStr:      "https://example.com",
			expectedLinks: []string{"https://example.com"},
		},
		{
			name:          "Multiple links",
			linksStr:      "https://link1.com------https://link2.com------https://link3.com",
			expectedLinks: []string{"https://link1.com", "https://link2.com", "https://link3.com"},
		},
		{
			name:          "Links with delimiter",
			linksStr:      "https://link1.com------https://link2.com",
			expectedLinks: []string{"https://link1.com", "https://link2.com"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
				AddRow("https://example.com", "Example", "Body", 100, tt.linksStr)

			mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
				WithArgs(1).
				WillReturnRows(rows)

			result := Fetch(db, 1)

			require.NotNil(t, result)
			require.Len(t, result, 1)

			if tt.linksStr == "" {
				assert.Empty(t, result[0].Links)
			} else {
				assert.ElementsMatch(t, tt.expectedLinks, result[0].Links)
			}

			err = mock.ExpectationsWereMet()
			assert.NoError(t, err)
		})
	}
}

func TestFetch_SpecialCharacters(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"}).
		AddRow(
			"https://example.com/path?query=value&foo=bar",
			"Title with \"quotes\" and 'apostrophes'",
			"Body with special chars: <>&",
			100,
			"https://link1.com------https://link2.com/path?q=1",
		)

	mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
		WithArgs(1).
		WillReturnRows(rows)

	result := Fetch(db, 1)

	require.NotNil(t, result)
	require.Len(t, result, 1)

	assert.Equal(t, "https://example.com/path?query=value&foo=bar", result[0].URL)
	assert.Equal(t, "Title with \"quotes\" and 'apostrophes'", result[0].Title)
	assert.Equal(t, "Body with special chars: <>&", result[0].Body)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func BenchmarkFetch(b *testing.B) {
	db, mock, err := sqlmock.New()
	require.NoError(b, err)
	defer db.Close()

	rows := sqlmock.NewRows([]string{"url", "title", "body", "prominence", "links"})
	for i := 0; i < 100; i++ {
		rows.AddRow("https://example.com", "Example", "Body", 100, "https://link1.com------https://link2.com")
	}

	for i := 0; i < b.N; i++ {
		mock.ExpectQuery(`SELECT url, title, body, prominence, links FROM SeenPages ORDER BY RANDOM\(\) LIMIT \$1`).
			WithArgs(100).
			WillReturnRows(rows)
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Fetch(db, 100)
	}
}
