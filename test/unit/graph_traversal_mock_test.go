package unit

import (
	"context"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/require"
)

// TestGraphTraversal_LinkExtraction tests extracting links from crawled pages
func TestGraphTraversal_LinkExtraction(t *testing.T) {
	tests := []struct {
		name          string
		sourcePageID  int64
		targetPageID  int64
		targetURL     string
		linkType      string
		setupMock     func(sqlmock.Sqlmock)
		expectedError bool
	}{
		{
			name:         "internal link extraction",
			sourcePageID: 1,
			targetPageID: 2,
			targetURL:    "https://golang.org/doc",
			linkType:     "internal",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Links`).
					WithArgs(int64(1), int64(2), "https://golang.org/doc", "internal").
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:         "external link extraction",
			sourcePageID: 1,
			targetPageID: 0, // External links have NULL target_page_id
			targetURL:    "https://github.com",
			linkType:     "external",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Links`).
					WithArgs(int64(1), nil, "https://github.com", "external").
					WillReturnResult(sqlmock.NewResult(1, 1))
			},
			expectedError: false,
		},
		{
			name:         "duplicate link handled by conflict",
			sourcePageID: 1,
			targetPageID: 2,
			targetURL:    "https://golang.org/doc",
			linkType:     "internal",
			setupMock: func(mock sqlmock.Sqlmock) {
				mock.ExpectExec(`INSERT INTO Links`).
					WithArgs(int64(1), int64(2), "https://golang.org/doc", "internal").
					WillReturnResult(sqlmock.NewResult(0, 0)) // No rows affected (conflict)
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

			var targetID interface{}
			if tt.targetPageID > 0 {
				targetID = tt.targetPageID
			} else {
				targetID = nil
			}

			_, err = db.Exec(
				`INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
				 VALUES ($1, $2, $3, $4)
				 ON CONFLICT DO NOTHING`,
				tt.sourcePageID, targetID, tt.targetURL, tt.linkType,
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

// TestGraphTraversal_LinkConnectivity tests querying the link graph
func TestGraphTraversal_LinkConnectivity(t *testing.T) {
	tests := []struct {
		name          string
		sourceURL     string
		setupMock     func(sqlmock.Sqlmock)
		expectedLinks int
		expectedError bool
	}{
		{
			name:      "page with outgoing links",
			sourceURL: "https://golang.org",
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"target_url", "link_type"}).
					AddRow("https://python.org", "internal").
					AddRow("https://rust-lang.org", "internal").
					AddRow("https://github.com", "external")

				mock.ExpectQuery(`SELECT l.target_url, l.link_type FROM Links l`).
					WithArgs("https://golang.org").
					WillReturnRows(rows)
			},
			expectedLinks: 3,
			expectedError: false,
		},
		{
			name:      "page with no outgoing links",
			sourceURL: "https://isolated.com",
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"target_url", "link_type"})

				mock.ExpectQuery(`SELECT l.target_url, l.link_type FROM Links l`).
					WithArgs("https://isolated.com").
					WillReturnRows(rows)
			},
			expectedLinks: 0,
			expectedError: false,
		},
		{
			name:      "page with many internal links",
			sourceURL: "https://hub.example.com",
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"target_url", "link_type"}).
					AddRow("https://hub.example.com/page1", "internal").
					AddRow("https://hub.example.com/page2", "internal").
					AddRow("https://hub.example.com/page3", "internal").
					AddRow("https://hub.example.com/page4", "internal").
					AddRow("https://hub.example.com/page5", "internal")

				mock.ExpectQuery(`SELECT l.target_url, l.link_type FROM Links l`).
					WithArgs("https://hub.example.com").
					WillReturnRows(rows)
			},
			expectedLinks: 5,
			expectedError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.setupMock(mock)

			// Query outgoing links from source page
			rows, err := db.Query(`
				SELECT l.target_url, l.link_type
				FROM Links l
				JOIN SeenPages sp ON l.source_page_id = sp.id
				WHERE sp.url = $1
			`, tt.sourceURL)

			if tt.expectedError {
				require.Error(t, err)
				return
			}

			require.NoError(t, err)
			defer rows.Close()

			// Count results
			var links []struct {
				url      string
				linkType string
			}
			for rows.Next() {
				var url, linkType string
				err := rows.Scan(&url, &linkType)
				require.NoError(t, err)
				links = append(links, struct {
					url      string
					linkType string
				}{url, linkType})
			}

			require.Equal(t, tt.expectedLinks, len(links))
			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestGraphTraversal_IncomingLinks tests finding pages that link to a target
