package queue

import (
	"context"
	"database/sql"
	"fmt"
	"webcrawler/pkg/conn"
)

type Db struct {
	Sql      *sql.DB
	ConnType conn.Type
}
type DbiQueue interface {
	GetExplore(ctx context.Context) ([]string, error)
	AddLink(ctx context.Context, url string) error
	AddLinks(ctx context.Context, url []string) error
	RemoveLink(ctx context.Context, url string) error
}

func New(sql *sql.DB, conn conn.Type) Db {
	return Db{
		Sql:      sql,
		ConnType: conn,
	}
}

func (d Db) GetExplore(ctx context.Context) ([]string, error) {
	rows, err := d.Sql.QueryContext(ctx, GetQueue)
	if err != nil {
		return nil, fmt.Errorf("error querying queue: %w", err)
	}
	defer rows.Close()

	var urls []string
	for rows.Next() {
		var url string
		if err := rows.Scan(&url); err != nil {
			return nil, fmt.Errorf("error scanning url: %w", err)
		}
		urls = append(urls, url)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	return urls, nil
}

func (d Db) AddLink(ctx context.Context, url string) error {
	_, err := d.Sql.ExecContext(ctx, AddLink, url)
	if err != nil {
		return fmt.Errorf("error adding link: %w", err)
	}
	return nil
}

func (d Db) AddLinks(ctx context.Context, url []string) error {
	for _, u := range url {
		_, err := d.Sql.ExecContext(ctx, AddLink, u)
		if err != nil {
			return fmt.Errorf("error adding link: %w", err)
		}
	}
	return nil
}

func (d Db) RemoveLink(ctx context.Context, url string) error {
	_, err := d.Sql.ExecContext(ctx, RemoveLink, url)
	if err != nil {
		return fmt.Errorf("error removing link: %w", err)
	}
	return nil
}
