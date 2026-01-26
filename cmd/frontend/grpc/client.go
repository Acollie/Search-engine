package grpc

import (
	"context"
	"fmt"
	"time"
	pb "webcrawler/pkg/generated/service/searcher"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// SearcherClient wraps the gRPC client for the Searcher service
type SearcherClient struct {
	conn   *grpc.ClientConn
	client pb.SearcherClient
}

// NewSearcherClient creates a new Searcher gRPC client
func NewSearcherClient(address string) (*SearcherClient, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, address,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to searcher at %s: %w", address, err)
	}

	client := pb.NewSearcherClient(conn)

	return &SearcherClient{
		conn:   conn,
		client: client,
	}, nil
}

// Search performs a search query
func (c *SearcherClient) Search(ctx context.Context, query string, limit, offset int32) (*pb.SearchResponse, error) {
	resp, err := c.client.SearchPages(ctx, &pb.SearchRequest{
		Query:  query,
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, fmt.Errorf("search failed: %w", err)
	}
	return resp, nil
}

// CheckHealth checks if the Searcher service is healthy
func (c *SearcherClient) CheckHealth(ctx context.Context) (*pb.HealthResponse, error) {
	resp, err := c.client.GetHealth(ctx, &pb.HealthRequest{})
	if err != nil {
		return nil, fmt.Errorf("health check failed: %w", err)
	}
	return resp, nil
}

// Close closes the gRPC connection
func (c *SearcherClient) Close() error {
	if c.conn != nil {
		return c.conn.Close()
	}
	return nil
}
