package graphx

import (
	"context"
	"fmt"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
	"webcrawler/cmd/spider/pkg/site"
)

func (g *Graph) GetWebsite(ctx context.Context, rootWebsite string) (site.Website, error) {
	ses := g.Neo4j.NewSession(ctx, Neo4kStdSession)
	defer ses.Close(ctx)

	result, err := ses.ExecuteRead(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		rows, err := tx.Run(ctx, `
      MATCH (w:Website {url: $url})
      RETURN w.url AS websiteUrl, w.ProminenceValue AS prominenceValue
    `, map[string]any{
			"url": rootWebsite,
		})
		if err != nil {
			return nil, err
		}

		if rows.Next(ctx) {
			rec := rows.Record()
			wUrl, _ := rec.Get("websiteUrl")
			promVal, _ := rec.Get("prominenceValue")
			return site.Website{
				Url:             wUrl.(string),
				ProminenceValue: promVal.(float64),
			}, nil
		}
		return nil, fmt.Errorf("Website not found")
	})
	if err != nil {
		return site.Website{}, err
	}

	return result.(site.Website), nil
}

func (g *Graph) GetPage(ctx context.Context, pageUrl string) (site.Page, error) {
	ses := g.Neo4j.NewSession(ctx, Neo4kStdSession)
	defer ses.Close(ctx)

	result, err := ses.ExecuteRead(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		rows, err := tx.Run(ctx, `
      MATCH (w:Page {url: $url})
      RETURN w.url AS websiteUrl, w.baseURL AS baseURL, w.title AS title
    `, map[string]any{"url": pageUrl})
		if err != nil {
			return nil, err
		}

		if rows.Next(ctx) {
			rec := rows.Record()

			wUrlVal, _ := rec.Get("websiteUrl")
			baseUrlVal, _ := rec.Get("baseURL")
			titleVal, _ := rec.Get("title")

			if wUrlVal == nil {
				return nil, fmt.Errorf("missing url property")
			}

			wUrlStr := wUrlVal.(string)
			var baseUrlStr string
			if baseUrlVal != nil {
				baseUrlStr = baseUrlVal.(string)
			}

			titleStr := ""
			if titleVal != nil {
				titleStr = titleVal.(string)
			}

			return site.Page{
				Url:     wUrlStr,
				BaseURL: baseUrlStr,
				Title:   titleStr,
			}, nil
		}
		return nil, fmt.Errorf("page not found")
	})
	if err != nil {
		return site.Page{}, err
	}

	return result.(site.Page), nil
}
