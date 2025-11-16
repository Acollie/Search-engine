package graph

import (
	"context"
	"testing"
	"webcrawler/cmd/spider/pkg/site"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPageRank_EmptyGraph(t *testing.T) {
	ctx := context.Background()
	graph := Graph{}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Empty(t, result)
}

func TestPageRank_SinglePage(t *testing.T) {
	ctx := context.Background()
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 1)

	// Single page gets (1-d)/n + d * 0 = 0.15 rank due to damping factor
	rankValue := float64(result["page1"].ProminenceValue) / ScaleFactor
	assert.InDelta(t, 0.15, rankValue, 0.01, "Single page should have ~0.15 rank due to damping")
}

func TestPageRank_TwoPages_Bidirectional(t *testing.T) {
	ctx := context.Background()
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 2)

	// In a bidirectional two-node graph, both should have equal rank
	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor

	assert.InDelta(t, rank1, rank2, 0.01, "Both pages should have similar ranks")
	assert.InDelta(t, 0.5, rank1, 0.1, "Each page should have ~0.5 rank")
}

func TestPageRank_LinearChain(t *testing.T) {
	ctx := context.Background()
	// page1 -> page2 -> page3 -> page4
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page3"},
			ProminenceValue: 0,
		},
		"page3": {
			URL:             "page3",
			Links:           []string{"page4"},
			ProminenceValue: 0,
		},
		"page4": {
			URL:             "page4",
			Links:           []string{},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 4)

	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor
	rank3 := float64(result["page3"].ProminenceValue) / ScaleFactor
	rank4 := float64(result["page4"].ProminenceValue) / ScaleFactor

	// In a linear chain, pages at the end should have higher rank
	assert.Greater(t, rank4, rank3, "page4 should have higher rank than page3")
	assert.Greater(t, rank4, rank2, "page4 should have higher rank than page2")
	assert.Greater(t, rank4, rank1, "page4 should have higher rank than page1")
}

func TestPageRank_Cycle(t *testing.T) {
	ctx := context.Background()
	// page1 -> page2 -> page3 -> page4 -> page1
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page3"},
			ProminenceValue: 0,
		},
		"page3": {
			URL:             "page3",
			Links:           []string{"page4"},
			ProminenceValue: 0,
		},
		"page4": {
			URL:             "page4",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 4)

	// In a perfect cycle, all pages should have equal rank
	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor
	rank3 := float64(result["page3"].ProminenceValue) / ScaleFactor
	rank4 := float64(result["page4"].ProminenceValue) / ScaleFactor

	assert.InDelta(t, rank1, rank2, 0.01, "All pages in cycle should have similar ranks")
	assert.InDelta(t, rank1, rank3, 0.01, "All pages in cycle should have similar ranks")
	assert.InDelta(t, rank1, rank4, 0.01, "All pages in cycle should have similar ranks")
	assert.InDelta(t, 0.25, rank1, 0.05, "Each page should have ~0.25 rank")
}

func TestPageRank_Hub(t *testing.T) {
	ctx := context.Background()
	// Multiple pages linking to one hub page
	graph := Graph{
		"hub": {
			URL:             "hub",
			Links:           []string{},
			ProminenceValue: 0,
		},
		"page1": {
			URL:             "page1",
			Links:           []string{"hub"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"hub"},
			ProminenceValue: 0,
		},
		"page3": {
			URL:             "page3",
			Links:           []string{"hub"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 4)

	rankHub := float64(result["hub"].ProminenceValue) / ScaleFactor
	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor
	rank3 := float64(result["page3"].ProminenceValue) / ScaleFactor

	// Hub should have much higher rank than individual pages
	assert.Greater(t, rankHub, rank1, "Hub should have higher rank")
	assert.Greater(t, rankHub, rank2, "Hub should have higher rank")
	assert.Greater(t, rankHub, rank3, "Hub should have higher rank")

	// Individual pages should have similar ranks
	assert.InDelta(t, rank1, rank2, 0.01, "Non-hub pages should have similar ranks")
	assert.InDelta(t, rank1, rank3, 0.01, "Non-hub pages should have similar ranks")
}

func TestPageRank_DanglingNode(t *testing.T) {
	ctx := context.Background()
	// page1 -> page2, but page2 has no outgoing links (dangling node)
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{}, // Dangling node
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 2)

	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor

	// page2 should have higher rank as it receives a link
	assert.Greater(t, rank2, rank1, "Page receiving link should have higher rank")
}

func TestPageRank_ComplexGraph(t *testing.T) {
	ctx := context.Background()
	// More complex graph structure
	// page1 -> page2, page3
	// page2 -> page3, page4
	// page3 -> page4
	// page4 -> page1
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2", "page3"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page3", "page4"},
			ProminenceValue: 0,
		},
		"page3": {
			URL:             "page3",
			Links:           []string{"page4"},
			ProminenceValue: 0,
		},
		"page4": {
			URL:             "page4",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 4)

	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor
	rank3 := float64(result["page3"].ProminenceValue) / ScaleFactor
	rank4 := float64(result["page4"].ProminenceValue) / ScaleFactor

	// In a complex graph, ranks should be distributed
	// page4 and page3 receive the most incoming links
	// The exact distribution depends on the damping factor and link structure
	// Just verify all ranks are positive and sum to ~1.0
	assert.Greater(t, rank1, 0.0, "page1 should have positive rank")
	assert.Greater(t, rank2, 0.0, "page2 should have positive rank")
	assert.Greater(t, rank3, 0.0, "page3 should have positive rank")
	assert.Greater(t, rank4, 0.0, "page4 should have positive rank")

	// Total rank should sum to approximately 1.0
	totalRank := rank1 + rank2 + rank3 + rank4
	assert.InDelta(t, 1.0, totalRank, 0.1, "Total rank should sum to ~1.0")
}

