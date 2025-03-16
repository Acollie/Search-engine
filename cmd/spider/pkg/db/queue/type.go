package queue

import "context"

type Db struct {
}

func (d Db) GetExplore(ctx context.Context) ([]string, error) {
	//TODO implement me
	panic("implement me")
}

func (d Db) AddLink(ctx context.Context, url string) error {
	//TODO implement me
	panic("implement me")
}

func (d Db) AddLinks(ctx context.Context, url []string) error {
	//TODO implement me
	panic("implement me")
}

func (d Db) RemoveLink(ctx context.Context, url string) error {
	//TODO implement me
	panic("implement me")
}

func New() Db {
	return Db{}
}
