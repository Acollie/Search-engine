package dynamoDBx

import (
	"context"
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/site"
)

func Test_DynamoDBx(t *testing.T) {
	ctx := context.Background()
	ddb, err := NewTestContainer(ctx)
	require.NoError(t, err)
	require.NotNil(t, ddb)

	err = ddb.CreateTable(ctx)
	require.NoError(t, err)

	t.Run("Add a page to ddb", func(t *testing.T) {
		page := site.Page{
			Url:   "https:\\/\\/example.com\\/page",
			Title: "Example Page",
		}
		err := ddb.AddPage(ctx, page)
		require.NoError(t, err)

	})

	t.Run("Add a website to ddb", func(t *testing.T) {
		website := site.Website{
			Url:             "https:\\/\\/example.com",
			ProminenceValue: 5,
		}
		err := ddb.AddWebsite(ctx, website)
		require.NoError(t, err)

	})

}
