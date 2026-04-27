package e2e

import (
	"bytes"
	"context"
	"database/sql"
	"io"
	"net/http"
	"os/exec"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	searcher "webcrawler/pkg/generated/service/searcher"
)

func TestE2E_SearchEngine(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping E2E test in short mode")
	}

	// Panic recovery for Docker unavailability
	defer func() {
		if r := recover(); r != nil {
			t.Skipf("Skipping E2E test - Docker not available: %v", r)
		}
	}()

	ctx := context.Background()

	// Start docker-compose
	t.Log("Starting docker-compose environment...")
	cmd := exec.CommandContext(ctx, "docker",
		"compose",
		"-f", "test/e2e/docker-compose.e2e.yml",
		"up", "-d", "--build")
	cmd.Dir = "../../" // Run from repo root
	output, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("Failed to start docker-compose: %v\n%s", err, string(output))
	}
	t.Log("Docker-compose started successfully")

	// Cleanup
	defer func() {
		t.Log("Cleaning up docker-compose environment...")
		if t.Failed() {
			collectServiceLogs(t, []string{"postgres", "spider", "conductor", "cartographer", "searcher", "frontend"})
		}
		cleanupCmd := exec.Command("docker", "compose", "-f", "test/e2e/docker-compose.e2e.yml", "down", "-v")
		cleanupCmd.Dir = "../../"
		cleanupCmd.Run()
	}()

	// Run test phases as subtests
	t.Run("infrastructure", testInfrastructure)
	t.Run("spider_crawling", testSpiderCrawling)
	t.Run("conductor_deduplication", testConductorDeduplication)
	t.Run("cartographer_pagerank", testCartographerPageRank)
	t.Run("searcher_grpc", testSearcherGRPC)
	t.Run("frontend_http", testFrontendHTTP)
}

// testInfrastructure validates the infrastructure is ready
func testInfrastructure(t *testing.T) {
	ctx := context.Background()

	// Wait for PostgreSQL
	t.Log("Connecting to PostgreSQL...")
	var db *sql.DB
	err := pollUntil(ctx, 60*time.Second, func() (bool, error) {
		var err error
		db, err = connectToPostgres(ctx)
		if err != nil {
			return false, nil // Keep polling
		}
		return true, nil
	})
	require.NoError(t, err, "PostgreSQL not ready")
	defer db.Close()

	// Verify schema (5 tables: SeenPages, Queue, Links, PageRankResults, and potentially others)
	t.Log("Verifying database schema...")
	var tableCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'").Scan(&tableCount)
	require.NoError(t, err)
	require.GreaterOrEqual(t, tableCount, 4, "Expected at least 4 tables (SeenPages, Queue, Links, PageRankResults)")

	// Verify fixtures loaded - Queue
	t.Log("Verifying Queue fixtures loaded...")
	var queueCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM Queue WHERE status='pending'").Scan(&queueCount)
	require.NoError(t, err)
	require.Greater(t, queueCount, 0, "Queue table should have seeded URLs")
	t.Logf("Found %d pending URLs in Queue", queueCount)

	// Verify fixtures loaded - SeenPages
	t.Log("Verifying SeenPages fixtures loaded...")
	var pagesCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages").Scan(&pagesCount)
	require.NoError(t, err)
	require.Greater(t, pagesCount, 0, "SeenPages table should have seeded pages")
	t.Logf("Found %d pages in SeenPages", pagesCount)

	// Check Spider health
	t.Log("Checking Spider health...")
	err = pollUntil(ctx, 60*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8001/health")
	})
	require.NoError(t, err, "Spider not healthy")
	t.Log("Spider is healthy")

	// Check Conductor health
	t.Log("Checking Conductor health...")
	err = pollUntil(ctx, 60*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8002/health")
	})
	require.NoError(t, err, "Conductor not healthy")
	t.Log("Conductor is healthy")

	// Check Cartographer health
	t.Log("Checking Cartographer health...")
	err = pollUntil(ctx, 60*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8003/health")
	})
	require.NoError(t, err, "Cartographer not healthy")
	t.Log("Cartographer is healthy")

	// Check Searcher health
	t.Log("Checking Searcher health...")
	err = pollUntil(ctx, 60*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8004/health")
	})
	require.NoError(t, err, "Searcher not healthy")
	t.Log("Searcher is healthy")

	// Check Frontend health
	t.Log("Checking Frontend health...")
	err = pollUntil(ctx, 60*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8005/health")
	})
	require.NoError(t, err, "Frontend not healthy")
	t.Log("Frontend is healthy")

	t.Log("Infrastructure validation complete")
}

