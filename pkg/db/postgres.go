package dbx

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"webcrawler/pkg/conn"
)

func Postgres(username string, password string, host string, port int, dbname string) (*sql.DB, conn.Type, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
	c, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, conn.PG, err
	}
	return c, conn.PG, nil
}
