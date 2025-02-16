package graphx

import (
	"context"
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/site"
)

func Test_conn(t *testing.T) {
	ctx := context.Background()
	graph, err := NewTestContainer(ctx)
	require.NoError(t, err)
	require.NotNil(t, graph)

	t.Run("Add a page to the graph", func(t *testing.T) {
		err := graph.AddPage(ctx, site.Website{
			Url:             "https:\\/\\/example.com",
			ProminenceValue: 5,
		}, site.Page{
			Url:   "https:\\/\\/example.com\\/page",
			Title: "Example Page",
		})
		require.NoError(t, err)
		page, err := graph.GetPage(ctx, "https:\\/\\/example.com\\/page")
		require.NoError(t, err)
		require.Equal(t, "https:\\/\\/example.com\\/page", page.Url)
		require.Equal(t, "Example Page", page.Title)

	})

	t.Run("Add a website to the graph", func(t *testing.T) {
		err := graph.AddWebsite(ctx, site.Website{
			Url:             "https:\\/\\/another-example.org",
			ProminenceValue: 3,
		})
		require.NoError(t, err)
		website, err := graph.GetWebsite(ctx, "https:\\/\\/another-example.org")
		require.NoError(t, err)
		require.Equal(t, "https:\\/\\/another-example.org", website.Url)
		require.Equal(t, 3.0, website.ProminenceValue)
		// \[Optionally verify stored data\]
	})
	t.Run("Add a link to the graph", func(t *testing.T) {
		err := graph.AddLink(ctx, site.Page{
			Url: "https:\\/\\/example.com\\/page",
			Links: []string{
				"https:\\/\\/example.com\\/page\\/link1",
				"https:\\/\\/example.com\\/page\\/link2",
			},
		})
		require.NoError(t, err)
	})
}