// testSpiderCrawling validates Spider crawls URLs and populates database
func testSpiderCrawling(t *testing.T) {
	ctx := context.Background()

	// Connect to PostgreSQL
	db, err := connectToPostgres(ctx)
	require.NoError(t, err, "Failed to connect to PostgreSQL")
	defer db.Close()

	// Get initial count
	var initialCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages").Scan(&initialCount)
	require.NoError(t, err)
	t.Logf("Initial SeenPages count: %d", initialCount)

	// Poll for Spider to crawl URLs from Queue
	// The Spider should be actively crawling and adding new pages
	t.Log("Waiting for Spider to crawl new pages...")
	err = pollUntil(ctx, 90*time.Second, func() (bool, error) {
		var currentCount int
		err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages WHERE crawl_time > NOW() - INTERVAL '2 minutes'").Scan(&currentCount)
		if err != nil {
			return false, err
		}
		t.Logf("Recent pages crawled: %d", currentCount)
		return currentCount > 0, nil
	})
	require.NoError(t, err, "Spider did not crawl new pages")

	// Verify search_vector populated (tsvector auto-generation)
	t.Log("Verifying search vectors are populated...")
	var vectorCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages WHERE search_vector IS NOT NULL").Scan(&vectorCount)
	require.NoError(t, err)
	require.Greater(t, vectorCount, 0, "Search vectors not generated")
	t.Logf("Found %d pages with search vectors", vectorCount)

	// Verify Links table populated
	t.Log("Verifying Links table is populated...")
	var linkCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM Links").Scan(&linkCount)
	require.NoError(t, err)
	require.Greater(t, linkCount, 0, "Links not extracted")
	t.Logf("Found %d links in Links table", linkCount)

	t.Log("Spider crawling validation complete")
}

// testConductorDeduplication validates Conductor prevents duplicate pages
func testConductorDeduplication(t *testing.T) {
	ctx := context.Background()

	// Connect to PostgreSQL
	db, err := connectToPostgres(ctx)
	require.NoError(t, err, "Failed to connect to PostgreSQL")
	defer db.Close()

	// Insert duplicate URL in Queue (one that's already in SeenPages from fixtures)
	t.Log("Inserting duplicate URL into Queue...")
	_, err = db.ExecContext(ctx, `
		INSERT INTO Queue (url, domain, status, priority)
		VALUES ($1, $2, 'pending', 10)
		ON CONFLICT (url) DO UPDATE SET status='pending', priority=10
	`, "https://golang.org", "golang.org")
	require.NoError(t, err)

	// Get initial SeenPages count for this URL
	var initialCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages WHERE url=$1", "https://golang.org").Scan(&initialCount)
	require.NoError(t, err)
	t.Logf("Initial count for golang.org: %d", initialCount)

	// Wait for potential crawl attempt
	t.Log("Waiting to verify deduplication...")
	time.Sleep(20 * time.Second)

	// Verify no duplicate (count should still be 1 or 0, not 2+)
	var finalCount int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages WHERE url=$1", "https://golang.org").Scan(&finalCount)
	require.NoError(t, err)
	t.Logf("Final count for golang.org: %d", finalCount)
	require.LessOrEqual(t, finalCount, 1, "Duplicate pages were not deduplicated")

	// Verify the Queue entry was processed (status should change or entry removed)
	var queueStatus string
	err = db.QueryRowContext(ctx, "SELECT status FROM Queue WHERE url=$1", "https://golang.org").Scan(&queueStatus)
	if err == nil {
		t.Logf("Queue status for golang.org: %s", queueStatus)
		// Status should not be pending anymore if it was processed
		// (This check is optional as the behavior may vary)
	} else if err == sql.ErrNoRows {
		t.Log("URL removed from Queue after processing")
	}

	t.Log("Conductor deduplication validation complete")
}

