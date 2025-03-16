package db

import (
	"context"
	"webcrawler/cmd/spider/pkg/db/page"
	"webcrawler/cmd/spider/pkg/db/queue"
	"webcrawler/cmd/spider/pkg/site"
)

type DbiPage interface {
	SavePage(ctx context.Context, page site.Page) error
	UpdatePage(ctx context.Context, page site.Page) error
	GetPage(ctx context.Context, url string) (site.Page, error)
	GetAllPages(ctx context.Context) ([]site.Page, error)
}

type DbiQueue interface {
	GetExplore(ctx context.Context) ([]string, error)
	AddLink(ctx context.Context, url string) error
	AddLinks(ctx context.Context, url []string) error
	RemoveLink(ctx context.Context, url string) error
}

type Db struct {
	Queue DbiQueue
	Page  DbiPage
}

func New() Db {
	return Db{
		Queue: queue.New(),
		Page:  page.New(),
	}
}
