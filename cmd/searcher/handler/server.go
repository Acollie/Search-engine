package handler

import (
	"context"
	"database/sql"
	"fmt"
	"webcrawler/cmd/searcher/tokeniser"
	"webcrawler/pkg/generated/service/searcher"
)

type Handler struct {
	searcher.UnimplementedSearcherServer

	db *sql.DB
}

func NewRPCServer(db *sql.DB) *Handler {
	return &Handler{
		db: db,
	}
}
func (c *Handler) SearchPages(ctx context.Context, request *searcher.SearchRequest) (*searcher.SearchResponse, error) {
	tokens := tokeniser.Tokenise(request.GetQuery())
	fmt.Println(tokens)
	return &searcher.SearchResponse{}, nil
}
