package db

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/go-faker/faker/v4"
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/cmd/spider/pkg/db/page"
	"webcrawler/cmd/spider/pkg/site"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/sqlx"
	test_containers "webcrawler/pkg/test-containers"
)

type testDb struct {
	conn     *sql.DB
	name     string
	connType page.ConnType
}

func Test_DbInteraction(t *testing.T) {
	ctx := context.Background()
	sqliteConn, err := dbx.NewSqlite()
	require.NoError(t, err)
	defer sqliteConn.Close()
	sqliteTestDb := testDb{
		conn:     sqliteConn,
		name:     "sqlite",
		connType: page.SQLite,
	}
	defer func() {
		_, err := sqliteConn.Exec(sqlx.DropSeenPages)
		require.NoError(t, err)
	}()

	mariaConn, testContainerMar, err := test_containers.NewMarina(ctx)
	require.NoError(t, err)
	defer testContainerMar.Terminate(ctx)
	mariaTestDb := testDb{
		conn:     mariaConn,
		name:     "maria",
		connType: page.MariaDB,
	}

	postGresConn, testContainerPostPg, err := test_containers.NewPostgres(ctx)
	require.NoError(t, err)
	defer testContainerPostPg.Terminate(ctx)
	postGresDB := testDb{
		conn:     postGresConn,
		name:     "postgres",
		connType: page.PG,
	}

	for _, connType := range []testDb{sqliteTestDb, mariaTestDb, postGresDB} {
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
			db := page.Db{
				Sql:      conn,
				ConnType: connType.connType,
			}
			err = db.SavePage(ctx, sitePage)
			require.NoError(t, err)

			p, err := db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
			require.Equal(t, &sitePage, p)

			//Page which does not exist
			p, err = db.GetPage(ctx, faker.URL())
			require.NoError(t, err)
			require.Nil(t, p)

			// Update p
			sitePage.Title = faker.Sentence()
			sitePage.Body = faker.Paragraph()
			err = db.UpdatePage(ctx, sitePage)
			require.NoError(t, err)
			p, err = db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
			require.Equal(t, &sitePage, p)

			// Remove a p
			err = db.DeletePage(ctx, sitePage.Url)
			require.NoError(t, err)
			// Check if the p is removed
			p, err = db.GetPage(ctx, sitePage.Url)
			require.NoError(t, err)
		})
	}
}
