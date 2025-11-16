package dynamoDBx

import (
	"context"
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
)

func Test_DynamoDBx(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Skipf("Skipping test - Docker not available: %v", r)
		}
	}()

	ctx := context.Background()
	ddb, err := NewTestContainer(ctx)
	if err != nil {
		t.Skipf("Skipping test - Docker not available: %v", err)
		return
	}
	require.NotNil(t, ddb)

	err = ddb.SetupTables(ctx)
	require.NoError(t, err)

	t.Run("Add a page to ddb", func(t *testing.T) {
		page := site.Page{
			URL:   "https:\\/\\/example.com\\/page",
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
