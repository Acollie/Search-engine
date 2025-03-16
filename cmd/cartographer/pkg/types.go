package pkg

import (
	"context"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/slice"
)

const (
	HitScore = 1
)

func GraphTraverse(ctx context.Context, graph map[string]*site.Page) (map[string]*site.Page, error) {
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
