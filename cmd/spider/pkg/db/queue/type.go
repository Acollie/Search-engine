package queue

import (
	"context"
	"database/sql"
	"fmt"
	slitex "webcrawler/pkg/db"
	"webcrawler/pkg/sqlx"
)

type Db struct {
	Sql *sql.DB
}

func (d Db) GetExplore(ctx context.Context) ([]string, error) {
	rows, err := d.Sql.QueryContext(ctx, sqlx.GetQueue)
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
	sqlQuery := fmt.Sprintf(sqlx.AddLink, url)
	_, err := d.Sql.ExecContext(ctx, sqlQuery)
	if err != nil {
		return fmt.Errorf("error adding link: %w", err)
	}
	return nil
}

func (d Db) AddLinks(ctx context.Context, url []string) error {
	for _, u := range url {
		sqlQuery := fmt.Sprintf(sqlx.AddLink, u)
		_, err := d.Sql.ExecContext(ctx, sqlQuery)
		if err != nil {
			return fmt.Errorf("error adding link: %w", err)
		}
	}
	return nil
}

func (d Db) RemoveLink(ctx context.Context, url string) error {
	sqlQuery := fmt.Sprintf(sqlx.RemoveLink, url)
	_, err := d.Sql.ExecContext(ctx, sqlQuery)
	if err != nil {
		return fmt.Errorf("error removing link: %w", err)
	}
	return nil
}

func New() Db {
	db, err := slitex.NewSqlite()
	if err != nil {
		panic(err)
	}

	// Check if queue table exists
	_, err = db.Exec(sqlx.CheckQueueTableExistSqlite)
	if err != nil {
		_, err = db.Exec(sqlx.CreateQueueTable)
		if err != nil {
			panic(err)
		}
	}

	return Db{
		Sql: db,
	}
}
