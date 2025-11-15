package graph

import (
	"context"
	"math"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/slice"
)

const (
	DampingFactor = 0.85    // Standard PageRank damping factor
	Iterations    = 20      // Maximum iterations for convergence
	Tolerance     = 0.0001  // Convergence threshold
	ScaleFactor   = 10000.0 // Scale float to int for storage
)

// Traverse is the legacy simple link counting algorithm (deprecated)
// Use PageRank for proper ranking computation
func Traverse(ctx context.Context, graph Graph) (Graph, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Second*30)
	defer cancel()

	for key := range graph {
		page, ok := graph[key]
		if !ok {
			continue
		}
		links := slice.DeDuplicate(page.Links)
		for _, link := range links {
			linkedPage, ok := graph[link]
			if !ok {
				continue
			}
			linkedPage.ProminenceValue += 1
		}
	}

	return graph, nil
}

// PageRank computes the PageRank score for all pages in the graph
// using the damped PageRank algorithm with iterative convergence
func PageRank(ctx context.Context, graph Graph) (Graph, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Minute*5)
	defer cancel()

	n := len(graph)
	if n == 0 {
		return graph, nil
	}

	// Initialize all pages with equal PageRank
	initialRank := 1.0 / float64(n)
	currentRanks := make(map[string]float64, n)

	for url := range graph {
		currentRanks[url] = initialRank
	}

	// Build incoming links map for efficient lookup
	incomingLinks := buildIncomingLinksMap(graph)

	// Iterative PageRank computation
	for iteration := 0; iteration < Iterations; iteration++ {
		select {
		case <-ctx.Done():
			return graph, ctx.Err()
		default:
		}

		newRanks := make(map[string]float64, n)

		// Calculate new rank for each page
		for url := range graph {
			// Base rank (random surfer teleportation)
			rank := (1.0 - DampingFactor) / float64(n)

			// Sum contributions from incoming links
			if inLinks, exists := incomingLinks[url]; exists {
				for _, incomingURL := range inLinks {
					if incomingPage, ok := graph[incomingURL]; ok {
						outboundCount := countValidOutboundLinks(incomingPage, graph)
						if outboundCount > 0 {
							contribution := currentRanks[incomingURL] / float64(outboundCount)
							rank += DampingFactor * contribution
						}
					}
				}
			}

			newRanks[url] = rank
		}

		// Check for convergence
		converged := true
		maxDelta := 0.0
		for url, newRank := range newRanks {
			delta := math.Abs(newRank - currentRanks[url])
			if delta > maxDelta {
				maxDelta = delta
			}
			if delta > Tolerance {
				converged = false
			}
		}

		// Update current ranks
		currentRanks = newRanks

		// Early termination if converged
		if converged {
			break
		}
	}

	// Store final ranks in graph (scaled to int for compatibility)
	for url, rank := range currentRanks {
		if page, ok := graph[url]; ok {
			page.ProminenceValue = int(rank * ScaleFactor)
		}
	}

	return graph, nil
}

// buildIncomingLinksMap creates a reverse index of links
// Maps each URL to all URLs that link to it
func buildIncomingLinksMap(graph Graph) map[string][]string {
	incomingLinks := make(map[string][]string)

	for sourceURL, page := range graph {
		// Deduplicate links
		uniqueLinks := slice.DeDuplicate(page.Links)

		for _, targetURL := range uniqueLinks {
			// Only count links to pages in our graph
			if _, exists := graph[targetURL]; exists {
				incomingLinks[targetURL] = append(incomingLinks[targetURL], sourceURL)
			}
		}
	}

	return incomingLinks
}

// countValidOutboundLinks counts how many links from this page
// point to pages that exist in the graph
func countValidOutboundLinks(page *site.Page, graph Graph) int {
	count := 0
	uniqueLinks := slice.DeDuplicate(page.Links)

	for _, link := range uniqueLinks {
		if _, exists := graph[link]; exists {
			count++
		}
	}

	return count
}

// containsLink checks if a link exists in the links slice
func containsLink(links []string, target string) bool {
	for _, link := range links {
		if link == target {
			return true
		}
	}
	return false
}