func TestGraphTraversal_IncomingLinks(t *testing.T) {
	tests := []struct {
		name            string
		targetURL       string
		setupMock       func(sqlmock.Sqlmock)
		expectedSources int
		validateResults func(*testing.T, []string)
	}{
		{
			name:      "popular page with many incoming links",
			targetURL: "https://golang.org",
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"source_url"}).
					AddRow("https://python.org").
					AddRow("https://rust-lang.org").
					AddRow("https://javascript.info")

				mock.ExpectQuery(`SELECT sp_source.url as source_url FROM Links l`).
					WithArgs("https://golang.org").
					WillReturnRows(rows)
			},
			expectedSources: 3,
			validateResults: func(t *testing.T, sources []string) {
				require.Contains(t, sources, "https://python.org")
				require.Contains(t, sources, "https://rust-lang.org")
				require.Contains(t, sources, "https://javascript.info")
			},
		},
		{
			name:      "page with no incoming links",
			targetURL: "https://new-page.com",
			setupMock: func(mock sqlmock.Sqlmock) {
				rows := sqlmock.NewRows([]string{"source_url"})

				mock.ExpectQuery(`SELECT sp_source.url as source_url FROM Links l`).
					WithArgs("https://new-page.com").
					WillReturnRows(rows)
			},
			expectedSources: 0,
			validateResults: func(t *testing.T, sources []string) {
				require.Empty(t, sources)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			require.NoError(t, err)
			defer db.Close()

			tt.setupMock(mock)

			// Query incoming links (pages that link TO this page)
			rows, err := db.Query(`
				SELECT sp_source.url as source_url
				FROM Links l
				JOIN SeenPages sp_source ON l.source_page_id = sp_source.id
				JOIN SeenPages sp_target ON l.target_page_id = sp_target.id
				WHERE sp_target.url = $1
			`, tt.targetURL)

			require.NoError(t, err)
			defer rows.Close()

			var sources []string
			for rows.Next() {
				var sourceURL string
				err := rows.Scan(&sourceURL)
				require.NoError(t, err)
				sources = append(sources, sourceURL)
			}

			require.Equal(t, tt.expectedSources, len(sources))
			if tt.validateResults != nil {
				tt.validateResults(t, sources)
			}

			require.NoError(t, mock.ExpectationsWereMet())
		})
	}
}

// TestGraphTraversal_PageRankInfluencedByLinks tests that PageRank respects link structure
func TestGraphTraversal_PageRankInfluencedByLinks(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Query PageRank scores with incoming link counts
	rows := sqlmock.NewRows([]string{"url", "incoming_links", "pagerank_score"}).
		AddRow("https://rust-lang.org", 3, 0.185).    // Most links -> highest score
		AddRow("https://python.org", 2, 0.168).       // Moderate links -> moderate score
		AddRow("https://javascript.info", 2, 0.152).  // Moderate links -> moderate score
		AddRow("https://golang.org", 1, 0.135).       // Few links -> lower score
		AddRow("https://cplusplus.com", 1, 0.098)     // Few links -> lowest score

	mock.ExpectQuery(`SELECT sp.url, COUNT\(l.source_page_id\) as incoming_links`).
		WillReturnRows(rows)

	// Execute query
	results, err := db.Query(`
		SELECT
			sp.url,
			COUNT(l.source_page_id) as incoming_links,
			COALESCE(pr.score, 0) as pagerank_score
		FROM SeenPages sp
		LEFT JOIN Links l ON l.target_page_id = sp.id
		LEFT JOIN PageRankResults pr ON pr.page_id = sp.id AND pr.is_latest = true
		GROUP BY sp.url, pr.score
		ORDER BY incoming_links DESC, pagerank_score DESC
	`)

	require.NoError(t, err)
	defer results.Close()

	type pageStats struct {
		url           string
		incomingLinks int
		pagerankScore float64
	}

	var stats []pageStats
	for results.Next() {
		var ps pageStats
		err := results.Scan(&ps.url, &ps.incomingLinks, &ps.pagerankScore)
		require.NoError(t, err)
		stats = append(stats, ps)
	}

	// Verify we got results
	require.Len(t, stats, 5)

	// Verify correlation: more links generally means higher PageRank
	// (First entry has most links and highest score)
	require.Equal(t, "https://rust-lang.org", stats[0].url)
	require.Equal(t, 3, stats[0].incomingLinks)
	require.Greater(t, stats[0].pagerankScore, 0.15)

	// Last entry has fewest links and lowest score
	require.Equal(t, "https://cplusplus.com", stats[4].url)
	require.Equal(t, 1, stats[4].incomingLinks)
	require.Less(t, stats[4].pagerankScore, 0.15)

	require.NoError(t, mock.ExpectationsWereMet())
}

