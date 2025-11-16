package handler

import (
	"context"
	"log/slog"
	"sync"
	"webcrawler/cmd/spider/pkg/formating"
	"webcrawler/cmd/spider/pkg/site"
)

func (h *Server) Scan(ctx context.Context) {

	for i := 0; i < 20; i++ {

		links, err := h.Db.Queue.GetExplore(ctx)
		slog.Info("Fetched links from queue", slog.Int("count", len(links)))

		if err != nil {
			slog.Error("Error fetching links", slog.Any("error", err))
		}

		wg := sync.WaitGroup{}
		for _, link := range links {

			wg.Add(1)
			go func() {
				defer wg.Done()

				valid, err := site.FetchRobots(link)
				if err != nil {
					slog.Error("Error fetching robots.txt", slog.Any("error", err), slog.String("url", link))
				}
				if !valid {
					slog.Info("Robots disallowed", slog.String("url", link))
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}

				page, resp, err := site.NewPage(link)
				if err != nil {
					slog.Error("Error fetching page", slog.Any("error", err), slog.String("url", link))
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}

				links, err := formating.GetLinks(link, resp)
				if err != nil {
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}
				page.Links = links

				err = h.Db.Queue.AddLinks(ctx, links)
				if err != nil {
					slog.Error("Error adding links to queue", slog.Any("error", err))
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}

				if err := h.Db.Queue.RemoveLink(ctx, link); err != nil {
					slog.Error("Error removing link from queue", slog.Any("error", err))
					return
				}

				err = h.Db.Page.SavePage(ctx, page)
				if err != nil {
					slog.Error("Error adding page to database", slog.Any("error", err))
					return
				}

			}()

			wg.Wait()
		}

	}
}
