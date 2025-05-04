package graph

import (
	"context"
	"time"
	"webcrawler/pkg/slice"
)

const (
	HitScore = 1
)

func GraphTraverse(ctx context.Context, graph Graph) (Graph, error) {
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
			linkedPage.ProminenceValue += HitScore
		}

	}

	return graph, nil
}
