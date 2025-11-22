package site

import (
	"context"
	"database/sql"
	"errors"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/lib/pq"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewAdder(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)

	assert.NotNil(t, adder)
	assert.Equal(t, db, adder.db)
}

func TestAdder_Add_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:   "https://example.com",
		Title: "Example Page",
		Body:  "This is the body content",
		Meta: map[string]string{
			"description": "Example description",
		},
		CrawledDate: uint64(time.Now().Unix()),
		Links: []string{
			"https://example.com/page1",
			"https://example.com/page2",
		},
	}

	// Expect SeenPages insert
	rows := sqlmock.NewRows([]string{"id"}).AddRow(1)
	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			page.URL,
			page.Title,
			"Example description", // extracted description
			page.Body,
			sqlmock.AnyArg(), // metaJSON
			sqlmock.AnyArg(), // crawl_time
			"example.com",    // domain
			true,             // is_indexable
		).
		WillReturnRows(rows)

	// Expect Links insert
	mock.ExpectExec(`INSERT INTO Links`).
		WithArgs(1, "https://example.com/page1", 1, "https://example.com/page2").
		WillReturnResult(sqlmock.NewResult(0, 2))

	// Expect Queue insert
	mock.ExpectExec(`INSERT INTO Queue`).
		WithArgs(
			"https://example.com/page1", "example.com",
			"https://example.com/page2", "example.com",
		).
		WillReturnResult(sqlmock.NewResult(0, 2))

	err = adder.Add(ctx, page)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_Add_Duplicate(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:         "https://example.com",
		Title:       "Example Page",
		CrawledDate: uint64(time.Now().Unix()),
	}

	// Expect SeenPages insert to return no rows (duplicate)
	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			page.URL,
			page.Title,
			"", // no description
			"", // no body
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			"example.com",
			true,
		).
		WillReturnError(sql.ErrNoRows)

	err = adder.Add(ctx, page)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "duplicate key value violates unique constraint")
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_Add_PostgresUniqueViolation(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:         "https://example.com",
		Title:       "Example Page",
		CrawledDate: uint64(time.Now().Unix()),
	}

	// PostgreSQL unique violation error (code 23505)
	pqErr := &pq.Error{
		Code:    "23505",
		Message: "duplicate key value violates unique constraint",
	}

	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(),
		).
		WillReturnError(pqErr)

	err = adder.Add(ctx, page)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "duplicate key value violates unique constraint")
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_Add_InvalidURL(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:         "://invalid-url",
		Title:       "Invalid Page",
		CrawledDate: uint64(time.Now().Unix()),
	}

	err = adder.Add(ctx, page)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "invalid URL")
}

func TestAdder_Add_DatabaseError(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:         "https://example.com",
		Title:       "Example Page",
		CrawledDate: uint64(time.Now().Unix()),
	}

	dbErr := errors.New("database connection lost")
	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(),
		).
		WillReturnError(dbErr)

	err = adder.Add(ctx, page)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to insert page")
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_Add_NoLinks(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:         "https://example.com",
		Title:       "Example Page",
		CrawledDate: uint64(time.Now().Unix()),
		Links:       []string{}, // No links
	}

	rows := sqlmock.NewRows([]string{"id"}).AddRow(1)
	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg(),
			sqlmock.AnyArg(), sqlmock.AnyArg(),
		).
		WillReturnRows(rows)

	err = adder.Add(ctx, page)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
	// Should not expect Links or Queue inserts
}

func TestAdder_InsertLinks_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	links := []string{
		"https://example.com/page1",
		"https://example.com/page2",
		"https://example.com/page3",
	}

	mock.ExpectExec(`INSERT INTO Links`).
		WithArgs(1, "https://example.com/page1", 1, "https://example.com/page2", 1, "https://example.com/page3").
		WillReturnResult(sqlmock.NewResult(0, 3))

	err = adder.insertLinks(ctx, 1, links)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_InsertLinks_Empty(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	err = adder.insertLinks(ctx, 1, []string{})

	assert.NoError(t, err)
	// No database calls expected
}

