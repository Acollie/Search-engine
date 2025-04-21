package handler

import (
	"context"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/awsx/queue"
	"webcrawler/pkg/generated/service/spider"
)

type Handler struct {
	siteI        SiteI
	queue        queue.HandlerI
	spiderClient spider.SpiderClient
}

type SiteI interface {
	Add(ctx context.Context, page site.Page) error
}

func New(site SiteI, queue queue.HandlerI, sliderClient spider.SpiderClient) Handler {
	return Handler{
		queue:        queue,
		siteI:        site,
		spiderClient: sliderClient,
	}
}
