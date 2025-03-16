package handler

import (
	"webcrawler/cmd/spider/pkg/db"
	"webcrawler/pkg/config"
)

type Server struct {
	Db     db.Db
	Config *config.Config
}

func New(db db.Db, config *config.Config) Server {
	return Server{
		Db:     db,
		Config: config,
	}

}
