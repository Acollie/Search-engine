package sqlRelational

import (
	"context"
	"database/sql"
	"webcrawler/cmd/spider/pkg/site"
	pageDB "webcrawler/pkg/sqlRelational/page"
	"webcrawler/pkg/sqlRelational/queue"
	"webcrawler/pkg/sqlx"
)

type DbiPage interface {
	SavePage(ctx context.Context, page site.Page) error
	UpdatePage(ctx context.Context, page site.Page) error
	GetPage(ctx context.Context, url string) (*site.Page, error)
	GetAllPages(ctx context.Context) ([]site.Page, error)
	DeletePage(ctx context.Context, url string) error
	NumberOfPages(ctx context.Context) (int, error)
}

type DbiQueue interface {
	GetExplore(ctx context.Context) ([]string, error)
	AddLink(ctx context.Context, url string) error
	AddLinks(ctx context.Context, url []string) error
	RemoveLink(ctx context.Context, url string) error
}

type Db struct {
	Queue DbiQueue
	Page  DbiPage
}

func New(conn *sql.DB, connType sqlx.ConnType) Db {
	q := queue.New(conn, connType)
	p := pageDB.New(conn, connType)
	return Db{
		Queue: q,
		Page:  p,
	}
}