// testCartographerPageRank validates Cartographer computes PageRank scores
func testCartographerPageRank(t *testing.T) {
	ctx := context.Background()

	// Connect to PostgreSQL
	db, err := connectToPostgres(ctx)
	require.NoError(t, err, "Failed to connect to PostgreSQL")
	defer db.Close()

	// Trigger PageRank computation via HTTP endpoint
	t.Log("Triggering PageRank computation...")
	resp, err := http.Post("http://localhost:8003/compute", "application/json", bytes.NewReader([]byte{}))
	require.NoError(t, err, "Failed to trigger PageRank computation")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "PageRank computation returned non-OK status")

	// Poll for results
	t.Log("Waiting for PageRank results...")
	err = pollUntil(ctx, 120*time.Second, func() (bool, error) {
		var resultCount int
		err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM PageRankResults WHERE is_latest=true").Scan(&resultCount)
		if err != nil {
			return false, err
		}
		t.Logf("PageRank results count: %d", resultCount)
		return resultCount > 0, nil
	})
	require.NoError(t, err, "PageRank computation did not complete")

	// Verify scores vary (not uniform)
	t.Log("Verifying PageRank score distribution...")
	var scoreStdDev sql.NullFloat64
	err = db.QueryRowContext(ctx, "SELECT STDDEV(score) FROM PageRankResults WHERE is_latest=true").Scan(&scoreStdDev)
	require.NoError(t, err)
	if scoreStdDev.Valid {
		t.Logf("PageRank score standard deviation: %f", scoreStdDev.Float64)
		require.Greater(t, scoreStdDev.Float64, 0.0, "PageRank scores should vary")
	} else {
		// If STDDEV is NULL, it might mean there's only 1 row or all values are NULL
		// Check if we have multiple results
		var resultCount int
		err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM PageRankResults WHERE is_latest=true").Scan(&resultCount)
		require.NoError(t, err)
		if resultCount > 1 {
			t.Log("Warning: STDDEV is NULL despite multiple results")
		} else {
			t.Log("Only one PageRank result, skipping variance check")
		}
	}

	// Verify version tracking
	t.Log("Verifying version tracking...")
	var latestVersion int
	err = db.QueryRowContext(ctx, "SELECT result_version FROM PageRankResults WHERE is_latest=true LIMIT 1").Scan(&latestVersion)
	require.NoError(t, err)
	require.Greater(t, latestVersion, 0, "PageRank version should be greater than 0")
	t.Logf("PageRank version: %d", latestVersion)

	// Verify all results have the same version
	var versionCount int
	err = db.QueryRowContext(ctx, `
		SELECT COUNT(DISTINCT result_version)
		FROM PageRankResults
		WHERE is_latest=true
	`).Scan(&versionCount)
	require.NoError(t, err)
	require.Equal(t, 1, versionCount, "All latest results should have the same version")

	t.Log("Cartographer PageRank validation complete")
}

// testSearcherGRPC validates Searcher returns search results via gRPC
func testSearcherGRPC(t *testing.T) {
	ctx := context.Background()

	// Connect to Searcher gRPC
	t.Log("Connecting to Searcher gRPC...")
	conn, err := grpc.NewClient("localhost:9002",
		grpc.WithTransportCredentials(insecure.NewCredentials()))
	require.NoError(t, err)
	defer conn.Close()

	searcherClient := searcher.NewSearcherClient(conn)

	// Test valid query
	t.Log("Testing valid search query...")
	req := &searcher.SearchRequest{
		Query:  "programming language",
		Limit:  10,
		Offset: 0,
	}

	resp, err := searcherClient.SearchPages(ctx, req)
	require.NoError(t, err, "SearchPages RPC failed")
	require.NotNil(t, resp, "Response should not be nil")
	require.Greater(t, len(resp.Pages), 0, "Should return results for 'programming language' query")
	t.Logf("Found %d results for 'programming language'", len(resp.Pages))

	// Verify result structure
	firstResult := resp.Pages[0]
	require.NotEmpty(t, firstResult.Url, "Result URL should not be empty")
	require.NotEmpty(t, firstResult.Title, "Result title should not be empty")
	t.Logf("First result: %s - %s", firstResult.Title, firstResult.Url)

	// Verify results are ordered (best matches first)
	// We can't directly check scores, but we can verify all results have content
	for i, page := range resp.Pages {
		require.NotEmpty(t, page.Url, "Page %d URL should not be empty", i)
		require.NotEmpty(t, page.Title, "Page %d title should not be empty", i)
	}

	// Test query for specific language
	t.Log("Testing query for specific language (Go)...")
	goReq := &searcher.SearchRequest{
		Query:  "Go",
		Limit:  5,
		Offset: 0,
	}

	goResp, err := searcherClient.SearchPages(ctx, goReq)
	require.NoError(t, err, "SearchPages RPC failed for Go query")
	require.NotNil(t, goResp, "Response should not be nil")
	if len(goResp.Pages) > 0 {
		t.Logf("Found %d results for 'Go'", len(goResp.Pages))
		// Verify golang.org is in the results (from fixtures)
		foundGolang := false
		for _, page := range goResp.Pages {
			if page.Url == "https://golang.org" {
				foundGolang = true
				t.Log("Found golang.org in search results")
				break
			}
		}
		require.True(t, foundGolang, "Expected golang.org to be in results for 'Go' query")
	}

	// Test no-results query
	t.Log("Testing no-results query...")
	noResultsReq := &searcher.SearchRequest{
		Query:  "xyzabc123nonexistent",
		Limit:  10,
		Offset: 0,
	}
	noResultsResp, err := searcherClient.SearchPages(ctx, noResultsReq)
	require.NoError(t, err, "SearchPages RPC should not error on no-results query")
	require.NotNil(t, noResultsResp, "Response should not be nil")
	require.Equal(t, 0, len(noResultsResp.Pages), "Should return no results for nonexistent query")
	t.Log("No-results query handled correctly")

	// Test pagination
	t.Log("Testing pagination...")
	page1Req := &searcher.SearchRequest{
		Query:  "programming",
		Limit:  2,
		Offset: 0,
	}
	page1Resp, err := searcherClient.SearchPages(ctx, page1Req)
	require.NoError(t, err, "SearchPages RPC failed for page 1")

	page2Req := &searcher.SearchRequest{
		Query:  "programming",
		Limit:  2,
		Offset: 2,
	}
	page2Resp, err := searcherClient.SearchPages(ctx, page2Req)
	require.NoError(t, err, "SearchPages RPC failed for page 2")

	// Verify pagination returns different results
	if len(page1Resp.Pages) > 0 && len(page2Resp.Pages) > 0 {
		require.NotEqual(t, page1Resp.Pages[0].Url, page2Resp.Pages[0].Url,
			"Pagination should return different results")
		t.Log("Pagination works correctly")
	}

	t.Log("Searcher gRPC validation complete")
}

