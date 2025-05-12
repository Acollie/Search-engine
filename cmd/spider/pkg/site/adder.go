package site

import (
	"context"
	"database/sql"
)

type Adder struct {
	db *sql.DB
}

func NewAdder(db *sql.DB) *Adder {
	return &Adder{
		db: db,
	}
}

func (a *Adder) Add(ctx context.Context, page Page) error {
	return nil

}
