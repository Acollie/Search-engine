package handler

import (
	"context"
	"webcrawler/cmd/spider/pkg/site"
)

func (h *Handler) Listen(ctx context.Context) {
	_, err := h.queue.Fetch(ctx)
	if err != nil {
		panic(err)
	}
	err = h.siteI.Add(ctx, site.Page{})
	if err != nil {

	}

}
