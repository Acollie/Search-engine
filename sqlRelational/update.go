package sqlRelational

import (
	"reflect"
	"webcrawler/site"
)

func (c *SqlDB) UpdateWebsite(page site.Page, website site.Website) error {

	websiteDB, err := c.FetchWebsite(page.BaseURL)
	if err != nil {
		return err
	}
	if reflect.DeepEqual(websiteDB, &site.Website{}) && err == nil {
		println("websiteNot found")
		websiteDB = &website
	}

	return nil
}

func (c *SqlDB) UpdatePage(page site.Page) error {

	return nil
}
