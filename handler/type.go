package handler

import (
	"webcrawler/queue"
	"webcrawler/site"
)

type Server struct {
	Queue *queue.Handler
	Db    DBi
}

type DBi interface {
	FetchWebsite(string) (*site.Website, error)
	FetchPage(string) (*site.Page, error)
	AddPage(page site.Page) error
	AddWebsite(website site.Website) error
	RemoveWebsite(site.Website) error
	RemovePage(site.Page) error
	UpdateWebsite(page site.Page, website site.Website) error
}

func New(db DBi, queue *queue.Handler) Server {
	return Server{
		Db:    db,
		Queue: queue,
	}

}
