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

				links, err := formating.GetLinks(link.Url, resp)
				if err != nil {
					h.Queue.Remove(ctx, *link.Handler)
					return
				}
				queueMessage := formating.ResolveLinkToQueueMessage(links)

				website := site.NewWebsite(link.Url, queueMessage)

				err = h.Queue.BatchAdd(ctx, queueMessage)
				if err != nil {
					log.Printf("adding links to queue %v", err)
					h.Queue.Remove(ctx, *link.Handler)
					return
				}

				page.Links = links

				if err := h.Queue.Remove(ctx, *link.Handler); err != nil {
					log.Printf("removing link from queue %v", err)
					return
				}

				err = h.Graph.AddLink(ctx, page)
				if err != nil {
					log.Printf("Adding links to graph", err)
					return
				}

				err = h.Graph.AddWebsite(ctx, website)
				if err != nil {
					log.Printf("add website to graph", err)
					return
				}

			}()

			wg.Wait()
		}

	}
}
