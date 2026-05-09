package handler

import (
	"context"
	"log/slog"
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

	slog.Info("Starting PageRank traversal", slog.String("sweep", sweepName), slog.Int("sweepCount", d.sweepCount))

	for i := 0; i < d.sweepCount; i++ {
		metrics.Sweeps.Inc()
		sites := fetch.Fetch(d.db, d.sweepBreath)
		slog.Info("Processing sweep iteration",
			slog.Int("iteration", i+1),
			slog.Int("total", d.sweepCount),
			slog.Int("siteCount", len(sites)))

		g := graph.New(sites)
		for range sites {
			metrics.SitesProcessed.WithLabelValues().Inc()
		}

		ranked, err := graph.PageRank(ctx, g)
		if err != nil {
			slog.Error("PageRank computation failed", slog.Int("iteration", i+1), slog.Any("error", err))
			return err
		}
		graphs = append(graphs, ranked)
	}

	slog.Info("Merging PageRank graphs", slog.Int("graphCount", len(graphs)))
	merged, err := graph.Merge(graphs)
	if err != nil {
		slog.Error("Failed to merge PageRank graphs", slog.Any("error", err))
		return err
	}

	slog.Info("Pushing PageRank results", slog.String("sweep", sweepName))
	err = push.Push(d.db, merged, sweepName, time.Now())
	if err != nil {
		slog.Error("Failed to push PageRank results", slog.String("sweep", sweepName), slog.Any("error", err))
		return err
	}

	slog.Info("PageRank traversal completed successfully", slog.String("sweep", sweepName))
	return nil
}