func TestPageRank_ExternalLinks(t *testing.T) {
	ctx := context.Background()
	// Test with links to pages outside the graph
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2", "external"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 2)

	// Should handle external links gracefully
	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor

	assert.Greater(t, rank1, 0.0, "page1 should have non-zero rank")
	assert.Greater(t, rank2, 0.0, "page2 should have non-zero rank")
}

func TestPageRank_DuplicateLinks(t *testing.T) {
	ctx := context.Background()
	// Test with duplicate links (should be deduplicated)
	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2", "page2", "page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, 2)

	// Duplicate links should be treated as single link
	rank1 := float64(result["page1"].ProminenceValue) / ScaleFactor
	rank2 := float64(result["page2"].ProminenceValue) / ScaleFactor

	assert.InDelta(t, rank1, rank2, 0.01, "Should handle duplicate links")
}

func TestPageRank_Convergence(t *testing.T) {
	ctx := context.Background()
	// Large graph to test convergence
	graph := Graph{}
	numPages := 100

	for i := 0; i < numPages; i++ {
		pageID := "page" + string(rune(i))
		nextPageID := "page" + string(rune((i+1)%numPages))

		graph[pageID] = &site.Page{
			URL:             pageID,
			Links:           []string{nextPageID},
			ProminenceValue: 0,
		}
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)
	assert.Len(t, result, numPages)

	// Check that total rank sums to ~1.0
	totalRank := 0.0
	for _, page := range result {
		totalRank += float64(page.ProminenceValue) / ScaleFactor
	}

	assert.InDelta(t, 1.0, totalRank, 0.1, "Total rank should converge to ~1.0")
}

func TestPageRank_ContextCancellation(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel() // Cancel immediately

	graph := Graph{
		"page1": {
			URL:             "page1",
			Links:           []string{"page2"},
			ProminenceValue: 0,
		},
		"page2": {
			URL:             "page2",
			Links:           []string{"page1"},
			ProminenceValue: 0,
		},
	}

	_, err := PageRank(ctx, graph)

	require.Error(t, err)
	assert.Equal(t, context.Canceled, err)
}

func TestBuildIncomingLinksMap(t *testing.T) {
	graph := Graph{
		"page1": {
			URL:   "page1",
			Links: []string{"page2", "page3"},
		},
		"page2": {
			URL:   "page2",
			Links: []string{"page3"},
		},
		"page3": {
			URL:   "page3",
			Links: []string{"page1"},
		},
	}

	incomingLinks := buildIncomingLinksMap(graph)

	assert.Len(t, incomingLinks, 3)
	assert.ElementsMatch(t, []string{"page1"}, incomingLinks["page2"])
	assert.ElementsMatch(t, []string{"page1", "page2"}, incomingLinks["page3"])
	assert.ElementsMatch(t, []string{"page3"}, incomingLinks["page1"])
}

func TestBuildIncomingLinksMap_ExternalLinks(t *testing.T) {
	graph := Graph{
		"page1": {
			URL:   "page1",
			Links: []string{"page2", "external"},
		},
		"page2": {
			URL:   "page2",
			Links: []string{"page1"},
		},
	}

	incomingLinks := buildIncomingLinksMap(graph)

	// Should only include links to pages in graph
	assert.Len(t, incomingLinks, 2)
	assert.NotContains(t, incomingLinks, "external")
}

