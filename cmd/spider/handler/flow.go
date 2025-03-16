package handler

import (
	"context"
	"log"
	"sync"
	"webcrawler/cmd/spider/pkg/formating"
	site2 "webcrawler/cmd/spider/pkg/site"
)

func (h *Server) Scan(ctx context.Context) {

	for i := 0; i < 20; i++ {

		links, err := h.Db.Queue.GetExplore(ctx)
		log.Printf("Length of links %d", len(links))

		if err != nil {
			log.Printf("fetching %v", err)
		}

		wg := sync.WaitGroup{}
		for _, link := range links {

			wg.Add(1)
			go func() {
				defer wg.Done()

				valid, err := site2.FetchRobots(link)
				if err != nil {
					log.Printf("fetching robots %v", err)
				}
				if !valid {
					log.Printf("Robots disallowed")
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}

				page, resp, err := site2.NewPage(link)
				if err != nil {
					log.Printf("fetching page %v", err)
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
					log.Printf("adding links to queue %v", err)
					h.Db.Queue.RemoveLink(ctx, link)
					return
				}

				if err := h.Db.Queue.RemoveLink(ctx, link); err != nil {
					log.Printf("removing link from queue %v", err)
					return
				}

				err = h.Db.Page.SavePage(ctx, page)
				if err != nil {
					log.Printf("Adding page to db %s", err)
					return
				}

			}()

			wg.Wait()
		}

	}
}
