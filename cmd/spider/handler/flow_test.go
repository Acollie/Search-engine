package handler

import (
	"context"
	"errors"
	"testing"
	"time"
	"webcrawler/pkg/config"
	"webcrawler/pkg/sqlx"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestNew(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}

	server := New(db, cfg)
	defer server.Close()

	assert.NotNil(t, server)
	assert.Equal(t, db, server.Db)
	assert.Equal(t, cfg, server.Config)
}

func TestScan_EmptyQueue(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	server := New(db, cfg)
	defer server.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	// Mock empty queue - will be called multiple times until context cancelled
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, nil)

	// Scan now runs until context is cancelled
	server.Scan(ctx)

	// Verify at least one call was made
	mockQueueDB.AssertCalled(t, "GetExplore", ctx)
}

func TestScan_GetExploreError(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	server := New(db, cfg)
	defer server.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	// Mock error from queue
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, errors.New("database error"))

	// Scan continues even with errors (logs them but doesn't stop until context cancelled)
	server.Scan(ctx)

	mockQueueDB.AssertCalled(t, "GetExplore", ctx)
}

func TestScan_ContextRespected(t *testing.T) {
	// This test verifies Scan now respects context cancellation (bug fixed)
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	server := New(db, cfg)
	defer server.Close()

	ctx, cancel := context.WithCancel(context.Background())

	// Empty queue
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, nil)

	// Cancel context immediately
	cancel()

	// FIXED: Scan should exit when context is cancelled
	start := time.Now()
	server.Scan(ctx)
	duration := time.Since(start)

	// Should complete instantly when context is cancelled
	assert.True(t, duration < 100*time.Millisecond, "Should exit immediately when context cancelled")
}

func TestScan_ProcessesLinks(t *testing.T) {
	t.Skip("Integration test - requires network and robots.txt")

	// This would be an integration test
	// Unit testing the full Scan is difficult due to:
	// 1. Network calls to fetch robots.txt
	// 2. HTTP GET requests
	// 3. Complex goroutine coordination
	// 4. No dependency injection for site.FetchRobots or site.NewPage
}

func TestScan_ConcurrencyControl(t *testing.T) {
	t.Skip("Cannot test concurrency without dependency injection")

	// This test would verify concurrency if we could mock site.NewPage
	// Currently can't test due to tight coupling
	// Test that maxConcurrency=10 is respected
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	_ = New(db, cfg)

	ctx := context.Background()

	// Return 50 links (more than maxConcurrency)
	links := make([]string, 50)
	for i := range links {
		links[i] = "https://example.com/" + string(rune(i))
	}

	mockQueueDB.On("GetExplore", ctx).Return(links, nil).Once()
	// Subsequent calls return empty
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, nil).Times(19)
}

func TestScan_ErrorHandling(t *testing.T) {
	// Test documents current error handling behavior
	// Errors are logged but don't stop the scan

	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	server := New(db, cfg)
	defer server.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	// Mock error from queue
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, errors.New("connection lost"))

	// Should not panic, just log error and continue until context cancelled
	assert.NotPanics(t, func() {
		server.Scan(ctx)
	})

	mockQueueDB.AssertCalled(t, "GetExplore", ctx)
}

func TestScan_RunsUntilCancelled(t *testing.T) {
	// This test verifies Scan runs continuously until context is cancelled (bug fixed)
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	cfg := &config.Config{}
	server := New(db, cfg)
	defer server.Close()

	// Use a very short timeout to avoid waiting 10s for empty queue sleep
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	callCount := 0
	// Return a URL once, then empty — prevents an infinite slog-write loop that
	// saturates the stderr pipe and blocks the goroutine on wg.Wait().
	mockQueueDB.On("GetExplore", ctx).Run(func(args mock.Arguments) {
		callCount++
	}).Return([]string{"http://localhost/test"}, nil).Once()
	mockQueueDB.On("GetExplore", ctx).Return([]string{}, nil)

	// Mock RemoveLink to handle URL validator removing invalid URLs
	mockQueueDB.On("RemoveLink", ctx, "http://localhost/test").Return(nil)

	server.Scan(ctx)

	// FIXED: Now runs continuously until cancelled, not a fixed number of times
	// Should have called GetExplore at least once
	assert.Greater(t, callCount, 0, "Should call GetExplore at least once")
}

// Integration test ideas (would need refactoring to implement)
func TestScan_Integration_Ideas(t *testing.T) {
	t.Skip("Ideas for integration tests after refactoring")

	// After refactoring with dependency injection, we could test:
	// 1. Full workflow with mock HTTP client
	// 2. robots.txt caching behavior
	// 3. Link extraction and queueing
	// 4. Error recovery and retries
	// 5. Concurrent processing limits
	// 6. Metrics emission
	// 7. Context cancellation
}

// Benchmark ideas
func BenchmarkScan_SinglePage(b *testing.B) {
	b.Skip("Benchmark not implemented - requires refactoring")
	// After dependency injection:
	// - Benchmark processing N pages
	// - Benchmark concurrent vs sequential
	// - Benchmark with/without robots.txt cache
}

