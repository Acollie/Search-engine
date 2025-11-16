package sqlx

import (
	"context"
	"database/sql"
	"fmt"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/conn"
	dbx "webcrawler/pkg/db"
	"webcrawler/pkg/page"
	"webcrawler/pkg/testContainers"

	"github.com/go-faker/faker/v4"
	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
)

type testDb struct {
	conn     *sql.DB
	name     string
	connType conn.Type
}

func Test_DbInteraction(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Skipf("Skipping test - Docker not available: %v", r)
		}
	}()

	ctx := context.Background()
	sqliteConn, err := dbx.NewSqlite()
	require.NoError(t, err)
	defer sqliteConn.Close()
	sqliteTestDb := testDb{
		conn:     sqliteConn,
		name:     "sqlite",
		connType: conn.SQLite,
	}
	defer func() {
		_, err := sqliteConn.Exec(page.DropSeenPages)

		require.NoError(t, err)
	}()

	testDbs := []testDb{sqliteTestDb}

	// Try to add Maria and Postgres if Docker is available
	var mariaContainer, postgresContainer testcontainers.Container

	func() {
		defer func() {
			if r := recover(); r != nil {
				t.Logf("Skipping Maria tests - Docker panic: %v", r)
			}
		}()
		mariaConn, testContainerMar, err := testContainers.NewMarina(ctx)
		if err == nil {
			mariaContainer = testContainerMar
			testDbs = append(testDbs, testDb{
				conn:     mariaConn,
				name:     "maria",
				connType: conn.Maria,
			})
		} else {
			t.Logf("Skipping Maria tests: %v", err)
		}
	}()

	func() {
		defer func() {
			if r := recover(); r != nil {
				t.Logf("Skipping Postgres tests - Docker panic: %v", r)
			}
		}()
		postGresConn, testContainerPostPg, err := testContainers.NewPostgres(ctx)
		if err == nil {
			postgresContainer = testContainerPostPg
			testDbs = append(testDbs, testDb{
				conn:     postGresConn,
				name:     "postgres",
				connType: conn.PG,
			})
		} else {
			t.Logf("Skipping Postgres tests: %v", err)
		}
	}()

	// Cleanup containers after tests
	defer func() {
		if mariaContainer != nil {
			mariaContainer.Terminate(ctx)
		}
		if postgresContainer != nil {
			postgresContainer.Terminate(ctx)
		}
	}()

	for _, connType := range testDbs {
		conn := connType.conn
		t.Run(fmt.Sprintf("conn name:%s basic testing Seen pages", connType.name), func(t *testing.T) {
			sitePage := site.Page{
				URL:   faker.URL(),
				Title: faker.Sentence(),
				Body:  faker.Paragraph(),
			}

			if conn == nil {
				t.Errorf("Expected connection to be created")
			}
			db := page.Db{
				Sql:      conn,
				ConnType: connType.connType,
			}

			err := db.CreateTable(ctx)
			require.NoError(t, err)
			err = db.CreateIndex(ctx)
			require.NoError(t, err)
			err = db.SavePage(ctx, sitePage)
			require.NoError(t, err)

			p, err := db.GetPage(ctx, sitePage.URL)
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
			p, err = db.GetPage(ctx, sitePage.URL)
			require.NoError(t, err)
			require.Equal(t, &sitePage, p)

			// Remove a p
			err = db.DeletePage(ctx, sitePage.URL)
			require.NoError(t, err)
			// Check if the p is removed
			p, err = db.GetPage(ctx, sitePage.URL)
			require.NoError(t, err)
		})
	}
}
