package handler

import (
	"webcrawler/pkg/config"
	"webcrawler/pkg/sqlx"
)

type Server struct {
	Db     sqlx.Db
	Config *config.Config
}

func New(db sqlx.Db, config *config.Config) Server {
	return Server{
		Db:     db,
		Config: config,
	}
}
