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
	// suggestBreaker is separate so autocomplete failures never trip search.
	suggestBreaker *gobreaker.CircuitBreaker
}

// SearchFilters are optional filters; zero values mean "no filter".
type SearchFilters struct {
	Language  string
	Domain    string
	SinceUnix int64
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

	slog.Info("Searcher gRPC client initialized", slog.String("address", address))
	return &SearcherClient{
		conn:           conn,
		client:         pb.NewSearcherClient(conn),
		breaker:        newBreaker("searcher"),
		suggestBreaker: newBreaker("searcher-suggest"),
	}, nil
}

// newBreaker builds a circuit breaker with the standard frontend settings.
func newBreaker(name string) *gobreaker.CircuitBreaker {
	return gobreaker.NewCircuitBreaker(gobreaker.Settings{
		Name:        name,
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
}

// NewSearcherClientFromPB wraps an existing pb.SearcherClient (used by tests).
func NewSearcherClientFromPB(c pb.SearcherClient) *SearcherClient {
	return &SearcherClient{client: c, breaker: newBreaker("searcher"), suggestBreaker: newBreaker("searcher-suggest")}
}

// Search performs a search query
func (c *SearcherClient) Search(ctx context.Context, query string, limit, offset int32, f SearchFilters) (*pb.SearchResponse, error) {
	result, err := c.breaker.Execute(func() (interface{}, error) {
		return c.client.SearchPages(ctx, &pb.SearchRequest{
			Query:     query,
			Limit:     limit,
			Offset:    offset,
			Language:  f.Language,
			Domain:    f.Domain,
			SinceUnix: f.SinceUnix,
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

// Suggest returns autocomplete suggestions for a prefix.
func (c *SearcherClient) Suggest(ctx context.Context, prefix string, limit int32) ([]string, error) {
	result, err := c.suggestBreaker.Execute(func() (interface{}, error) {
		return c.client.Suggest(ctx, &pb.SuggestRequest{Prefix: prefix, Limit: limit})
	})
	if err != nil {
		return nil, fmt.Errorf("suggest failed: %w", err)
	}
	return result.(*pb.SuggestResponse).Suggestions, nil
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
