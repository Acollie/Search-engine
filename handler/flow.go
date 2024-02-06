package handler

import (
	"context"
	"log"
	"webcrawler/formating"
	"webcrawler/site"
)

func (h *Server) Scan(ctx context.Context) {

	//Wait group
	for i := 0; i < 10; i++ {

		links, err := h.Queue.Fetch(ctx)

		log.Printf("Length of links %d", len(links))
		if err != nil {
			log.Printf("fetching %v", err)
		}

		for _, link := range links {

			log.Printf("Scanning %s", link.Url)
			page, resp, err := site.NewPage(link.Url)
			if err != nil {
				log.Printf("creating page %v", err)
			}
			err = h.Db.AddPage(page)

			if err != nil {
				log.Printf("adding page %v", err)
			}
			err = h.Queue.Remove(ctx, *link.Handler)
			if err != nil {
				log.Printf("failed to remove item from queue for url %s with error %s", link.Url, err)
			}

			linksNew, err := formating.GetLinks(link.Url, resp)
			if err != nil {
				log.Printf("getting links %v", err)
			}
			website := site.NewWebsite(link.Url, linksNew)

			err = h.Queue.BatchAdd(ctx, linksNew)
			if err != nil {
				log.Printf("adding links to queue %v", err)
			}

			err = h.Db.UpdateWebsite(page, website)
			if err != nil {
				log.Printf("updating website %v", err)
			}
		}

	}
}
