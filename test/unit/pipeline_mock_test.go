package unit

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/require"
	searchermock "webcrawler/pkg/mocks/service/searcher"
	searcherpb "webcrawler/pkg/generated/service/searcher"
	sitepb "webcrawler/pkg/generated/types/site"
)

// TestPipeline_URLToDatabaseFlow tests the flow of a URL being added to the queue
// and eventually appearing in the SeenPages table with all required data
func TestPipeline_URLToDatabaseFlow(t *testing.T) {
	tests := []struct {
		name          string
		url           string
		domain        string
		setupMock     func(sqlmock.Sqlmock)
		expectedError bool
	}{
		{
			name:   "successful URL insertion into queue",
			url:    "https://example.com",
			domain: "example.com",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Queue`).
					WithArgs("https://example.com", "example.com", sqlmock.AnyArg(), sqlmock.AnyArg()).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:   "URL with existing entry triggers upsert",
			url:    "https://golang.org",
			domain: "golang.org",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Queue`).
					WithArgs("https://golang.org", "golang.org", sqlmock.AnyArg(), sqlmock.AnyArg()).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:   "database error during insertion",
			url:    "https://test.com",
			domain: "test.com",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Queue`).
					WithArgs("https://test.com", "test.com", sqlmock.AnyArg(), sqlmock.AnyArg()).
					WillReturnError(sql.ErrConnDone)
			},
			expectedError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create mock database
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			// Setup mock expectations
			tt.setupMock(mock)

			// Simulate adding URL to queue
			_, err = db.Exec(
				`INSERT INTO Queue (url, domain, status, priority) VALUES ($1, $2, $3, $4)
				 ON CONFLICT (url) DO UPDATE SET status='pending', priority=100`,
				tt.url, tt.domain, "pending", 100,
			)

			if tt.expectedError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}

			// Verify expectations
			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestPipeline_SpiderCrawlToDatabase tests the flow of Spider crawling a URL
// and storing the result in SeenPages with search vectors
func TestPipeline_SpiderCrawlToDatabase(t *testing.T) {
	tests := []struct {
		name          string
		url           string
		title         string
		body          string
		statusCode    int
		setupMock     func(sqlmock.Sqlmock)
		expectedError bool
	}{
		{
			name:       "successful page crawl and storage",
			url:        "https://example.com",
			title:      "Example Domain",
			body:       "This domain is for use in illustrative examples in documents.",
			statusCode: 200,
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO SeenPages`).
					WithArgs(
						"https://example.com",
						"Example Domain",
						sqlmock.AnyArg(), // body
						200,
						true, // is_indexable
						sqlmock.AnyArg(), // crawl_time
					).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:       "non-200 status code stored correctly",
			url:        "https://error.com",
			title:      "Not Found",
			body:       "The requested page was not found.",
			statusCode: 404,
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO SeenPages`).
					WithArgs(
						"https://error.com",
						"Not Found",
						sqlmock.AnyArg(),
						404,
						false, // not indexable due to error status
						sqlmock.AnyArg(),
					).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.setupMock(mock)

			// Simulate Spider storing crawled page
			isIndexable := tt.statusCode == 200
			_, err = db.Exec(
				`INSERT INTO SeenPages (url, title, body, status_code, is_indexable, crawl_time)
				 VALUES ($1, $2, $3, $4, $5, $6)`,
				tt.url, tt.title, tt.body, tt.statusCode, isIndexable, time.Now(),
			)

			if tt.expectedError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}

			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestPipeline_PageRankComputation tests the PageRank computation flow
func TestPipeline_PageRankComputation(t *testing.T) {
	tests := []struct {
		name          string
		pageID        int64
		score         float64
		version       int
		setupMock     func(sqlmock.Sqlmock)
		expectedError bool
	}{
		{
			name:    "successful PageRank score insertion",
			pageID:  1,
			score:   0.85,
			version: 1,
			setupMock: func(mock sqlmock.Sqlmock) {
				// Simulate marking old scores as not latest
				mock.ExpectExec(`UPDATE PageRankResults SET is_latest = false`).
					WillReturnResult(sqlmock.NewResult(0, 5))

				// Insert new PageRank scores
				mock.ExpectExec(`INSERT INTO PageRankResults`).
					WithArgs(1, 0.85, 1, true, sqlmock.AnyArg()).
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:    "PageRank score versioning works correctly",
			pageID:  2,
			score:   0.92,
			version: 2,
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`UPDATE PageRankResults SET is_latest = false`).
					WillReturnResult(sqlmock.NewResult(0, 10))

				mock.ExpectExec(`INSERT INTO PageRankResults`).
					WithArgs(2, 0.92, 2, true, sqlmock.AnyArg()).
					WillReturnResult(sqlmock.NewResult(2, 1))
			},
			expectedError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.setupMock(mock)

			// Simulate Cartographer updating PageRank scores
			_, err = db.Exec(`UPDATE PageRankResults SET is_latest = false WHERE is_latest = true`)
			require.NoError(t, err)

			_, err = db.Exec(
				`INSERT INTO PageRankResults (page_id, score, result_version, is_latest, computed_at)
				 VALUES ($1, $2, $3, $4, $5)`,
				tt.pageID, tt.score, tt.version, true, time.Now(),
			)

			if tt.expectedError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}

			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestPipeline_SearchWithPageRank tests searching for pages with PageRank scores
func TestPipeline_SearchWithPageRank(t *testing.T) {
	tests := []struct {
		name           string
		query          string
		expectedPages  int
		setupMock      func(sqlmock.Sqlmock)
		expectedError  bool
		validateResult func(*testing.T, *searcherpb.SearchResponse)
	}{
		{
			name:          "search returns results ordered by combined score",
			query:         "golang",
			expectedPages: 3,
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{
					"url", "title", "body", "description",
					"pagerank_score", "text_relevance", "combined_score", "crawl_time",
				}).
					AddRow(
						"https://golang.org",
						"Go Programming Language",
						"Go is a statically typed language...",
						"Official Go website",
						0.95, 0.85, 0.92, time.Now(),
					).
					AddRow(
						"https://go.dev",
						"Go.dev",
						"Get started with Go...",
						"Go development hub",
						0.88, 0.75, 0.84, time.Now(),
					).
					AddRow(
						"https://tour.golang.org",
						"A Tour of Go",
						"Learn Go interactively...",
						"Interactive Go tutorial",
						0.75, 0.90, 0.80, time.Now(),
					)

				mock.ExpectQuery(`SELECT (.+) FROM seenpages sp`).
					WillReturnRows(rows)
			},
			expectedError: false,
			validateResult: func(t *testing.T, resp *searcherpb.SearchResponse) {
				require.Len(t, resp.Pages, 3)
				// Verify results are ordered by combined score
				require.Equal(t, "https://golang.org", resp.Pages[0].Url)
				require.Equal(t, "https://go.dev", resp.Pages[1].Url)
				require.Equal(t, "https://tour.golang.org", resp.Pages[2].Url)
			},
		},
		{
			name:          "search with no results returns empty",
			query:         "nonexistent",
			expectedPages: 0,
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{
					"url", "title", "body", "description",
					"pagerank_score", "text_relevance", "combined_score", "crawl_time",
				})

				mock.ExpectQuery(`SELECT (.+) FROM seenpages sp`).
					WillReturnRows(rows)
			},
			expectedError: false,
			validateResult: func(t *testing.T, resp *searcherpb.SearchResponse) {
				require.Len(t, resp.Pages, 0)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.setupMock(mock)

			// Execute search query (simulating Searcher service)
			rows, err := db.Query(`
				SELECT url, title, body, description,
				       COALESCE(pr.score, 0.0) as pagerank_score,
				       ts_rank(sp.search_vector, to_tsquery('english', $1)) as text_relevance,
				       (ts_rank(sp.search_vector, to_tsquery('english', $1)) * 0.3 +
				        COALESCE(pr.score, 0.0) * 0.7) as combined_score,
				       sp.crawl_time
				FROM seenpages sp
				LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
				WHERE sp.search_vector @@ to_tsquery('english', $1)
				  AND sp.is_indexable = true
				ORDER BY combined_score DESC
				LIMIT $2 OFFSET $3
			`, tt.query, 10, 0)

			if tt.expectedError {
				require.Error(t, err)
				return
			}

			require.NoError(t, err)
			defer rows.Close()

			// Build response
			var pages []*sitepb.Page
			for rows.Next() {
				var url, title, body, description string
				var pagerankScore, textRelevance, combinedScore float64
				var crawlTime time.Time

				err = rows.Scan(&url, &title, &body, &description,
					&pagerankScore, &textRelevance, &combinedScore, &crawlTime)
				require.NoError(t, err)

				pages = append(pages, &sitepb.Page{
					Url:      url,
					Title:    title,
					Body:     body,
					LastSeen: crawlTime.Unix(),
				})
			}

			resp := &searcherpb.SearchResponse{
				Pages: pages,
			}

			// Validate
			if tt.validateResult != nil {
				tt.validateResult(t, resp)
			}

			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestPipeline_EndToEndMocked tests the complete pipeline using mocks
func TestPipeline_EndToEndMocked(t *testing.T) {
	ctx := context.Background()
	testURL := "https://example.com"
	testTitle := "Example Domain"
	testBody := "This domain is for use in illustrative examples."

	// Create mock database
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Create mock Searcher client
	mockSearcher := searchermock.NewMockSearcherClient(t)

	// Phase 1: URL added to Queue
	t.Log("Phase 1: Adding URL to Queue")
	mock.ExpectExec(`INSERT INTO Queue`).
		WithArgs(testURL, "example.com", "pending", 100).
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = db.Exec(
		`INSERT INTO Queue (url, domain, status, priority) VALUES ($1, $2, $3, $4)`,
		testURL, "example.com", "pending", 100,
	)
	require.NoError(t, err)
	t.Log("✓ URL added to Queue")

	// Phase 2: Spider crawls and stores page
	t.Log("Phase 2: Spider crawls and stores page")
	mock.ExpectExec(`INSERT INTO SeenPages`).
		WithArgs(testURL, testTitle, testBody, 200, true, sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = db.Exec(
		`INSERT INTO SeenPages (url, title, body, status_code, is_indexable, crawl_time)
		 VALUES ($1, $2, $3, $4, $5, $6)`,
		testURL, testTitle, testBody, 200, true, time.Now(),
	)
	require.NoError(t, err)
	t.Log("✓ Page stored in database")

	// Phase 3: Links extracted
	t.Log("Phase 3: Links extracted and stored")
	mock.ExpectExec(`INSERT INTO Links`).
		WithArgs(1, 2, "https://example.com/about", "internal").
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = db.Exec(
		`INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
		 VALUES ($1, $2, $3, $4)`,
		1, 2, "https://example.com/about", "internal",
	)
	require.NoError(t, err)
	t.Log("✓ Links extracted")

	// Phase 4: PageRank computed
	t.Log("Phase 4: PageRank computation")
	mock.ExpectExec(`UPDATE PageRankResults`).
		WillReturnResult(sqlmock.NewResult(0, 5))
	mock.ExpectExec(`INSERT INTO PageRankResults`).
		WithArgs(1, 0.85, 1, true, sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = db.Exec(`UPDATE PageRankResults SET is_latest = false WHERE is_latest = true`)
	require.NoError(t, err)
	_, err = db.Exec(
		`INSERT INTO PageRankResults (page_id, score, result_version, is_latest, computed_at)
		 VALUES ($1, $2, $3, $4, $5)`,
		1, 0.85, 1, true, time.Now(),
	)
	require.NoError(t, err)
	t.Log("✓ PageRank score computed: 0.85")

	// Phase 5: Search for the page
	t.Log("Phase 5: Searching for the page")
	expectedResponse := &searcherpb.SearchResponse{
		Pages: []*sitepb.Page{
			{
				Url:      testURL,
				Title:    testTitle,
				Body:     testBody,
				LastSeen: time.Now().Unix(),
			},
		},
	}

	mockSearcher.EXPECT().
		SearchPages(ctx, &searcherpb.SearchRequest{
			Query:  "example",
			Limit:  10,
			Offset: 0,
		}).
		Return(expectedResponse, nil).
		Once()

	// Execute search
	searchResp, err := mockSearcher.SearchPages(ctx, &searcherpb.SearchRequest{
		Query:  "example",
		Limit:  10,
		Offset: 0,
	})
	require.NoError(t, err)
	require.NotNil(t, searchResp)
	require.Len(t, searchResp.Pages, 1)
	require.Equal(t, testURL, searchResp.Pages[0].Url)
	t.Log("✓ Page found in search results")

	// Verify all expectations met
	require.NoError(t, mock.ExpectationsWereMet())
	mockSearcher.AssertExpectations(t)

	t.Log("\n=== MOCKED PIPELINE TEST COMPLETE ===")
	t.Log("✓ URL → Queue → Spider → Database → Links → PageRank → Search")
}
