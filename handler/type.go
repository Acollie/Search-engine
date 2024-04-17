package handler

import (
	"context"
	"webcrawler/queue"
	"webcrawler/site"
)

type Server struct {
	Queue *queue.Handler
	Db    DBi
}

type DBi interface {
	FetchWebsite(context.Context, string) (*site.Website, error)
	FetchPage(context.Context, string) (*site.Page, error)
	AddPage(context.Context, site.Page) error
	AddWebsite(context.Context, site.Website) error
	RemoveWebsite(context.Context, site.Website) error
	RemovePage(context.Context, site.Page) error
	UpdateWebsite(context.Context, site.Page, site.Website) error
}

func New(db DBi, queue *queue.Handler) Server {
	return Server{
		Db:    db,
		Queue: queue,
	}

}
