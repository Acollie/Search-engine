package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/grpcx"
)

func main() {
	ctx := context.Background()

	// Get list of spiders

	// Get cone

	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	conn, err := grpc.NewClient(fmt.Sprintf("0.0.0.0:%d", grpcx.SpiderPort), opts...)
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	spiderClient := spider.NewSpiderClient(conn)

	biCon, err := spiderClient.GetSeenList(ctx)
	if err != nil {
		panic(err)
	}
	for {
		biCon.Send(nil)
		request, err := biCon.Recv()
		if err != nil {
			break
		}
		fmt.Println(request)

	}

}