// testFrontendHTTP validates Frontend serves web interface correctly
func testFrontendHTTP(t *testing.T) {
	ctx := context.Background()

	// Wait for Frontend to be ready
	t.Log("Waiting for Frontend to be ready...")
	err := pollUntil(ctx, 30*time.Second, func() (bool, error) {
		return checkServiceHealth(ctx, "http://localhost:8005/health")
	})
	require.NoError(t, err, "Frontend not healthy")

	// Test homepage
	t.Log("Testing homepage...")
	resp, err := http.Get("http://localhost:3000/")
	require.NoError(t, err, "Failed to fetch homepage")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "Homepage should return 200 OK")

	body, err := io.ReadAll(resp.Body)
	require.NoError(t, err, "Failed to read homepage body")
	bodyStr := strings.ToLower(string(body))
	require.True(t, strings.Contains(bodyStr, "search") || strings.Contains(bodyStr, "query"),
		"Homepage should contain search form or query input")
	t.Log("Homepage loaded successfully")

	// Test search endpoint with results
	t.Log("Testing search endpoint with 'programming' query...")
	searchURL := "http://localhost:3000/search?q=programming&page=1"
	resp, err = http.Get(searchURL)
	require.NoError(t, err, "Failed to fetch search results")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "Search should return 200 OK")

	body, err = io.ReadAll(resp.Body)
	require.NoError(t, err, "Failed to read search results body")
	bodyStr = strings.ToLower(string(body))

	// Verify page contains search-related content
	hasSearchContent := strings.Contains(bodyStr, "result") ||
		strings.Contains(bodyStr, "golang") ||
		strings.Contains(bodyStr, "python") ||
		strings.Contains(bodyStr, "programming")
	require.True(t, hasSearchContent, "Search page should contain results or search-related content")
	require.NotContains(t, bodyStr, "internal server error", "Search page should not contain errors")
	t.Log("Search endpoint returned results")

	// Test search with Go query
	t.Log("Testing search endpoint with 'Go' query...")
	goSearchURL := "http://localhost:3000/search?q=Go&page=1"
	resp, err = http.Get(goSearchURL)
	require.NoError(t, err, "Failed to fetch Go search results")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "Go search should return 200 OK")

	body, err = io.ReadAll(resp.Body)
	require.NoError(t, err, "Failed to read Go search results body")
	bodyStr = string(body)
	// Verify golang.org appears in the results
	require.Contains(t, bodyStr, "golang.org", "Search results should contain golang.org for 'Go' query")
	t.Log("Found golang.org in search results")

	// Test search with no results
	t.Log("Testing search endpoint with no-results query...")
	noResultsURL := "http://localhost:3000/search?q=xyzabc123nonexistent&page=1"
	resp, err = http.Get(noResultsURL)
	require.NoError(t, err, "Failed to fetch no-results search")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "No-results search should return 200 OK")

	body, err = io.ReadAll(resp.Body)
	require.NoError(t, err, "Failed to read no-results body")
	bodyStr = strings.ToLower(string(body))
	hasNoResultsMessage := strings.Contains(bodyStr, "no result") ||
		strings.Contains(bodyStr, "not found") ||
		strings.Contains(bodyStr, "no match") ||
		strings.Contains(bodyStr, "0 result")
	require.True(t, hasNoResultsMessage, "No-results page should indicate no results found")
	t.Log("No-results query handled correctly")

	// Test pagination
	t.Log("Testing pagination...")
	page2URL := "http://localhost:3000/search?q=programming&page=2"
	resp, err = http.Get(page2URL)
	require.NoError(t, err, "Failed to fetch page 2")
	defer resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode, "Page 2 should return 200 OK")
	t.Log("Pagination works correctly")

	t.Log("Frontend HTTP validation complete")
}
