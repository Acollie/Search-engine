package handler

import (
	"context"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/generated/service/spider"

	"github.com/sony/gobreaker"
)

type Handler struct {
	siteI        SiteI
	queue        Queue
	spiderClient spider.SpiderClient
	breaker      *gobreaker.CircuitBreaker
}

type SiteI interface {
	Add(ctx context.Context, page site.Page) error
}

type Queue interface {
	AddLinks(ctx context.Context, urls []string) error
}

func New(site SiteI, queue Queue, spiderClient spider.SpiderClient) Handler {
	cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
		Name:        "spider",
		MaxRequests: 1,
		Timeout:     60 * time.Second,
		ReadyToTrip: func(counts gobreaker.Counts) bool {
			return counts.ConsecutiveFailures >= 3
		},
	})
	return Handler{
		queue:        queue,
		siteI:        site,
		spiderClient: spiderClient,
		breaker:      cb,
	}
}
