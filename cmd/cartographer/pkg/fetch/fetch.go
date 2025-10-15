package fetch

import (
	"database/sql"
	"webcrawler/cmd/spider/pkg/site"
)

func Fetch(_ *sql.DB, _ int) []*site.Page {
	return nil
}
