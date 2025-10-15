package graph

import (
	"errors"
	"webcrawler/cmd/spider/pkg/site"
)

var (
	ErrNoGraphs = errors.New("no graphs found")
)

type Graph map[string]*site.Page

func New(sites []*site.Page) Graph {
	g := Graph{}
	for _, s := range sites {
		g[s.URL] = s
	}
	return g
}
