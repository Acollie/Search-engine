package handler

import (
	"database/sql"
)

type Handler struct {
	db          *sql.DB
	sweepCount  int
	sweepBreath int
}

func New(db *sql.DB, sweepSize int, sweepCount int) Handler {
	return Handler{
		db:          db,
		sweepCount:  sweepSize,
		sweepBreath: sweepCount,
	}
}
