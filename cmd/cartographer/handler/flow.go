package handler

import (
	"context"
	"time"
	"webcrawler/cmd/cartographer/pkg/fetch"
	"webcrawler/cmd/cartographer/pkg/graph"
	"webcrawler/cmd/cartographer/pkg/metrics"
	"webcrawler/cmd/cartographer/pkg/push"
)

func (d *Handler) Traverse() error {
	ctx := context.Background()
	var graphs []graph.Graph
	sweepName := time.Now().Format("pagerank_20060102_150405")

	for i := 0; i < d.sweepCount; i++ {
		metrics.Sweeps.Inc()
		sites := fetch.Fetch(d.db, d.sweepBreath)
		g := graph.New(sites)
		for range sites {
			metrics.SitesProcessed.WithLabelValues().Inc()
		}

		// Use PageRank algorithm instead of simple Traverse
		ranked, err := graph.PageRank(ctx, g)
		if err != nil {
			return err
		}
		graphs = append(graphs, ranked)
	}

	merged, err := graph.Merge(graphs)
	if err != nil {
		return err
	}

	err = push.Push(d.db, merged, sweepName, time.Now())
	if err != nil {
		return err
	}

	return nil
}
