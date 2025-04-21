package page

import (
	"context"
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/sqlx"
)

type Db struct {
	Sql      *sql.DB
	ConnType sqlx.ConnType
}

func New(sql *sql.DB, conn sqlx.ConnType) Db {
	return Db{
		Sql:      sql,
		ConnType: conn,
	}
}

func (d Db) SavePage(ctx context.Context, page site.Page) error {
	addPage := sqlx.AddPage
	if d.ConnType == sqlx.PG {
		addPage = sqlx.AddPagePG
	}
	_, err := d.Sql.ExecContext(ctx, addPage, page.Url, page.Title, page.Body, 0, sqlx.ArrayToString(page.Links))
	return err
}

func (d Db) UpdatePage(ctx context.Context, page site.Page) error {
	updatePage := sqlx.UpdatePage
	if d.ConnType == sqlx.PG {
		updatePage = sqlx.UpdatePagePG
	}
	_, err := d.Sql.ExecContext(ctx, updatePage, page.Title, page.Body, page.ProminenceValue, page.Url)
	return err
}

func (d Db) GetPage(ctx context.Context, url string) (*site.Page, error) {
	getPage := sqlx.GetPage
	if d.ConnType == sqlx.PG {
		getPage = sqlx.GetPagePG
	}
	row := d.Sql.QueryRowContext(ctx, getPage, url)

	var page site.Page
	var links string
	err := row.Scan(&page.Url, &page.Title, &page.Body, &page.ProminenceValue, &links)
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
	removePage := sqlx.RemovePage
	if d.ConnType == sqlx.PG {
		removePage = sqlx.RemovePagePG
	}
	_, err := d.Sql.ExecContext(ctx, removePage, url)
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
