package sqlRelational

import (
	"fmt"
	"webcrawler/cmd/spider/pkg/site"
)

func (c *SqlDB) AddPage(page site.Page) error {
	queryString := fmt.Sprintf("INSERT INTO page (pageurl, title, body,baseurl) VALUES ('%s', '%s', '%s', '%s')", page.Url, page.Title, page.Body, page.BaseURL)
	_, err := c.Client.Exec(queryString)

	return err
}
