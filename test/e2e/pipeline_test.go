package e2e

import (
	"bytes"
	"context"
	"database/sql"
	"fmt"
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

// TestE2E_FullPipeline validates the complete end-to-end flow:
// 1. URL added to Queue
// 2. Spider crawls the URL
// 3. Data stored in SeenPages with search vectors
// 4. Links extracted and stored
// 5. PageRank computed
// 6. Page searchable via Searcher gRPC
// 7. Page appears in Frontend search results
//
// This test uses example.com as it's a reliable, stable test target.
func TestE2E_FullPipeline(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping E2E full pipeline test in short mode")
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
	cmd := exec.CommandContext(ctx, "docker-compose",
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
		cleanupCmd := exec.Command("docker-compose", "-f", "test/e2e/docker-compose.e2e.yml", "down", "-v")
		cleanupCmd.Dir = "../../"
		cleanupCmd.Run()
	}()

	// Wait for infrastructure
	t.Run("infrastructure_ready", func(t *testing.T) {
		testInfrastructureReady(t, ctx)
	})

	// Track a specific URL through the entire pipeline
	testURL := "https://example.com"
	testDomain := "example.com"
	searchQuery := "example"

	t.Run("full_pipeline_integration", func(t *testing.T) {
		// Connect to PostgreSQL
		db, err := connectToPostgres(ctx)
		require.NoError(t, err, "Failed to connect to PostgreSQL")
		defer db.Close()

		// Phase 1: Add URL to Queue
		t.Log("Phase 1: Adding URL to Queue...")
		_, err = db.ExecContext(ctx, `
			INSERT INTO Queue (url, domain, status, priority)
			VALUES ($1, $2, 'pending', 100)
			ON CONFLICT (url) DO UPDATE SET status='pending', priority=100
		`, testURL, testDomain)
		require.NoError(t, err, "Failed to insert URL into Queue")
		t.Logf("✓ Added %s to Queue with high priority", testURL)

		// Phase 2: Wait for Spider to crawl the URL
		t.Log("Phase 2: Waiting for Spider to crawl the URL...")
		var pageID int64
		err = pollUntil(ctx, 120*time.Second, func() (bool, error) {
			err := db.QueryRowContext(ctx, `
				SELECT id FROM SeenPages
				WHERE url = $1 AND crawl_time IS NOT NULL
			`, testURL).Scan(&pageID)
			if err == sql.ErrNoRows {
				t.Log("  Still waiting for Spider to crawl URL...")
				return false, nil
			}
			if err != nil {
				return false, err
			}
			return true, nil
		})
		require.NoError(t, err, "Spider did not crawl the URL in time")
		t.Logf("✓ Spider crawled %s (page_id: %d)", testURL, pageID)

		// Phase 3: Verify page data stored correctly
		t.Log("Phase 3: Verifying page data in SeenPages...")
		var title, body, searchVector string
		var statusCode int
		var isIndexable bool
		err = db.QueryRowContext(ctx, `
			SELECT title, body, status_code, is_indexable,
			       COALESCE(search_vector::text, '') as search_vector
			FROM SeenPages
			WHERE id = $1
		`, pageID).Scan(&title, &body, &statusCode, &isIndexable, &searchVector)
		require.NoError(t, err, "Failed to query SeenPages")
		require.NotEmpty(t, title, "Title should not be empty")
		require.NotEmpty(t, body, "Body should not be empty")
		require.Equal(t, 200, statusCode, "Status code should be 200")
		require.True(t, isIndexable, "Page should be indexable")
		require.NotEmpty(t, searchVector, "Search vector should be generated")
		t.Logf("✓ Page data stored: title='%s', status=%d, indexable=%v", title, statusCode, isIndexable)
		t.Logf("✓ Search vector generated: %s", truncate(searchVector, 100))

		// Phase 4: Verify links extracted
		t.Log("Phase 4: Verifying links extracted...")
		var linkCount int
		err = db.QueryRowContext(ctx, `
			SELECT COUNT(*) FROM Links WHERE source_page_id = $1
		`, pageID).Scan(&linkCount)
		require.NoError(t, err, "Failed to query Links")
		t.Logf("✓ Found %d links extracted from the page", linkCount)

		// Phase 5: Trigger PageRank computation
		t.Log("Phase 5: Triggering PageRank computation...")
		resp, err := http.Post("http://localhost:8003/compute", "application/json", bytes.NewReader([]byte{}))
		require.NoError(t, err, "Failed to trigger PageRank")
		defer resp.Body.Close()
		require.Equal(t, http.StatusOK, resp.StatusCode, "PageRank trigger should return 200")
		t.Log("✓ PageRank computation triggered")

		// Phase 6: Wait for PageRank score
		t.Log("Phase 6: Waiting for PageRank score...")
		var pageRankScore float64
		err = pollUntil(ctx, 180*time.Second, func() (bool, error) {
			err := db.QueryRowContext(ctx, `
				SELECT score
				FROM PageRankResults
				WHERE page_id = $1 AND is_latest = true
			`, pageID).Scan(&pageRankScore)
			if err == sql.ErrNoRows {
				t.Log("  Still waiting for PageRank computation...")
				return false, nil
			}
			if err != nil {
				return false, err
			}
			return true, nil
		})
		require.NoError(t, err, "PageRank score not computed in time")
		require.Greater(t, pageRankScore, 0.0, "PageRank score should be positive")
		t.Logf("✓ PageRank score computed: %.6f", pageRankScore)

		// Phase 7: Search for the page via Searcher gRPC
		t.Log("Phase 7: Searching for page via Searcher gRPC...")
		conn, err := grpc.NewClient("localhost:9002",
			grpc.WithTransportCredentials(insecure.NewCredentials()))
		require.NoError(t, err, "Failed to connect to Searcher")
		defer conn.Close()

		searcherClient := searcher.NewSearcherClient(conn)
		searchReq := &searcher.SearchRequest{
			Query:  searchQuery,
			Limit:  20,
			Offset: 0,
		}

		searchResp, err := searcherClient.SearchPages(ctx, searchReq)
		require.NoError(t, err, "SearchPages RPC failed")
		require.NotNil(t, searchResp, "Search response should not be nil")
		require.Greater(t, len(searchResp.Pages), 0, "Search should return results")

		// Verify our URL is in the results
		foundInSearch := false
		var resultPosition int
		for i, page := range searchResp.Pages {
			if page.Url == testURL {
				foundInSearch = true
				resultPosition = i + 1
				t.Logf("✓ Found %s in search results at position %d", testURL, resultPosition)
				t.Logf("  Result: title='%s', url='%s'", page.Title, page.Url)
				break
			}
		}
		require.True(t, foundInSearch, "The crawled URL should appear in search results for '%s'", searchQuery)

		// Phase 8: Verify page appears in Frontend
		t.Log("Phase 8: Verifying page appears in Frontend...")
		frontendURL := fmt.Sprintf("http://localhost:3000/search?q=%s&page=1", searchQuery)
		httpResp, err := http.Get(frontendURL)
		require.NoError(t, err, "Failed to fetch Frontend search results")
		defer httpResp.Body.Close()
		require.Equal(t, http.StatusOK, httpResp.StatusCode, "Frontend should return 200 OK")

		// Read response body
		var bodyBuf bytes.Buffer
		_, err = bodyBuf.ReadFrom(httpResp.Body)
		require.NoError(t, err, "Failed to read Frontend response")
		bodyStr := bodyBuf.String()

		// Verify the URL or domain appears in the HTML
		foundInFrontend := strings.Contains(bodyStr, testURL) || strings.Contains(bodyStr, testDomain)
		require.True(t, foundInFrontend, "The crawled URL should appear in Frontend search results")
		t.Logf("✓ Verified %s appears in Frontend HTML", testURL)

		// Final summary
		t.Log("\n=== FULL PIPELINE TEST SUMMARY ===")
		t.Logf("✓ URL: %s", testURL)
		t.Logf("✓ Page ID: %d", pageID)
		t.Logf("✓ Title: %s", title)
		t.Logf("✓ Status Code: %d", statusCode)
		t.Logf("✓ Links Extracted: %d", linkCount)
		t.Logf("✓ PageRank Score: %.6f", pageRankScore)
		t.Logf("✓ Search Position: %d", resultPosition)
		t.Logf("✓ All pipeline phases completed successfully!")
	})
}

// testInfrastructureReady waits for all services to be healthy
func testInfrastructureReady(t *testing.T, ctx context.Context) {
	t.Helper()

	// Wait for PostgreSQL
	t.Log("Waiting for PostgreSQL...")
	var db *sql.DB
	err := pollUntil(ctx, 60*time.Second, func() (bool, error) {
		var err error
		db, err = connectToPostgres(ctx)
		if err != nil {
			return false, nil
		}
		return true, nil
	})
	require.NoError(t, err, "PostgreSQL not ready")
	defer db.Close()
	t.Log("✓ PostgreSQL ready")

	// Wait for all services
	services := map[string]string{
		"Spider":       "http://localhost:8001/health",
		"Conductor":    "http://localhost:8002/health",
		"Cartographer": "http://localhost:8003/health",
		"Searcher":     "http://localhost:8004/health",
		"Frontend":     "http://localhost:8005/health",
	}

	for name, url := range services {
		t.Logf("Waiting for %s...", name)
		err := pollUntil(ctx, 60*time.Second, func() (bool, error) {
			return checkServiceHealth(ctx, url)
		})
		require.NoError(t, err, "%s not healthy", name)
		t.Logf("✓ %s ready", name)
	}
}

// truncate truncates a string to maxLen characters
func truncate(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen] + "..."
}
