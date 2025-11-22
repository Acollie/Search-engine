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
	// Return invalid link to avoid the 10-second sleep when queue is empty
	// The invalid URL will be quickly rejected by URL validator
	mockQueueDB.On("GetExplore", ctx).Run(func(args mock.Arguments) {
		callCount++
	}).Return([]string{"http://localhost/test"}, nil)

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
func TestHelper_ExtractDomain(t *testing.T) {
	t.Skip("Helper function not exported, should be tested")
	// If we extract a domain extraction function, test it:
	// - Valid URLs
	// - Invalid URLs
	// - URLs with ports
	// - URLs with paths
}

func TestHelper_IsRetriableError(t *testing.T) {
	t.Skip("Not implemented - should be added")
	// Test error classification:
	// - Network timeout -> retriable
	// - DNS error -> retriable
	// - 404 -> not retriable
	// - 500 -> retriable
	// - Context cancelled -> not retriable
}

func TestHelper_ShouldRetry(t *testing.T) {
	t.Skip("Not implemented - retry logic missing")
	// Test retry logic:
	// - Max retries reached
	// - Exponential backoff
	// - Jitter
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