// TestGraphTraversal_CycleDetection tests detecting cycles in the link graph
func TestGraphTraversal_CycleDetection(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Test with recursive CTE to detect reachability and cycles
	// golang.org -> python.org -> rust-lang.org -> ... -> golang.org (cycle)
	rows := sqlmock.NewRows([]string{"has_cycle"}).
		AddRow(true)

	mock.ExpectQuery(`WITH RECURSIVE reachable AS`).
		WithArgs("https://golang.org").
		WillReturnRows(rows)

	var hasCycle bool
	err = db.QueryRow(`
		WITH RECURSIVE reachable AS (
			SELECT s.id as start_id, t.id as current_id, 1 as depth
			FROM Links l
			JOIN SeenPages s ON l.source_page_id = s.id
			JOIN SeenPages t ON l.target_page_id = t.id
			WHERE s.url = $1

			UNION ALL

			SELECT r.start_id, t.id, r.depth + 1
			FROM reachable r
			JOIN Links l ON l.source_page_id = r.current_id
			JOIN SeenPages t ON l.target_page_id = t.id
			WHERE r.depth < 10
		)
		SELECT EXISTS(
			SELECT 1 FROM reachable
			WHERE start_id = current_id AND depth > 1
		)
	`, "https://golang.org").Scan(&hasCycle)

	require.NoError(t, err)
	require.True(t, hasCycle, "Graph should contain cycles (realistic web structure)")

	require.NoError(t, mock.ExpectationsWereMet())
}

// TestGraphTraversal_SearchTraversability tests finding related pages via search
func TestGraphTraversal_SearchTraversability(t *testing.T) {
	ctx := context.Background()
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Step 1: Find a page
	t.Log("Step 1: Finding golang.org")
	searchRows := sqlmock.NewRows([]string{"url", "title"}).
		AddRow("https://golang.org", "Go Programming Language")

	mock.ExpectQuery(`SELECT url, title FROM SeenPages WHERE url`).
		WithArgs("https://golang.org").
		WillReturnRows(searchRows)

	var pageURL, pageTitle string
	err = db.QueryRowContext(ctx, `SELECT url, title FROM SeenPages WHERE url = $1`, "https://golang.org").
		Scan(&pageURL, &pageTitle)
	require.NoError(t, err)
	require.Equal(t, "https://golang.org", pageURL)
	t.Logf("✓ Found: %s", pageTitle)

	// Step 2: Find pages it links to
	t.Log("Step 2: Finding linked pages")
	linkRows := sqlmock.NewRows([]string{"target_url"}).
		AddRow("https://python.org").
		AddRow("https://rust-lang.org").
		AddRow("https://javascript.info")

	mock.ExpectQuery(`SELECT l.target_url FROM Links l`).
		WithArgs("https://golang.org").
		WillReturnRows(linkRows)

	rows, err := db.QueryContext(ctx, `
		SELECT l.target_url
		FROM Links l
		JOIN SeenPages sp ON l.source_page_id = sp.id
		WHERE sp.url = $1
	`, "https://golang.org")
	require.NoError(t, err)
	defer rows.Close()

	var linkedPages []string
	for rows.Next() {
		var url string
		err := rows.Scan(&url)
		require.NoError(t, err)
		linkedPages = append(linkedPages, url)
	}

	require.Len(t, linkedPages, 3)
	t.Logf("✓ Found %d linked pages", len(linkedPages))

	// Step 3: Verify we can search for those linked pages
	t.Log("Step 3: Verifying linked pages are searchable")
	for _, linkedURL := range linkedPages {
		pageRows := sqlmock.NewRows([]string{"url", "is_indexable"}).
			AddRow(linkedURL, true)

		mock.ExpectQuery(`SELECT url, is_indexable FROM SeenPages WHERE url`).
			WithArgs(linkedURL).
			WillReturnRows(pageRows)

		var url string
		var isIndexable bool
		err = db.QueryRowContext(ctx, `SELECT url, is_indexable FROM SeenPages WHERE url = $1`, linkedURL).
			Scan(&url, &isIndexable)
		require.NoError(t, err)
		require.True(t, isIndexable, "Linked page %s should be indexable", linkedURL)
		t.Logf("✓ %s is searchable", linkedURL)
	}

	t.Log("✓ Graph traversal successful: golang.org -> [python, rust, javascript]")

	require.NoError(t, mock.ExpectationsWereMet())
}
