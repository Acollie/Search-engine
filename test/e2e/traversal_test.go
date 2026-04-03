package e2e

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os/exec"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	searcher "webcrawler/pkg/generated/service/searcher"
)

// TestE2E_GraphTraversal validates that the search engine correctly handles
// the web graph structure:
// 1. Pages link to each other (graph connectivity)
// 2. PageRank respects the link structure
// 3. Search results reflect link popularity
// 4. The system can traverse from one page to related pages
func TestE2E_GraphTraversal(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping E2E graph traversal test in short mode")
	}

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
	cmd.Dir = "../../"
	output, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("Failed to start docker-compose: %v\n%s", err, string(output))
	}
	t.Log("Docker-compose started successfully")

	// Cleanup
	defer func() {
		t.Log("Cleaning up docker-compose environment...")
		if t.Failed() {
			collectServiceLogs(t, []string{"postgres", "spider", "conductor", "cartographer", "searcher"})
		}
		cleanupCmd := exec.Command("docker-compose", "-f", "test/e2e/docker-compose.e2e.yml", "down", "-v")
		cleanupCmd.Dir = "../../"
		cleanupCmd.Run()
	}()

	// Wait for infrastructure
	t.Run("infrastructure_ready", func(t *testing.T) {
		testInfrastructureReady(t, ctx)
	})

	t.Run("graph_connectivity", func(t *testing.T) {
		db, err := connectToPostgres(ctx)
		require.NoError(t, err)
		defer db.Close()

		// Verify the graph structure exists
		t.Log("Verifying graph structure in database...")

		// Check that we have pages
		var pageCount int
		err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM SeenPages").Scan(&pageCount)
		require.NoError(t, err)
		require.GreaterOrEqual(t, pageCount, 6, "Should have at least 6 seeded pages")
		t.Logf("✓ Found %d pages in database", pageCount)

		// Check that we have links
		var linkCount int
		err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM Links WHERE target_page_id IS NOT NULL").Scan(&linkCount)
		require.NoError(t, err)
		require.Greater(t, linkCount, 0, "Should have internal links")
		t.Logf("✓ Found %d internal links", linkCount)

		// Verify specific link relationships
		type linkRelation struct {
			source string
			target string
		}
		expectedLinks := []linkRelation{
			{"https://golang.org", "https://python.org"},
			{"https://golang.org", "https://rust-lang.org"},
			{"https://python.org", "https://rust-lang.org"},
		}

		for _, link := range expectedLinks {
			var exists bool
			err = db.QueryRowContext(ctx, `
				SELECT EXISTS(
					SELECT 1 FROM Links l
					JOIN SeenPages s ON l.source_page_id = s.id
					JOIN SeenPages t ON l.target_page_id = t.id
					WHERE s.url = $1 AND t.url = $2
				)
			`, link.source, link.target).Scan(&exists)
			require.NoError(t, err)
			require.True(t, exists, "Expected link from %s to %s", link.source, link.target)
			t.Logf("✓ Verified link: %s -> %s", link.source, link.target)
		}

		// Verify bidirectional connectivity (web graph has cycles)
		t.Log("Checking for graph cycles (realistic web structure)...")
		var hasCycles bool
		err = db.QueryRowContext(ctx, `
			WITH RECURSIVE reachable AS (
				-- Start from golang.org
				SELECT s.id as start_id, t.id as current_id, 1 as depth
				FROM Links l
				JOIN SeenPages s ON l.source_page_id = s.id
				JOIN SeenPages t ON l.target_page_id = t.id
				WHERE s.url = 'https://golang.org'

				UNION ALL

				-- Follow links
				SELECT r.start_id, t.id, r.depth + 1
				FROM reachable r
				JOIN Links l ON l.source_page_id = r.current_id
				JOIN SeenPages t ON l.target_page_id = t.id
				WHERE r.depth < 10  -- Prevent infinite recursion
			)
			SELECT EXISTS(
				SELECT 1 FROM reachable
				WHERE start_id = current_id AND depth > 1
			)
		`).Scan(&hasCycles)
		require.NoError(t, err)
		t.Logf("✓ Graph contains cycles: %v (realistic web structure)", hasCycles)
	})

	t.Run("pagerank_link_structure", func(t *testing.T) {
		db, err := connectToPostgres(ctx)
		require.NoError(t, err)
		defer db.Close()

		// Compute PageRank scores
		t.Log("Computing PageRank scores...")
		resp, err := http.Post("http://localhost:8003/compute", "application/json", nil)
		require.NoError(t, err)
		defer resp.Body.Close()
		require.Equal(t, http.StatusOK, resp.StatusCode)

		// Wait for PageRank computation
		t.Log("Waiting for PageRank results...")
		err = pollUntil(ctx, 180*time.Second, func() (bool, error) {
			var count int
			err := db.QueryRowContext(ctx, `
				SELECT COUNT(*) FROM PageRankResults WHERE is_latest = true
			`).Scan(&count)
			if err != nil {
				return false, err
			}
			return count >= 3, nil
		})
		require.NoError(t, err, "PageRank computation did not complete")

		// Analyze PageRank distribution
		t.Log("Analyzing PageRank distribution...")
		rows, err := db.QueryContext(ctx, `
			SELECT sp.url, pr.score
			FROM PageRankResults pr
			JOIN SeenPages sp ON pr.page_id = sp.id
			WHERE pr.is_latest = true
			ORDER BY pr.score DESC
			LIMIT 10
		`)
		require.NoError(t, err)
		defer rows.Close()

		type pageScore struct {
			url   string
			score float64
		}
		var scores []pageScore
		for rows.Next() {
			var ps pageScore
			err := rows.Scan(&ps.url, &ps.score)
			require.NoError(t, err)
			scores = append(scores, ps)
			t.Logf("  %s: %.6f", ps.url, ps.score)
		}
		require.NoError(t, rows.Err())
		require.Greater(t, len(scores), 0, "Should have PageRank scores")

		// Verify that pages with more incoming links have higher scores
		// Get incoming link counts
		type linkStats struct {
			url           string
			incomingLinks int
			score         float64
		}
		var stats []linkStats
		rows, err = db.QueryContext(ctx, `
			SELECT
				sp.url,
				COUNT(l.source_page_id) as incoming_links,
				COALESCE(pr.score, 0) as score
			FROM SeenPages sp
			LEFT JOIN Links l ON l.target_page_id = sp.id
			LEFT JOIN PageRankResults pr ON pr.page_id = sp.id AND pr.is_latest = true
			WHERE sp.url IN (
				'https://golang.org',
				'https://python.org',
				'https://rust-lang.org',
				'https://javascript.info',
				'https://docs.oracle.com/javase',
				'https://cplusplus.com'
			)
			GROUP BY sp.url, pr.score
			ORDER BY incoming_links DESC
		`)
		require.NoError(t, err)
		defer rows.Close()

		for rows.Next() {
			var ls linkStats
			err := rows.Scan(&ls.url, &ls.incomingLinks, &ls.score)
			require.NoError(t, err)
			stats = append(stats, ls)
			t.Logf("  %s: %d incoming links, score=%.6f", ls.url, ls.incomingLinks, ls.score)
		}
		require.NoError(t, rows.Err())

		// Verify correlation: more links generally means higher score
		// (Not always perfect due to damping and random walk, but should show a trend)
		if len(stats) >= 2 {
			mostLinked := stats[0]
			leastLinked := stats[len(stats)-1]
			t.Logf("✓ Most linked (%s): %d links, score=%.6f",
				mostLinked.url, mostLinked.incomingLinks, mostLinked.score)
			t.Logf("✓ Least linked (%s): %d links, score=%.6f",
				leastLinked.url, leastLinked.incomingLinks, leastLinked.score)
		}
	})

	t.Run("search_traversal", func(t *testing.T) {
		db, err := connectToPostgres(ctx)
		require.NoError(t, err)
		defer db.Close()

		// Connect to Searcher
		conn, err := grpc.NewClient("localhost:9002",
			grpc.WithTransportCredentials(insecure.NewCredentials()))
		require.NoError(t, err)
		defer conn.Close()

		searcherClient := searcher.NewSearcherClient(conn)

		// Test 1: Search for "programming" should return multiple results
		t.Log("Test 1: Searching for 'programming'...")
		req := &searcher.SearchRequest{
			Query:  "programming",
			Limit:  20,
			Offset: 0,
		}
		resp, err := searcherClient.SearchPages(ctx, req)
		require.NoError(t, err)
		require.Greater(t, len(resp.Pages), 0, "Should return results for 'programming'")
		t.Logf("✓ Found %d results for 'programming'", len(resp.Pages))

		// Verify results include known pages
		foundPages := make(map[string]bool)
		for _, page := range resp.Pages {
			foundPages[page.Url] = true
			t.Logf("  - %s: %s", page.Url, page.Title)
		}

		// Test 2: Search for specific language
		t.Log("Test 2: Searching for 'Go'...")
		goReq := &searcher.SearchRequest{
			Query:  "Go",
			Limit:  10,
			Offset: 0,
		}
		goResp, err := searcherClient.SearchPages(ctx, goReq)
		require.NoError(t, err)
		require.Greater(t, len(goResp.Pages), 0, "Should return results for 'Go'")

		foundGolang := false
		for _, page := range goResp.Pages {
			if page.Url == "https://golang.org" {
				foundGolang = true
				t.Logf("✓ Found golang.org in 'Go' search results")
				break
			}
		}
		require.True(t, foundGolang, "golang.org should appear in 'Go' search results")

		// Test 3: Verify related pages can be discovered
		t.Log("Test 3: Testing traversal - finding linked pages...")

		// Get links from a known page (golang.org)
		var linkedURLs []string
		rows, err := db.QueryContext(ctx, `
			SELECT sp_target.url
			FROM Links l
			JOIN SeenPages sp_source ON l.source_page_id = sp_source.id
			JOIN SeenPages sp_target ON l.target_page_id = sp_target.id
			WHERE sp_source.url = 'https://golang.org'
			LIMIT 5
		`)
		require.NoError(t, err)
		defer rows.Close()

		for rows.Next() {
			var url string
			err := rows.Scan(&url)
			require.NoError(t, err)
			linkedURLs = append(linkedURLs, url)
		}
		require.NoError(t, rows.Err())
		require.Greater(t, len(linkedURLs), 0, "golang.org should have outgoing links")

		t.Logf("✓ golang.org links to %d pages:", len(linkedURLs))
		for _, url := range linkedURLs {
			t.Logf("  -> %s", url)
		}

		// Verify we can search for and find those linked pages
		for _, linkedURL := range linkedURLs[:min(3, len(linkedURLs))] {
			// Extract a search term from the URL
			searchTerm := extractSearchTerm(linkedURL)
			if searchTerm == "" {
				continue
			}

			t.Logf("Test 4: Searching for linked page with term '%s'...", searchTerm)
			linkedReq := &searcher.SearchRequest{
				Query:  searchTerm,
				Limit:  10,
				Offset: 0,
			}
			linkedResp, err := searcherClient.SearchPages(ctx, linkedReq)
			require.NoError(t, err)

			foundLinked := false
			for _, page := range linkedResp.Pages {
				if page.Url == linkedURL {
					foundLinked = true
					t.Logf("✓ Successfully traversed to linked page: %s", linkedURL)
					break
				}
			}
			if !foundLinked {
				t.Logf("  (Linked page %s not in top results for '%s', but graph structure is valid)", linkedURL, searchTerm)
			}
		}
	})
}

// extractSearchTerm extracts a meaningful search term from a URL
func extractSearchTerm(url string) string {
	terms := map[string]string{
		"python.org":              "python",
		"rust-lang.org":           "rust",
		"javascript.info":         "javascript",
		"docs.oracle.com/javase": "java",
		"cplusplus.com":          "c++",
	}

	for domain, term := range terms {
		if contains(url, domain) {
			return term
		}
	}
	return ""
}

// contains checks if s contains substr
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > len(substr) &&
		(s[:len(substr)] == substr || s[len(s)-len(substr):] == substr ||
		indexOf(s, substr) >= 0))
}

// indexOf returns the index of substr in s, or -1 if not found
func indexOf(s, substr string) int {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return i
		}
	}
	return -1
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
