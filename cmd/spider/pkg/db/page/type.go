package page

import (
	"context"
	"database/sql"
	"errors"
	"webcrawler/cmd/spider/pkg/site"
	slitex "webcrawler/pkg/db"
	"webcrawler/pkg/sqlx"
)

type Db struct {
	Sql *sql.DB
}

func (d Db) SavePage(ctx context.Context, page site.Page) error {
	_, err := d.Sql.ExecContext(ctx, sqlx.AddPage, page.Url, page.Title, page.Body, 0, sqlx.ArrayToString(page.Links))
	return err
}

func (d Db) UpdatePage(ctx context.Context, page site.Page) error {
	_, err := d.Sql.ExecContext(ctx, sqlx.UpdatePage, page.Title, page.Body, page.ProminenceValue, page.Url)
	return err
}

func (d Db) GetPage(ctx context.Context, url string) (*site.Page, error) {
	row := d.Sql.QueryRowContext(ctx, sqlx.GetPage, url)

	var page site.Page
	var links string
	err := row.Scan(&page.Url, &page.Title, &page.Body, &page.ProminenceValue, sqlx.StringToArray(links))
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	page.Links = sqlx.StringToArray(links)
	return &page, nil

}

func (d Db) DeletePage(ctx context.Context, url string) error {
	_, err := d.Sql.ExecContext(ctx, sqlx.RemovePage, url)
	return err
}
func (d Db) NumberOfPages(ctx context.Context) (int, error) {
	sqlQuery := sqlx.CountSeenPages
	row := d.Sql.QueryRowContext(ctx, sqlQuery)

	var count int
	err := row.Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}
func (d Db) GetAllPages(ctx context.Context) ([]site.Page, error) {
	rows, err := d.Sql.QueryContext(ctx, sqlx.GetAllPages)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var pages []site.Page
	for rows.Next() {
		var page site.Page
		var links string
		err := rows.Scan(&page.Url, &page.Title, &page.Body, &page.ProminenceValue, &links)
		if err != nil {
			return nil, err
		}
		page.Links = sqlx.StringToArray(links)
		pages = append(pages, page)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return pages, nil
}

func New() Db {
	db, err := slitex.NewSqlite()
	if err != nil {
		panic(err)
	}
	// Check if page table exists
	_, err = db.Exec(sqlx.CheckTableExistSqlite)
	if err != nil {
		_, err = db.Exec(sqlx.CreateSeenTable)
		if err != nil {
			panic(err)
		}
	}

	return Db{
		Sql: db,
	}
}
