package handler

import (
	"webcrawler/config"
	"webcrawler/queue"
	"webcrawler/site"
	"webcrawler/sqlRelational"
)

type Server struct {
	Queue  queue.HandlerI
	Db     DBi
	Config *config.IgnoreList
	DB     *sqlRelational.SqlDB
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

func New(db DBi, queue *queue.Handler, sqlDB *sqlRelational.SqlDB, conf *config.IgnoreList) Server {
	return Server{
		Db:     db,
		Queue:  queue,
		DB:     sqlDB,
		Config: conf,
	}

}