func TestCountValidOutboundLinks(t *testing.T) {
	graph := Graph{
		"page1": {URL: "page1"},
		"page2": {URL: "page2"},
		"page3": {URL: "page3"},
	}

	page := &site.Page{
		URL:   "test",
		Links: []string{"page1", "page2", "external", "page1"}, // Includes duplicates and external
	}

	count := countValidOutboundLinks(page, graph)

	// Should count 2 unique valid links (page1, page2)
	assert.Equal(t, 2, count)
}

func TestContainsLink(t *testing.T) {
	links := []string{"page1", "page2", "page3"}

	assert.True(t, containsLink(links, "page1"))
	assert.True(t, containsLink(links, "page2"))
	assert.True(t, containsLink(links, "page3"))
	assert.False(t, containsLink(links, "page4"))
	assert.False(t, containsLink(links, ""))
}

func TestPageRank_RankDistribution(t *testing.T) {
	ctx := context.Background()
	// Create a more realistic graph structure
	graph := Graph{
		"homepage": {
			URL:             "homepage",
			Links:           []string{"about", "contact", "blog"},
			ProminenceValue: 0,
		},
		"about": {
			URL:             "about",
			Links:           []string{"homepage"},
			ProminenceValue: 0,
		},
		"contact": {
			URL:             "contact",
			Links:           []string{"homepage"},
			ProminenceValue: 0,
		},
		"blog": {
			URL:             "blog",
			Links:           []string{"homepage", "article1", "article2"},
			ProminenceValue: 0,
		},
		"article1": {
			URL:             "article1",
			Links:           []string{"blog", "homepage"},
			ProminenceValue: 0,
		},
		"article2": {
			URL:             "article2",
			Links:           []string{"blog", "homepage"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)

	homepageRank := float64(result["homepage"].ProminenceValue) / ScaleFactor
	blogRank := float64(result["blog"].ProminenceValue) / ScaleFactor
	aboutRank := float64(result["about"].ProminenceValue) / ScaleFactor

	// Homepage should have highest rank (receives most links)
	assert.Greater(t, homepageRank, blogRank)
	assert.Greater(t, homepageRank, aboutRank)

	// Verify all ranks are positive
	for url, page := range result {
		rank := float64(page.ProminenceValue) / ScaleFactor
		assert.Greater(t, rank, 0.0, "Page %s should have positive rank", url)
	}
}

func TestPageRank_DampingFactor(t *testing.T) {
	ctx := context.Background()
	// Test that damping factor prevents rank sink
	graph := Graph{
		"sink": {
			URL:             "sink",
			Links:           []string{}, // No outgoing links
			ProminenceValue: 0,
		},
		"page1": {
			URL:             "page1",
			Links:           []string{"sink"},
			ProminenceValue: 0,
		},
	}

	result, err := PageRank(ctx, graph)

	require.NoError(t, err)

	sinkRank := float64(result["sink"].ProminenceValue) / ScaleFactor
	page1Rank := float64(result["page1"].ProminenceValue) / ScaleFactor

	// Both should have non-zero rank due to damping factor (teleportation)
	assert.Greater(t, sinkRank, 0.0)
	assert.Greater(t, page1Rank, 0.0)

	// Sink should have higher rank but not 100% due to damping
	assert.Greater(t, sinkRank, page1Rank)
	assert.Less(t, sinkRank, 1.0)
}

func BenchmarkPageRank_SmallGraph(b *testing.B) {
	ctx := context.Background()
	graph := Graph{
		"page1": {URL: "page1", Links: []string{"page2"}},
		"page2": {URL: "page2", Links: []string{"page3"}},
		"page3": {URL: "page3", Links: []string{"page1"}},
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = PageRank(ctx, graph)
	}
}

func BenchmarkPageRank_MediumGraph(b *testing.B) {
	ctx := context.Background()
	graph := Graph{}

	// Create a graph with 100 nodes
	for i := 0; i < 100; i++ {
		pageID := "page" + string(rune(i))
		nextPageID := "page" + string(rune((i+1)%100))
		graph[pageID] = &site.Page{
			URL:   pageID,
			Links: []string{nextPageID},
		}
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = PageRank(ctx, graph)
	}
}

func BenchmarkPageRank_LargeGraph(b *testing.B) {
	ctx := context.Background()
	graph := Graph{}

	// Create a graph with 1000 nodes
	for i := 0; i < 1000; i++ {
		pageID := "page" + string(rune(i))
		nextPageID := "page" + string(rune((i+1)%1000))
		graph[pageID] = &site.Page{
			URL:   pageID,
			Links: []string{nextPageID},
		}
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = PageRank(ctx, graph)
	}
}