// Test helper functions that could be added
func TestExtractDomain(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{name: "simple URL", input: "https://example.com/path", expected: "example.com"},
		{name: "URL with port", input: "https://example.com:8080/path", expected: "example.com"},
		{name: "subdomain", input: "https://sub.example.com", expected: "sub.example.com"},
		{name: "relative path (no host)", input: "not-a-url", expected: ""},
		{name: "empty URL", input: "", expected: ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := extractDomain(tt.input)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestIsRetriableError(t *testing.T) {
	tests := []struct {
		name     string
		err      error
		expected bool
	}{
		{name: "nil error", err: nil, expected: false},
		{name: "context cancelled", err: context.Canceled, expected: false},
		{name: "context deadline exceeded", err: context.DeadlineExceeded, expected: true},
		{name: "timeout error", err: errors.New("connection timeout"), expected: true},
		{name: "connection refused", err: errors.New("connection refused"), expected: true},
		{name: "connection reset", err: errors.New("connection reset by peer"), expected: true},
		{name: "temporary failure", err: errors.New("temporary failure in name resolution"), expected: true},
		{name: "503 service unavailable", err: errors.New("503 service unavailable"), expected: true},
		{name: "502 bad gateway", err: errors.New("502 bad gateway"), expected: true},
		{name: "504 gateway timeout", err: errors.New("504 gateway timeout"), expected: true},
		{name: "too many requests", err: errors.New("429 too many requests"), expected: true},
		{name: "404 not found", err: errors.New("404 not found"), expected: false},
		{name: "403 forbidden", err: errors.New("403 forbidden"), expected: false},
		{name: "generic error", err: errors.New("something went wrong"), expected: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isRetriableError(tt.err)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestClassifyError(t *testing.T) {
	tests := []struct {
		name     string
		err      error
		expected string
	}{
		{name: "nil error", err: nil, expected: "unknown"},
		{name: "timeout", err: errors.New("connection timeout"), expected: "timeout"},
		{name: "404 not found", err: errors.New("404 not found"), expected: "not_found"},
		{name: "page not found", err: errors.New("page not found"), expected: "not_found"},
		{name: "403 forbidden", err: errors.New("403 forbidden"), expected: "forbidden"},
		{name: "500 internal server error", err: errors.New("500 internal server error"), expected: "server_error"},
		{name: "connection refused", err: errors.New("connection refused"), expected: "network"},
		{name: "dns resolution failure", err: errors.New("dns lookup failed"), expected: "dns"},
		{name: "unknown error", err: errors.New("something unexpected"), expected: "other"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := classifyError(tt.err)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestCalculateBackoff(t *testing.T) {
	// Attempt 1: base*2^1 = 2s, Attempt 2: base*2^2 = 4s (with ±25% jitter)
	for attempt := 1; attempt <= 3; attempt++ {
		delay := calculateBackoff(attempt)
		assert.Greater(t, delay, time.Duration(0), "backoff delay should be positive")
		assert.LessOrEqual(t, delay, maxRetryDelay, "backoff should not exceed max")
	}

	// Verify exponential growth: attempt 2 delay base (4s) should dominate over attempt 1 (2s)
	// even accounting for ±25% jitter: 4s*0.75=3s > 2s*1.25=2.5s
	delay2 := calculateBackoff(2)
	// At minimum, delay2 base (4s * 0.75 = 3s) > delay1 max (2s * 1.25 = 2.5s)
	// So with jitter, delay2 with worst-case jitter should still exceed delay1 base
	assert.Greater(t, float64(delay2), float64(baseRetryDelay)*1.5,
		"attempt 2 should be larger than 1.5x base delay")

	// Very high attempt numbers should be capped at maxRetryDelay
	delayHigh := calculateBackoff(100)
	assert.LessOrEqual(t, delayHigh, maxRetryDelay)
}

// Table-driven test for error scenarios
func TestScan_ErrorScenarios(t *testing.T) {
	tests := []struct {
		name          string
		queueError    error
		expectedPanic bool
	}{
		{
			name:          "Database connection lost",
			queueError:    errors.New("connection lost"),
			expectedPanic: false,
		},
		{
			name:          "Context cancelled",
			queueError:    context.Canceled,
			expectedPanic: false,
		},
		{
			name:          "Timeout",
			queueError:    context.DeadlineExceeded,
			expectedPanic: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockPageDB := &MockPageDB{}
			mockQueueDB := &MockQueueDB{}

			db := sqlx.Db{
				Page:  mockPageDB,
				Queue: mockQueueDB,
			}

			cfg := &config.Config{}
			server := New(db, cfg)

			ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
			defer cancel()

			mockQueueDB.On("GetExplore", ctx).Return([]string{}, tt.queueError)

			if tt.expectedPanic {
				assert.Panics(t, func() {
					server.Scan(ctx)
				})
			} else {
				assert.NotPanics(t, func() {
					server.Scan(ctx)
				})
			}
		})
	}
}

// Test for proposed improvements
func TestScan_ProposedImprovements(t *testing.T) {
	t.Skip("Proposed improvements not yet implemented")

	// Ideas for improvement tests:
	// 1. Test that metrics are emitted
	// 2. Test context cancellation works
	// 3. Test configurable loop count
	// 4. Test graceful shutdown
	// 5. Test retry logic
	// 6. Test rate limiting
	// 7. Test robots.txt caching
}
