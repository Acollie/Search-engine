package handler

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"webcrawler/cmd/spider/pkg/db"
	"webcrawler/pkg/generated/service/spider"
)

type RpcServer struct {
	spider.UnimplementedSpiderServer

	db db.Db
}

func (c *RpcServer) mustEmbedUnimplementedSpiderServer() {
	//TODO implement me
	panic("implement me")
}

func NewRPCServer(db db.Db) *RpcServer {
	return &RpcServer{
		db: db,
	}
}

func (c *RpcServer) _GetSeenList(ctx context.Context, request *spider.SeenListRequest) (*spider.SeenListResponse, error) {
	pages, err := c.db.Page.GetAllPages(ctx)
	if err != nil {
		return nil, err
	}
	var response []*spider.Page
	for _, page := range pages {
		response = append(response, &spider.Page{
			Url:   page.Url,
			Body:  page.Body,
			Links: page.Links,
		})
	}

	return &spider.SeenListResponse{
		SeenSites: response,
	}, nil
}

func (c *RpcServer) GetSeenList(conn grpc.BidiStreamingServer[spider.SeenListRequest, spider.SeenListResponse]) error {
	for {
		ctx := conn.Context()
		//request, err := conn.Recv()
		//if err != nil {
		//	return err
		//}
		//request.GetLimit()
		response, err := c._GetSeenList(ctx, nil)
		if err != nil {
			return err
		}
		if err := conn.Send(response); err != nil {
			return err
		}
		fmt.Println("Sending response")
	}

	return nil
}
