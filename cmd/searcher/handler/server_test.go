package handler

import (
	"context"
	"database/sql"
	"testing"
	"time"
	"webcrawler/pkg/generated/service/searcher"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/require"
)

func TestHandler_SearchPages(t *testing.T) {
	tests := []struct {
		name          string
		request       *searcher.SearchRequest
		mockSetup     func(sqlmock.Sqlmock)
		expectedLen   int
		expectedError bool
	}{
		{
			name: "successful search with single token",
			request: &searcher.SearchRequest{
				Query: "golang",
				Limit: 5,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"}).
					AddRow("https://golang.org", "The Go Programming Language", "Go is an open source programming language...", 0.95, time.Now()).
					AddRow("https://go.dev", "Go.dev", "Get started with Go documentation...", 0.92, time.Now()).
					AddRow("https://golang.org/doc", "Documentation", "Learn how to use Go...", 0.88, time.Now())

				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1\) ORDER BY pr.rank_score DESC LIMIT \$2`).
					WithArgs("%golang%", int32(5)).
					WillReturnRows(rows)
			},
			expectedLen:   3,
			expectedError: false,
		},
		{
			name: "successful search with multiple tokens",
			request: &searcher.SearchRequest{
				Query: "golang tutorial",
				Limit: 10,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"}).
					AddRow("https://golang.org/doc/tutorial", "Tutorial: Getting started", "In this tutorial you'll learn the basics...", 0.95, time.Now()).
					AddRow("https://tutorial.golang.org", "Go Tutorial", "Complete guide to learning Go...", 0.90, time.Now())

				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1 OR url ILIKE \$2\) ORDER BY pr.rank_score DESC LIMIT \$3`).
					WithArgs("%golang%", "%tutorial%", int32(10)).
					WillReturnRows(rows)
			},
			expectedLen:   2,
			expectedError: false,
		},
		{
			name: "empty query returns empty results",
			request: &searcher.SearchRequest{
				Query: "",
				Limit: 10,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				// No query expected since empty tokens should return early
			},
			expectedLen:   0,
			expectedError: false,
		},
		{
			name: "default limit applied when not provided",
			request: &searcher.SearchRequest{
				Query: "test",
				Limit: 0, // Will default to 10
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"}).
					AddRow("https://test.com", "Test Page", "This is a test page body", 0.85, time.Now())

				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1\) ORDER BY pr.rank_score DESC LIMIT \$2`).
					WithArgs("%test%", int32(10)).
					WillReturnRows(rows)
			},
			expectedLen:   1,
			expectedError: false,
		},
		{
			name: "database error returns error",
			request: &searcher.SearchRequest{
				Query: "error",
				Limit: 5,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1\) ORDER BY pr.rank_score DESC LIMIT \$2`).
					WithArgs("%error%", int32(5)).
					WillReturnError(sql.ErrConnDone)
			},
			expectedLen:   0,
			expectedError: true,
		},
		{
			name: "no results found returns empty list",
			request: &searcher.SearchRequest{
				Query: "nonexistent",
				Limit: 10,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"})

				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1\) ORDER BY pr.rank_score DESC LIMIT \$2`).
					WithArgs("%nonexistent%", int32(10)).
					WillReturnRows(rows)
			},
			expectedLen:   0,
			expectedError: false,
		},
		{
			name: "handles null title and body",
			request: &searcher.SearchRequest{
				Query: "test",
				Limit: 5,
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"}).
					AddRow("https://test.com", nil, nil, 0.85, time.Now())

				mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1\) ORDER BY pr.rank_score DESC LIMIT \$2`).
					WithArgs("%test%", int32(5)).
					WillReturnRows(rows)
			},
			expectedLen:   1,
			expectedError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create mock database
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			// Setup mock expectations
			tt.mockSetup(mock)

			// Create handler
			handler := NewRPCServer(db)

			// Execute test
			resp, err := handler.SearchPages(context.Background(), tt.request)

			// Verify results
			if tt.expectedError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotNil(t, resp)
				require.Len(t, resp.Pages, tt.expectedLen)

				// Verify page structure if results exist
				if tt.expectedLen > 0 {
					for _, page := range resp.Pages {
						require.NotEmpty(t, page.Url)
					}
				}
			}

			// Ensure all expectations were met
			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

func TestHandler_SearchPages_Integration(t *testing.T) {
	// Create mock database
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	handler := NewRPCServer(db)

	// Setup mock data
	computedAt := time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)
	rows := sqlmock.NewRows([]string{"url", "title", "body", "rank_score", "computed_at"}).
		AddRow("https://example.com/go/tutorial", "Go Tutorial Complete", "Learn Go programming from scratch...", 0.95, computedAt).
		AddRow("https://golang.org", "The Go Programming Language", "Official Go website with documentation...", 0.92, computedAt).
		AddRow("https://go.dev/learn", "Learn Go", "Interactive Go tutorials and guides...", 0.88, computedAt)

	mock.ExpectQuery(`SELECT pr.url, sp.title, sp.body, pr.rank_score, pr.computed_at FROM PageRankResults pr INNER JOIN SeenPages sp ON pr.url = sp.url WHERE pr.is_latest = TRUE AND \(url ILIKE \$1 OR url ILIKE \$2\) ORDER BY pr.rank_score DESC LIMIT \$3`).
		WithArgs("%go%", "%tutorial%", int32(10)).
		WillReturnRows(rows)

	// Execute search
	resp, err := handler.SearchPages(context.Background(), &searcher.SearchRequest{
		Query: "go tutorial",
		Limit: 10,
	})

	// Verify
	require.NoError(t, err)
	require.NotNil(t, resp)
	require.Len(t, resp.Pages, 3)

	// Verify first result has all fields populated
	require.Equal(t, "https://example.com/go/tutorial", resp.Pages[0].Url)
	require.Equal(t, "Go Tutorial Complete", resp.Pages[0].Title)
	require.Equal(t, "Learn Go programming from scratch...", resp.Pages[0].Body)
	require.Equal(t, computedAt.Unix(), resp.Pages[0].LastSeen)

	// Ensure all expectations were met
	require.NoError(t, mock.ExpectationsWereMet())
}
