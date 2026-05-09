package dbx

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
	"webcrawler/pkg/conn"
)

func Postgres(username string, password string, host string, port int, dbname string, sslmode ...string) (*sql.DB, conn.Type, error) {
	ssl := "disable"
	if len(sslmode) > 0 && sslmode[0] != "" {
		ssl = sslmode[0]
	}
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s", host, port, username, password, dbname, ssl)
	c, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, conn.PG, err
	}

	// Configure connection pooling
	c.SetMaxOpenConns(25)
	c.SetMaxIdleConns(5)
	c.SetConnMaxLifetime(5 * time.Minute)

	return c, conn.PG, nil
}
