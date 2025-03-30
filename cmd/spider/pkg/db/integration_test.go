package db

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/go-faker/faker/v4"
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/cmd/spider/pkg/db/page"
	"webcrawler/cmd/spider/pkg/db/queue"
	"webcrawler/cmd/spider/pkg/site"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/sqlx"
	test_containers "webcrawler/pkg/test-containers"
)

type testDb struct {
	conn *sql.DB
	name string
}

func Test_DbInteraction(t *testing.T) {
	ctx := context.Background()
	sqliteConn, err := dbx.NewSqlite()
	require.NoError(t, err)
	defer sqliteConn.Close()
	sqliteTestDb := testDb{
		conn: sqliteConn,
		name: "sqlite",
	}
	defer func() {
		_, err := sqliteConn.Exec(sqlx.DropSeenPages)
		require.NoError(t, err)
		_, err = sqliteConn.Exec(sqlx.DropQueue)
		require.NoError(t, err)
	}()

	mariaConn, testContainer, err := test_containers.NewMarina(ctx)
	require.NoError(t, err)
	defer testContainer.Terminate(ctx)
	mariaTestDb := testDb{
		conn: mariaConn,
		name: "maria",
	}

	for _, connType := range []testDb{sqliteTestDb, mariaTestDb} {
		conn := connType.conn
		t.Run(fmt.Sprintf("conn name:%s basic testing Seen pages", connType.name), func(t *testing.T) {
			sitePage := site.Page{
				Url:   faker.URL(),
				Title: faker.Sentence(),
				Body:  faker.Paragraph(),
			}
			_, err = conn.Exec(sqlx.CreateSeenTable)
			require.NoError(t, err)

			_, err = conn.Exec(sqlx.CreateSeenTableIndex)
			require.NoError(t, err)

			require.NoError(t, err)
			if conn == nil {
				t.Errorf("Expected connection to be created")
			}
			db := page.Db{Sql: conn}
			err = db.SavePage(ctx, sitePage)
			require.NoError(t, err)

			page, err := db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
			require.Equal(t, &sitePage, page)

			//Page which does not exist
			page, err = db.GetPage(ctx, faker.URL())
			require.NoError(t, err)
			require.Nil(t, page)

			// Update page
			sitePage.Title = faker.Sentence()
			sitePage.Body = faker.Paragraph()
			err = db.UpdatePage(ctx, sitePage)
			require.NoError(t, err)
			page, err = db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
			require.Equal(t, &sitePage, page)

			// Remove a page
			err = db.DeletePage(ctx, sitePage.Url)
			require.NoError(t, err)
			// Check if the page is removed
			page, err = db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
		})
		t.Run("queue testing", func(t *testing.T) {

			_, err = conn.Exec(sqlx.CreateQueueTable)
			require.NoError(t, err)

			db := queue.Db{Sql: conn}

			err = db.AddLink(ctx, "https://example.com")
			require.NoError(t, err)
			err = db.AddLink(ctx, "https://example.com/2")
			require.NoError(t, err)

			links, err := db.GetExplore(ctx)
			require.NoError(t, err)
			require.Len(t, links, 2)
			require.Equal(t, "https://example.com", links[0])
			require.Equal(t, "https://example.com/2", links[1])
			err = db.RemoveLink(ctx, "https://example.com")
			require.NoError(t, err)
			links, err = db.GetExplore(ctx)
			require.NoError(t, err)
			require.Len(t, links, 1)
			require.Equal(t, "https://example.com/2", links[0])

			err = db.RemoveLink(ctx, "https://example.com/2")
			require.NoError(t, err)
			links, err = db.GetExplore(ctx)
			require.NoError(t, err)
			require.Len(t, links, 0)

			links = []string{"https://example.com", "https://example.com/2", "https://example.com/3"}
			err = db.AddLinks(ctx, links)
			require.NoError(t, err)
			links, err = db.GetExplore(ctx)
		})
	}
}
