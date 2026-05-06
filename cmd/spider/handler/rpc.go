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

func (c *RpcServer) GetHealth(ctx context.Context, req *spider.HealthRequest) (*spider.HealthResponse, error) {
	count, err := c.db.Page.NumberOfPages(ctx)
	if err != nil {
		return &spider.HealthResponse{
			Status: &spider.Status{
				Healthy:     false,
				Tps:         0,
				SeenSites:   0,
				QueuedSites: 0,
			},
		}, nil
	}

	return &spider.HealthResponse{
		Status: &spider.Status{
			Healthy:   true,
			Tps:       0,
			SeenSites: int64(count),
		},
	}, nil
}

func NewRPCServer(db sqlx.Db) *RpcServer {
	return &RpcServer{
		db: db,
	}
}

func (c *RpcServer) _GetSeenList(ctx context.Context, request *spider.SeenListRequest) (*spider.SeenListResponse, error) {
	limit := request.Limit
	if limit == 0 || limit > 1000 {
		limit = 100
	}

	pages, err := c.db.Page.GetPagesPaginated(ctx, limit, request.Offset)
	if err != nil {
		return nil, err
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
