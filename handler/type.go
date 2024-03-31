package handler

import (
	"webcrawler/ignore_list"
	"webcrawler/queue"
	"webcrawler/site"
)

type Server struct {
	Queue  queue.HandlerI
	Db     DBi
	Config *ignore_list.IgnoreList
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

func New(db DBi, queue *queue.Handler, conf *ignore_list.IgnoreList) Server {
	return Server{
		Db:     db,
		Queue:  queue,
		Config: conf,
	}

}
