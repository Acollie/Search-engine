package handler

import (
	"webcrawler/database"
	"webcrawler/queue"
)

type Server struct {
	Queue *queue.Handler
	Db    *database.DB
}

func New(db *database.DB, queue *queue.Handler) Server {
	return Server{
		Db:    db,
		Queue: queue,
	}

}
