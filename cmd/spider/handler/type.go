package handler

import (
	"webcrawler/pkg/config"
	"webcrawler/pkg/sqlRelational"
)

type Server struct {
	Db     sqlRelational.Db
	Config *config.Config
}

func New(db sqlRelational.Db, config *config.Config) Server {
	return Server{
		Db:     db,
		Config: config,
	}
}
