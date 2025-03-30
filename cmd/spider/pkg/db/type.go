package db

import (
	"context"
	"fmt"
	"webcrawler/cmd/spider/pkg/db/page"
	"webcrawler/cmd/spider/pkg/db/queue"
	"webcrawler/cmd/spider/pkg/site"
	slitex "webcrawler/pkg/db"
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

func New() Db {
	db, err := slitex.NewSqlite()
	if err != nil {
		panic(err)
	}

	// Check and create Queue table
	rows, err := db.Query(sqlx.CheckQueueTableExistSqlite)
	if err != nil {
		panic(fmt.Errorf("failed to check Queue table: %v", err))
	}
	if !rows.Next() {
		_, err = db.Exec(sqlx.CreateQueueTable)
		if err != nil {
			panic(fmt.Errorf("failed to create Queue table: %v", err))
		}
	}
	rows.Close()

	// Check and create SeenPages table
	rows, err = db.Query(sqlx.CheckTableExistSqlite)
	if err != nil {
		panic(fmt.Errorf("failed to check SeenPages table: %v", err))
	}
	if !rows.Next() {
		_, err = db.Exec(sqlx.CreateSeenTable)
		if err != nil {
			panic(fmt.Errorf("failed to create SeenPages table: %v", err))
		}
	}
	rows.Close()

	return Db{
		Queue: queue.New(),
		Page:  page.New(),
	}
}
