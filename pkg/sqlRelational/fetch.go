package sqlRelational

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"webcrawler/cmd/spider/pkg/site"
)

func (c *SqlDB) FetchPage(url string) (*site.Page, error) {
	queryString := fmt.Sprintf("SELECT pageurl, title, body,baseurl from page where pageurl ='%s' limit 1", url)
	query := c.Client.QueryRow(queryString)
	var page site.Page
	err := query.Scan(&page.Url, &page.Title, &page.Body, &page.BaseURL)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Println("no page")
			return &site.Page{}, nil
		}
		return &site.Page{}, err
	}
	return &page, nil
}
