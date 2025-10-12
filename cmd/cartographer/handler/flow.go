package handler

import (
	"context"
	"time"
	"webcrawler/cmd/cartographer/pkg/fetch"
	"webcrawler/cmd/cartographer/pkg/graph"
	"webcrawler/cmd/cartographer/pkg/push"
)

func (d *Handler) Traverse() error {
	ctx := context.Background()
	for i := 0; i < d.sweepCount; i++ {
		sites := fetch.Fetch(d.db, d.sweepCount)
		g := graph.New(sites)

		traversed, err := graph.Traverse(ctx, g)
		if err != nil {
			return err
		}

		err = push.Push(traversed, "al", time.Now())
		if err != nil {
			return err
		}
	}

	return nil

}
