package sqlRelational

import (
	"github.com/stretchr/testify/require"
	"os"
	"reflect"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
)

func setupDB(t *testing.T, db *SqlDB) {
	if _, err := db.Client.Exec(addPage); err != nil {
		t.Fail()
	}
}
func teardown(db *SqlDB) {
	_, err := db.Client.Exec(dropPage)
	if err != nil {
		panic(err)
	}
}

func TestDB(t *testing.T) {
	if os.Getenv("ENVIRONMENT") != "local" {
		t.Skipf("skipping since not local")
	}

	sqlDB := New("webcrawlertest")
	setupDB(t, sqlDB)
	defer teardown(sqlDB)

	t.Run("AddPage", func(t *testing.T) {
		page := site.Page{
			Url:     "http://www.google.com",
			Title:   "Google",
			Body:    "Search Engine",
			BaseURL: "http://www.google.com",
		}

		err := sqlDB.AddPage(page)
		require.NoError(t, err)

		pageReturned, err := sqlDB.FetchPage(page.Url)
		require.NoError(t, err)
		require.Equal(t, &page, pageReturned)
	})

	t.Run("Fetch page empty", func(t *testing.T) {
		pageReturn, err := sqlDB.FetchPage("does not exist")
		require.NoError(t, err)
		require.Equal(t, reflect.DeepEqual(pageReturn, &site.Page{}), true)
	})
	t.Run("update website", func(t *testing.T) {
		page := site.Page{
			Url:     "http://www.google.com",
			Title:   "Google",
			Body:    "Search Engine",
			BaseURL: "http://www.google.com",
		}
		err := sqlDB.Update(&page)
		require.NoError(t, err)
	})
}
