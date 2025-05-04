package handler

import (
	"context"
	"fmt"
	"webcrawler/cmd/cartographer/pkg/collector"
	"webcrawler/cmd/cartographer/pkg/graph"
)

const (
	sweepAmount = 100
)

func Traverse() error {
	ctx := context.Background()

	for i := 0; i < sweepAmount; i++ {

		// Randomly collect from database
		sites := collector.Fetch(nil)
		g := graph.New(sites)

		traversed, err := graph.GraphTraverse(ctx, g)
		if err != nil {
			return err
		}
		fmt.Println(traversed)
	}

	return nil

}
