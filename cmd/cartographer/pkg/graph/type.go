package graph

import "webcrawler/cmd/spider/pkg/site"

type Graph map[string]*site.Page

func New(sites []*site.Page) Graph {
	g := Graph{}
	for _, site := range sites {
		g[site.Url] = site
	}
	return g
}