func TestAdder_InsertLinks_Error(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	links := []string{"https://example.com/page1"}

	dbErr := errors.New("database error")
	mock.ExpectExec(`INSERT INTO Links`).
		WithArgs(1, "https://example.com/page1").
		WillReturnError(dbErr)

	err = adder.insertLinks(ctx, 1, links)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to insert links")
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_InsertIntoQueue_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	links := []string{
		"https://example.com/page1",
		"https://different.com/page2",
	}

	mock.ExpectExec(`INSERT INTO Queue`).
		WithArgs(
			"https://example.com/page1", "example.com",
			"https://different.com/page2", "different.com",
		).
		WillReturnResult(sqlmock.NewResult(0, 2))

	err = adder.insertIntoQueue(ctx, links)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_InsertIntoQueue_SkipInvalidURLs(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	links := []string{
		"https://example.com/page1",
		"://invalid-url",
		"https://valid.com/page2",
	}

	// Should only insert valid URLs
	mock.ExpectExec(`INSERT INTO Queue`).
		WithArgs(
			"https://example.com/page1", "example.com",
			"https://valid.com/page2", "valid.com",
		).
		WillReturnResult(sqlmock.NewResult(0, 2))

	err = adder.insertIntoQueue(ctx, links)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestAdder_InsertIntoQueue_Empty(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	err = adder.insertIntoQueue(ctx, []string{})

	assert.NoError(t, err)
	// No database calls expected
}

func TestAdder_InsertIntoQueue_AllInvalid(t *testing.T) {
	db, _, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	links := []string{
		"://invalid1",
		"://invalid2",
	}

	err = adder.insertIntoQueue(ctx, links)

	assert.NoError(t, err)
	// No database calls expected since all URLs are invalid
}

func TestExtractDomain(t *testing.T) {
	tests := []struct {
		name        string
		url         string
		expected    string
		expectError bool
	}{
		{
			name:        "simple URL",
			url:         "https://example.com",
			expected:    "example.com",
			expectError: false,
		},
		{
			name:        "URL with path",
			url:         "https://example.com/path/to/page",
			expected:    "example.com",
			expectError: false,
		},
		{
			name:        "URL with port",
			url:         "https://example.com:8080",
			expected:    "example.com:8080",
			expectError: false,
		},
		{
			name:        "URL with subdomain",
			url:         "https://www.example.com",
			expected:    "www.example.com",
			expectError: false,
		},
		{
			name:        "invalid URL",
			url:         "://invalid",
			expected:    "",
			expectError: true,
		},
		{
			name:        "empty URL",
			url:         "",
			expected:    "",
			expectError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			domain, err := extractDomain(tt.url)

			if tt.expectError {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.expected, domain)
			}
		})
	}
}

func TestExtractDescription(t *testing.T) {
	tests := []struct {
		name     string
		meta     map[string]string
		expected string
	}{
		{
			name: "description meta tag",
			meta: map[string]string{
				"description": "Page description",
			},
			expected: "Page description",
		},
		{
			name: "og:description meta tag",
			meta: map[string]string{
				"og:description": "Open Graph description",
			},
			expected: "Open Graph description",
		},
		{
			name: "both tags - prefer description",
			meta: map[string]string{
				"description":    "Regular description",
				"og:description": "OG description",
			},
			expected: "Regular description",
		},
		{
			name:     "no description",
			meta:     map[string]string{},
			expected: "",
		},
		{
			name: "other meta tags",
			meta: map[string]string{
				"keywords": "test,example",
				"author":   "John Doe",
			},
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := extractDescription(tt.meta)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestAdder_Add_MetadataHandling(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:   "https://example.com",
		Title: "Example Page",
		Meta: map[string]string{
			"description":    "Page description",
			"keywords":       "test,example,page",
			"author":         "John Doe",
			"og:title":       "OG Title",
			"og:description": "OG Description",
		},
		CrawledDate: uint64(time.Now().Unix()),
	}

	rows := sqlmock.NewRows([]string{"id"}).AddRow(1)
	mock.ExpectQuery(`INSERT INTO SeenPages`).
		WithArgs(
			page.URL,
			page.Title,
			"Page description", // should extract regular description
			"",
			sqlmock.AnyArg(), // metaJSON should contain all meta
			sqlmock.AnyArg(),
			"example.com",
			true,
		).
		WillReturnRows(rows)

	err = adder.Add(ctx, page)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func BenchmarkAdder_Add(b *testing.B) {
	db, mock, err := sqlmock.New()
	require.NoError(b, err)
	defer db.Close()

	adder := NewAdder(db)
	ctx := context.Background()

	page := Page{
		URL:   "https://example.com",
		Title: "Example Page",
		Body:  "Content",
		Meta: map[string]string{
			"description": "Description",
		},
		CrawledDate: uint64(time.Now().Unix()),
		Links:       []string{"https://example.com/1", "https://example.com/2"},
	}

	for i := 0; i < b.N; i++ {
		rows := sqlmock.NewRows([]string{"id"}).AddRow(1)
		mock.ExpectQuery(`INSERT INTO SeenPages`).WillReturnRows(rows)
		mock.ExpectExec(`INSERT INTO Links`).WillReturnResult(sqlmock.NewResult(0, 2))
		mock.ExpectExec(`INSERT INTO Queue`).WillReturnResult(sqlmock.NewResult(0, 2))
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		adder.Add(ctx, page)
	}
}
