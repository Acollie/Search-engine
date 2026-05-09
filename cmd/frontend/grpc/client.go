package grpc

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	pb "webcrawler/pkg/generated/service/searcher"

	"github.com/sony/gobreaker"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// SearcherClient wraps the gRPC client for the Searcher service
type SearcherClient struct {
	conn    *grpc.ClientConn
	client  pb.SearcherClient
	breaker *gobreaker.CircuitBreaker
}

// NewSearcherClient creates a new Searcher gRPC client
func NewSearcherClient(address string) (*SearcherClient, error) {
	slog.Info("Connecting to Searcher service", slog.String("address", address))

	conn, err := grpc.NewClient(address,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		slog.Error("Failed to connect to Searcher service", slog.String("address", address), slog.Any("error", err))
		return nil, fmt.Errorf("failed to create searcher client at %s: %w", address, err)
	}

	cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
		Name:        "searcher",
		MaxRequests: 1,
		Timeout:     60 * time.Second,
		ReadyToTrip: func(counts gobreaker.Counts) bool {
			return counts.ConsecutiveFailures >= 3
		},
		OnStateChange: func(name string, from, to gobreaker.State) {
			slog.Warn("Circuit breaker state changed",
				slog.String("breaker", name),
				slog.String("from", from.String()),
				slog.String("to", to.String()))
		},
	})

	slog.Info("Searcher gRPC client initialized", slog.String("address", address))
	return &SearcherClient{
		conn:    conn,
		client:  pb.NewSearcherClient(conn),
		breaker: cb,
	}, nil
}

// Search performs a search query
func (c *SearcherClient) Search(ctx context.Context, query string, limit, offset int32) (*pb.SearchResponse, error) {
	result, err := c.breaker.Execute(func() (interface{}, error) {
		return c.client.SearchPages(ctx, &pb.SearchRequest{
			Query:  query,
			Limit:  limit,
			Offset: offset,
		})
	})
	if err != nil {
		slog.Error("Search request failed", slog.String("query", query), slog.Any("error", err))
		return nil, fmt.Errorf("search failed: %w", err)
	}
	resp := result.(*pb.SearchResponse)
	slog.Info("Search request completed", slog.String("query", query), slog.Int("results", len(resp.Pages)))
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
		slog.Info("Closing Searcher gRPC connection")
		return c.conn.Close()
	}
	return nil
}
