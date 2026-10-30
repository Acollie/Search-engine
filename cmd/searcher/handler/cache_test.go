package handler

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"
	"webcrawler/pkg/generated/service/searcher"
	"webcrawler/pkg/generated/types/site"

	"github.com/DATA-DOG/go-sqlmock"

	"github.com/stretchr/testify/require"
)

func resp(url string) *searcher.SearchResponse {
	return &searcher.SearchResponse{Pages: []*site.Page{{Url: url}}}
}

func TestResultCache_HitAvoidsSecondCall(t *testing.T) {
	c := newResultCache(10, time.Minute)
	var calls int
	fn := func() (*searcher.SearchResponse, error) { calls++; return resp("a"), nil }

	r1, shared, err := c.do(context.Background(), "k", fn)
	require.NoError(t, err)
	require.False(t, shared)

	r2, shared, err := c.do(context.Background(), "k", fn)
	require.NoError(t, err)
	require.True(t, shared)
	require.Same(t, r1, r2)
	require.Equal(t, 1, calls)
}

func TestResultCache_ExpiresAfterTTL(t *testing.T) {
	c := newResultCache(10, time.Minute)
	now := time.Now()
	c.now = func() time.Time { return now }
	var calls int
	fn := func() (*searcher.SearchResponse, error) { calls++; return resp("a"), nil }

	_, _, _ = c.do(context.Background(), "k", fn)
	now = now.Add(59 * time.Second)
	_, shared, _ := c.do(context.Background(), "k", fn)
	require.True(t, shared)

	now = now.Add(2 * time.Second)
	_, shared, _ = c.do(context.Background(), "k", fn)
	require.False(t, shared)
	require.Equal(t, 2, calls)
}

func TestResultCache_ErrorsAreNotCached(t *testing.T) {
	c := newResultCache(10, time.Minute)
	var calls int
	_, _, err := c.do(context.Background(), "k", func() (*searcher.SearchResponse, error) {
		calls++
		return nil, errors.New("db down")
	})
	require.Error(t, err)

	r, _, err := c.do(context.Background(), "k", func() (*searcher.SearchResponse, error) {
		calls++
		return resp("a"), nil
	})
	require.NoError(t, err)
	require.NotNil(t, r)
	require.Equal(t, 2, calls)
}

func TestResultCache_EvictsLeastRecentlyUsed(t *testing.T) {
	c := newResultCache(2, time.Minute)
	var calls int
	fn := func() (*searcher.SearchResponse, error) { calls++; return resp("x"), nil }

	_, _, _ = c.do(context.Background(), "a", fn)
	_, _, _ = c.do(context.Background(), "b", fn)
	_, _, _ = c.do(context.Background(), "a", fn) // touch a, so b is now oldest
	_, _, _ = c.do(context.Background(), "c", fn) // evicts b
	require.Equal(t, 3, calls)

	_, shared, _ := c.do(context.Background(), "a", fn)
	require.True(t, shared, "a was recently used and must survive")
	_, shared, _ = c.do(context.Background(), "b", fn)
	require.False(t, shared, "b was least recently used and must be evicted")
}

func TestResultCache_ConcurrentIdenticalQueriesShareOneCall(t *testing.T) {
	c := newResultCache(10, time.Minute)
	var calls atomic.Int32
	release := make(chan struct{})
	fn := func() (*searcher.SearchResponse, error) {
		calls.Add(1)
		<-release
		return resp("a"), nil
	}

	var wg sync.WaitGroup
	for i := 0; i < 8; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			r, _, err := c.do(context.Background(), "k", fn)
			require.NoError(t, err)
			require.NotNil(t, r)
		}()
	}
	// Let the leader start and the followers queue behind it.
	require.Eventually(t, func() bool { return calls.Load() == 1 }, time.Second, time.Millisecond)
	time.Sleep(20 * time.Millisecond)
	close(release)
	wg.Wait()

	require.Equal(t, int32(1), calls.Load())
}

func TestResultCache_FollowerHonoursItsOwnContext(t *testing.T) {
	c := newResultCache(10, time.Minute)
	release := make(chan struct{})
	defer close(release)
	go c.do(context.Background(), "k", func() (*searcher.SearchResponse, error) { <-release; return resp("a"), nil }) //nolint:errcheck

	require.Eventually(t, func() bool { c.mu.Lock(); defer c.mu.Unlock(); return len(c.inflight) == 1 }, time.Second, time.Millisecond)

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel()
	_, _, err := c.do(ctx, "k", func() (*searcher.SearchResponse, error) { t.Fatal("follower must not run fn"); return nil, nil })
	require.ErrorIs(t, err, context.DeadlineExceeded)
}

func TestResultCache_DisabledRunsEveryTime(t *testing.T) {
	for name, c := range map[string]*resultCache{"zero ttl": newResultCache(10, 0), "zero size": newResultCache(0, time.Minute), "nil": nil} {
		t.Run(name, func(t *testing.T) {
			var calls int
			fn := func() (*searcher.SearchResponse, error) { calls++; return resp("a"), nil }
			_, _, _ = c.do(context.Background(), "k", fn)
			_, shared, _ := c.do(context.Background(), "k", fn)
			require.False(t, shared)
			require.Equal(t, 2, calls)
		})
	}
}

func TestCacheConfig(t *testing.T) {
	t.Setenv("SEARCH_CACHE_TTL", "")
	require.Equal(t, defaultCacheTTL, cacheTTL())
	t.Setenv("SEARCH_CACHE_TTL", "5s")
	require.Equal(t, 5*time.Second, cacheTTL())
	t.Setenv("SEARCH_CACHE_TTL", "0")
	require.Equal(t, time.Duration(0), cacheTTL(), "zero disables the cache")
	for _, bad := range []string{"abc", "-5s"} {
		t.Setenv("SEARCH_CACHE_TTL", bad)
		require.Equal(t, defaultCacheTTL, cacheTTL(), "input %q", bad)
	}

	t.Setenv("SEARCH_CACHE_SIZE", "")
	require.Equal(t, defaultCacheSize, cacheSize())
	t.Setenv("SEARCH_CACHE_SIZE", "42")
	require.Equal(t, 42, cacheSize())
	for _, bad := range []string{"abc", "0", "-1"} {
		t.Setenv("SEARCH_CACHE_SIZE", bad)
		require.Equal(t, defaultCacheSize, cacheSize(), "input %q", bad)
	}
}

func TestSearchPages_RepeatQueryServedFromCache(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// One expectation only: a second database call would fail the test.
	mock.ExpectQuery(actualQuery).
		WillReturnRows(sqlmock.NewRows(mockCols).
			AddRow("https://example.com", "Title", "body", "desc", 0.5, 0.4, 0.43, time.Now()))

	h := NewRPCServer(db)
	first, err := h.SearchPages(context.Background(), &searcher.SearchRequest{Query: "golang", Limit: 5})
	require.NoError(t, err)

	// Different spacing and case tokenise to the same query, so it must hit.
	second, err := h.SearchPages(context.Background(), &searcher.SearchRequest{Query: "  GoLang ", Limit: 5})
	require.NoError(t, err)
	require.Same(t, first, second)

	// A different page of the same query is a different key and must not hit.
	mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
	_, err = h.SearchPages(context.Background(), &searcher.SearchRequest{Query: "golang", Limit: 5, Offset: 5})
	require.NoError(t, err)
	require.NoError(t, mock.ExpectationsWereMet())
}
