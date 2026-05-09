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
	fmt.Println("GetSeenList: Stream opened, waiting for requests")
	for {
		// Receive request from client
		request, err := conn.Recv()
		if err == io.EOF {
			fmt.Println("GetSeenList: Client closed stream")
			return nil
		}
		if err != nil {
			fmt.Printf("GetSeenList: Failed to receive request: %v\n", err)
			return err
		}

		fmt.Printf("GetSeenList: Received request (limit=%d, offset=%d)\n", request.Limit, request.Offset)

		// Process and send response
		response, err := c._GetSeenList(conn.Context(), request)
		if err != nil {
			fmt.Printf("GetSeenList: Failed to process request: %v\n", err)
			return err
		}

		fmt.Printf("GetSeenList: Sending response with %d pages\n", len(response.SeenSites))
		if err := conn.Send(response); err != nil {
			fmt.Printf("GetSeenList: Failed to send response: %v\n", err)
			return err
		}
	}
}
