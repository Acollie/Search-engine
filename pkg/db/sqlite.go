package dbx

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func NewSqlite() (*sql.DB, error) {
	conn, err := sql.Open("sqlite3", "main.db")
	if err != nil {
		return nil, err
	}
	return conn, nil
}
