package dbx

import (
	"database/sql"
	_ "github.com/lib/pq"

	"fmt"
)

func Postgres(username string, password string, host string, port int, dbname string) (*sql.DB, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
	conn, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}
	return conn, nil
}
