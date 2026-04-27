package handler

import (
	"context"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/generated/service/spider"
)

type Handler struct {
	siteI        SiteI
	queue        Queue
	spiderClient spider.SpiderClient
}

type SiteI interface {
	Add(ctx context.Context, page site.Page) error
}

type Queue interface {
	AddLinks(ctx context.Context, urls []string) error
}

func New(site SiteI, queue Queue, spiderClient spider.SpiderClient) Handler {
	return Handler{
		queue:        queue,
		siteI:        site,
		spiderClient: spiderClient,
	}
}
