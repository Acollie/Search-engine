package handler

import (
	"context"
	"fmt"
	"io"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/generated/types/site"
	"webcrawler/pkg/sqlx"

	"google.golang.org/grpc"
)

type RpcServer struct {
	spider.UnimplementedSpiderServer

	db sqlx.Db
}

func (c *RpcServer) mustEmbedUnimplementedSpiderServer() {
	//TODO implement me
	panic("implement me")
}

func NewRPCServer(db sqlx.Db) *RpcServer {
	return &RpcServer{
		db: db,
	}
}

func (c *RpcServer) _GetSeenList(ctx context.Context, request *spider.SeenListRequest) (*spider.SeenListResponse, error) {
	// Respect limit parameter, default to 100 if not set or too large
	limit := request.Limit
	if limit == 0 || limit > 1000 {
		limit = 100 // Default limit
	}

	// Get all pages (TODO: implement pagination in database layer)
	allPages, err := c.db.Page.GetAllPages(ctx)
	if err != nil {
		return nil, err
	}

	// Apply limit to prevent OOM
	pages := allPages
	if int32(len(allPages)) > limit {
		pages = allPages[:limit]
	}

	var response []*site.Page
	for _, page := range pages {
		response = append(response, &site.Page{
			Url:   page.URL,
			Title: page.Title,
		})
	}

	return &spider.SeenListResponse{
		SeenSites: response,
	}, nil
}

func (c *RpcServer) GetSeenList(conn grpc.BidiStreamingServer[spider.SeenListRequest, spider.SeenListResponse]) error {
	for {
		// Receive request from client
		request, err := conn.Recv()
		if err == io.EOF {
			// Client has finished sending
			return nil
		}
		if err != nil {
			return err
		}

		// Process and send response
		response, err := c._GetSeenList(conn.Context(), request)
		if err != nil {
			return err
		}

		if err := conn.Send(response); err != nil {
			return err
		}
		fmt.Println("Sending response")
	}
}
