package handler

import (
	"container/list"
	"context"
	"os"
	"strconv"
	"sync"
	"time"
	"webcrawler/pkg/generated/service/searcher"
)

const (
	defaultCacheTTL  = 60 * time.Second
	defaultCacheSize = 1000
)

// cacheTTL reads SEARCH_CACHE_TTL (a Go duration such as "30s"). Zero disables
// the cache; an unparseable or negative value falls back to the default.
func cacheTTL() time.Duration {
	raw := os.Getenv("SEARCH_CACHE_TTL")
	if raw == "" {
		return defaultCacheTTL
	}
	d, err := time.ParseDuration(raw)
	if err != nil || d < 0 {
		return defaultCacheTTL
	}
	return d
}

// cacheSize reads SEARCH_CACHE_SIZE (max cached queries). Invalid or
// non-positive values fall back to the default.
func cacheSize() int {
	raw := os.Getenv("SEARCH_CACHE_SIZE")
	if raw == "" {
		return defaultCacheSize
	}
	n, err := strconv.Atoi(raw)
	if err != nil || n <= 0 {
		return defaultCacheSize
	}
	return n
}

type cacheEntry struct {
	key     string
	resp    *searcher.SearchResponse
	expires time.Time
}

// inflight is one running database query that other identical requests wait on.
type inflight struct {
	done chan struct{}
	resp *searcher.SearchResponse
	err  error
}

// resultCache is a bounded TTL cache of search responses that also collapses
// concurrent identical queries into a single database call. Popular terms are
// the expensive ones (ranking a broad match set is the slow path), and they are
// also the ones most likely to be repeated or issued at the same moment.
//
// Responses are shared between callers and must be treated as read-only.
// Errors are never cached.
type resultCache struct {
	mu       sync.Mutex
	ttl      time.Duration
	max      int
	items    map[string]*list.Element
	order    *list.List // front = most recently used
	inflight map[string]*inflight
	now      func() time.Time
}

func newResultCache(max int, ttl time.Duration) *resultCache {
	return &resultCache{
		ttl:      ttl,
		max:      max,
		items:    make(map[string]*list.Element),
		order:    list.New(),
		inflight: make(map[string]*inflight),
		now:      time.Now,
	}
}

func (c *resultCache) enabled() bool { return c != nil && c.ttl > 0 && c.max > 0 }

// do returns the cached response for key, or runs fn and caches its result.
// The boolean reports whether the response was served without running fn in
// this call (cache hit or shared with an identical in-flight query).
func (c *resultCache) do(ctx context.Context, key string, fn func() (*searcher.SearchResponse, error)) (*searcher.SearchResponse, bool, error) {
	if !c.enabled() {
		resp, err := fn()
		return resp, false, err
	}

	c.mu.Lock()
	if el, ok := c.items[key]; ok {
		entry := el.Value.(*cacheEntry)
		if c.now().Before(entry.expires) {
			c.order.MoveToFront(el)
			c.mu.Unlock()
			return entry.resp, true, nil
		}
		c.order.Remove(el)
		delete(c.items, key)
	}
	if call, ok := c.inflight[key]; ok {
		c.mu.Unlock()
		select {
		case <-call.done:
			return call.resp, true, call.err
		case <-ctx.Done():
			return nil, false, ctx.Err()
		}
	}
	call := &inflight{done: make(chan struct{})}
	c.inflight[key] = call
	c.mu.Unlock()

	call.resp, call.err = fn()

	c.mu.Lock()
	delete(c.inflight, key)
	if call.err == nil {
		c.store(key, call.resp)
	}
	c.mu.Unlock()
	close(call.done)

	return call.resp, false, call.err
}

// store inserts a response, evicting the least recently used entry when full.
// Caller must hold c.mu.
func (c *resultCache) store(key string, resp *searcher.SearchResponse) {
	if el, ok := c.items[key]; ok {
		c.order.Remove(el)
	}
	c.items[key] = c.order.PushFront(&cacheEntry{key: key, resp: resp, expires: c.now().Add(c.ttl)})
	for c.order.Len() > c.max {
		oldest := c.order.Back()
		c.order.Remove(oldest)
		delete(c.items, oldest.Value.(*cacheEntry).key)
	}
}
