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

// actualQuery is a regex that matches the full-text search query in server.go.
// Uses (?s) so . matches newlines, and \$N for parameter placeholders.
const actualQuery = `(?s)SELECT.*sp\.url.*to_tsquery.*LIMIT \$2 OFFSET \$3`

// mockCols are the columns returned by the actual SELECT.
var mockCols = []string{"url", "title", "body", "description", "pagerank_score", "text_relevance", "combined_score", "crawl_time"}

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
				rows := sqlmock.NewRows(mockCols).
					AddRow("https://golang.org", "The Go Programming Language", "Go is an open source programming language...", nil, 0.95, 0.9, 0.94, time.Now()).
					AddRow("https://go.dev", "Go.dev", "Get started with Go documentation...", nil, 0.92, 0.85, 0.91, time.Now()).
					AddRow("https://golang.org/doc", "Documentation", "Learn how to use Go...", nil, 0.88, 0.80, 0.87, time.Now())

				mock.ExpectQuery(actualQuery).
					WithArgs("golang", int32(5), int32(0)).
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
				rows := sqlmock.NewRows(mockCols).
					AddRow("https://golang.org/doc/tutorial", "Tutorial: Getting started", "In this tutorial you'll learn the basics...", nil, 0.95, 0.9, 0.94, time.Now()).
					AddRow("https://tutorial.golang.org", "Go Tutorial", "Complete guide to learning Go...", nil, 0.90, 0.85, 0.89, time.Now())

				mock.ExpectQuery(actualQuery).
					WithArgs("golang & tutorial", int32(10), int32(0)).
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
				// No query expected since empty tokens return early
			},
			expectedLen:   0,
			expectedError: false,
		},
		{
			name: "default limit applied when not provided",
			request: &searcher.SearchRequest{
				Query: "test",
				Limit: 0, // defaults to 10
			},
			mockSetup: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows(mockCols).
					AddRow("https://test.com", "Test Page", nil, "A test page", 0.85, 0.7, 0.83, time.Now())

				mock.ExpectQuery(actualQuery).
					WithArgs("test", int32(10), int32(0)).
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
				mock.ExpectQuery(actualQuery).
					WithArgs("error", int32(5), int32(0)).
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
				rows := sqlmock.NewRows(mockCols)

				mock.ExpectQuery(actualQuery).
					WithArgs("nonexistent", int32(10), int32(0)).
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
				rows := sqlmock.NewRows(mockCols).
					AddRow("https://test.com", nil, nil, nil, 0.85, 0.7, 0.83, time.Now())

				mock.ExpectQuery(actualQuery).
					WithArgs("test", int32(5), int32(0)).
					WillReturnRows(rows)
			},
			expectedLen:   1,
			expectedError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.mockSetup(mock)

			handler := NewRPCServer(db)

			resp, err := handler.SearchPages(context.Background(), tt.request)

			if tt.expectedError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotNil(t, resp)
				require.Len(t, resp.Pages, tt.expectedLen)

				if tt.expectedLen > 0 {
					for _, page := range resp.Pages {
						require.NotEmpty(t, page.Url)
					}
				}
			}

			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

func TestHandler_SearchPages_Integration(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	handler := NewRPCServer(db)

	crawlTime := time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)
	rows := sqlmock.NewRows(mockCols).
		AddRow("https://example.com/go/tutorial", "Go Tutorial Complete", "Learn Go programming from scratch...", nil, 0.95, 0.9, 0.94, crawlTime).
		AddRow("https://golang.org", "The Go Programming Language", "Official Go website with documentation...", nil, 0.92, 0.85, 0.91, crawlTime).
		AddRow("https://go.dev/learn", "Learn Go", "Interactive Go tutorials and guides...", nil, 0.88, 0.80, 0.87, crawlTime)

	mock.ExpectQuery(actualQuery).
		WithArgs("go & tutorial", int32(10), int32(0)).
		WillReturnRows(rows)

	resp, err := handler.SearchPages(context.Background(), &searcher.SearchRequest{
		Query: "go tutorial",
		Limit: 10,
	})

	require.NoError(t, err)
	require.NotNil(t, resp)
	require.Len(t, resp.Pages, 3)

	require.Equal(t, "https://example.com/go/tutorial", resp.Pages[0].Url)
	require.Equal(t, "Go Tutorial Complete", resp.Pages[0].Title)
	require.Equal(t, "Learn Go programming from scratch...", resp.Pages[0].Body)
	require.Equal(t, crawlTime.Unix(), resp.Pages[0].LastSeen)

	require.NoError(t, mock.ExpectationsWereMet())
}
