package sqlx

import (
	"database/sql"
	"webcrawler/pkg/conn"
	"webcrawler/pkg/page"
	"webcrawler/pkg/queue"
)

type Db struct {
	Queue queue.DbiQueue
	Page  page.DbiPage
}

func New(conn *sql.DB, connType conn.Type) Db {
	q := queue.New(conn, connType)
	p := page.New(conn, connType)
	return Db{
		Queue: q,
		Page:  p,
	}
}
