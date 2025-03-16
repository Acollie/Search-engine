package page

import (
	"context"
	"webcrawler/cmd/spider/pkg/site"
)

type Db struct {
}

func (d Db) SavePage(ctx context.Context, page site.Page) error {
	//TODO implement me
	panic("implement me")
}

func (d Db) UpdatePage(ctx context.Context, page site.Page) error {
	//TODO implement me
	panic("implement me")
}

func (d Db) GetPage(ctx context.Context, url string) (site.Page, error) {
	//TODO implement me
	panic("implement me")
}

func (d Db) GetAllPages(ctx context.Context) ([]site.Page, error) {
	//TODO implement me
	panic("implement me")
}

func New() Db {
	return Db{}
}
