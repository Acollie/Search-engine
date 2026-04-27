package handler

import (
	"context"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/awsx/queue"
	"webcrawler/pkg/generated/service/spider"

	"github.com/sony/gobreaker"
)

type Handler struct {
	siteI        SiteI
	queue        queue.HandlerI
	spiderClient spider.SpiderClient
	breaker      *gobreaker.CircuitBreaker
}

type SiteI interface {
	Add(ctx context.Context, page site.Page) error
}

func New(site SiteI, queue queue.HandlerI, sliderClient spider.SpiderClient) Handler {
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
		spiderClient: sliderClient,
		breaker:      cb,
	}
}
