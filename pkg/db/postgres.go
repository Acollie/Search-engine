package dbx

import (
	"database/sql"
	_ "github.com/lib/pq"
	"webcrawler/pkg/sqlx"

	"fmt"
)

func Postgres(username string, password string, host string, port int, dbname string) (*sql.DB, sqlx.ConnType, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
	conn, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, sqlx.PG, err
	}
	return conn, sqlx.PG, nil
}
