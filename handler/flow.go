package handler

import (
	"context"
	"log"
	"webcrawler/formating"
	"webcrawler/site"
)

func (h *Server) Scan(ctx context.Context) {
	for i := 0; i < 2; i++ {
		links, err := h.Queue.Fetch(ctx)
		if err != nil {
			log.Printf("fetching %v", err)
			continue
		}
		for _, link := range links {
			log.Println(link.Url)
			page, resp, err := site.NewPage(link.Url)
			if err != nil {
				log.Printf("creating page %v", err)
				continue
			}
			err = h.Db.AddPage(page)
			if err != nil {
				log.Printf("adding page %v", err)
				continue
			}
			err = h.Queue.Remove(ctx, *link.Handler)
			if err != nil {
				log.Printf("failed to remove item from queue for url %s with error %s", link.Url, err)
			}
			links, err := formating.GetLinks(link.Url, resp)
			if err != nil {
				return
			}

			err = h.Queue.BatchAdd(ctx, links)
		}

	}
}
