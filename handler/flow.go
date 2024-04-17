package handler

import (
	"context"
	"log"
	"sync"
	"webcrawler/formating"
	"webcrawler/site"
)

func (h *Server) Scan(ctx context.Context) {

	for i := 0; i < 20; i++ {

		links, err := h.Queue.Fetch(ctx)

		log.Printf("Length of links %d", len(links))

		if err != nil {
			log.Printf("fetching %v", err)
		}

		wg := sync.WaitGroup{}
		for _, link := range links {

			wg.Add(1)
			go func() {

				defer wg.Done()
				valid, err := site.FetchRobots(link.Url)
				if err != nil {
					log.Printf("fetching robots %v", err)
				}
				if !valid {
					log.Printf("Robots disallowed")
					h.Queue.Remove(ctx, *link.Handler)
					return
				}

				page, resp, err := site.NewPage(link.Url)
				if err != nil {
					return
				}
				if err := h.Db.AddPage(ctx, page); err != nil {
					log.Printf("adding page %v", err)
					return
				}

				linksNew, err := formating.GetLinks(link.Url, resp)
				if err != nil {
					log.Printf("getting links %v", err)
					return
				}
				website := site.NewWebsite(link.Url, linksNew)

				err = h.Queue.BatchAdd(ctx, linksNew)
				if err != nil {
					log.Printf("adding links to queue %v", err)
					return
				}

				err = h.Db.UpdateWebsite(ctx, page, website)
				if err != nil {
					log.Printf("updating website %v", err)
				}

				if err := h.Queue.Remove(ctx, *link.Handler); err != nil {
					log.Printf("removing link from queue %v", err)
				}

			}()

			wg.Wait()
		}

	}
}
