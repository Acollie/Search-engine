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
	sweepName := ""
	for i := 0; i < d.sweepCount; i++ {
		metrics.Sweeps.Inc()
		sites := fetch.Fetch(d.db, d.sweepCount)
		g := graph.New(sites)
		metrics.SitesProcessed.With(map[string]string{
			"sweepName": sweepName,
		}).Add(float64(len(sites)))

		traversed, err := graph.Traverse(ctx, g)
		if err != nil {
			return err
		}
		graphs = append(graphs, traversed)

	}
	merged, err := graph.Merge(graphs)
	if err != nil {
		return nil
	}

	err = push.Push(merged, sweepName, time.Now())
	if err != nil {
		return err
	}

	return nil

}
