package dbx

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"webcrawler/pkg/sqlx"
)

func MariaDB(username string, password string, address string, port int) (*sql.DB, error) {
	urlConn := fmt.Sprintf("%s:%s@tcp(%s:%d)/", username, password, address, port)
	conn, err := sql.Open("mysql", urlConn)
	if err != nil {
		return nil, err
	}
	conn.Exec(fmt.Sprintf(sqlx.SelectDB, sqlx.MainDB))
	return conn, nil
}
