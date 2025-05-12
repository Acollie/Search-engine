package page

import (
	"context"
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/conn"
	"webcrawler/pkg/slice"
)

type Db struct {
	Sql      *sql.DB
	ConnType conn.ConnType
}

type DbiPage interface {
	SavePage(ctx context.Context, page site.Page) error
	UpdatePage(ctx context.Context, page site.Page) error
	GetPage(ctx context.Context, url string) (*site.Page, error)
	GetAllPages(ctx context.Context) ([]site.Page, error)
	DeletePage(ctx context.Context, url string) error
	NumberOfPages(ctx context.Context) (int, error)
	CreateIndex(ctx context.Context) error
	CreateTable(ctx context.Context) error
	DropTable(ctx context.Context) error
}

func New(sql *sql.DB, conn conn.ConnType) Db {
	return Db{
		Sql:      sql,
		ConnType: conn,
	}
}

func (d Db) SavePage(ctx context.Context, page site.Page) error {
	addPage := AddPage
	if d.ConnType == conn.PG {
		addPage = AddPagePG
	}
	_, err := d.Sql.ExecContext(ctx, addPage, page.Url, page.Title, page.Body, 0, slice.ArrayToString(page.Links))
	return err
}

func (d Db) UpdatePage(ctx context.Context, page site.Page) error {
	updatePage := UpdatePage
	if d.ConnType == conn.PG {
		updatePage = RemovePagePG
	}
	_, err := d.Sql.ExecContext(ctx, updatePage, page.Title, page.Body, page.ProminenceValue, page.Url)
	return err
}

func (d Db) GetPage(ctx context.Context, url string) (*site.Page, error) {
	getPage := GetPage
	if d.ConnType == conn.PG {
		getPage = GetPagePG
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
	page.Links = slice.StringToArray(links)
	return &page, nil
}

func (d Db) DeletePage(ctx context.Context, url string) error {
	removePage := RemovePage
	if d.ConnType == conn.PG {
		removePage = RemovePagePG
	}
	_, err := d.Sql.ExecContext(ctx, removePage, url)
	return err
}
func (d Db) NumberOfPages(ctx context.Context) (int, error) {
	sqlQuery := CountSeenPages
	row := d.Sql.QueryRowContext(ctx, sqlQuery)

	var count int
	err := row.Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}
func (d Db) GetAllPages(ctx context.Context) ([]site.Page, error) {
	rows, err := d.Sql.QueryContext(ctx, GetAllPages)
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
		page.Links = slice.StringToArray(links)
		pages = append(pages, page)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return pages, nil
}

func (d Db) CreateIndex(ctx context.Context) error {
	createIndex := CreateSeenTable
	_, err := d.Sql.ExecContext(ctx, createIndex)
	return err
}

func (d Db) CreateTable(ctx context.Context) error {
	createTable := CreateSeenTable
	_, err := d.Sql.ExecContext(ctx, createTable)
	return err
}

func (d Db) DropTable(ctx context.Context) error {
	dropTable := DropSeenPages
	_, err := d.Sql.ExecContext(ctx, dropTable)
	return err
}
