package robots

import (
	"sync"
	"time"

	"github.com/temoto/robotstxt"
)

// CacheEntry holds a domain's parsed robots.txt rules.
//
// It deliberately stores the parsed rule group rather than a single
// allow/deny verdict. Caching a verdict is only correct for the exact path it
// was computed from; reusing it for the rest of the domain lets disallowed
// paths through as soon as one allowed path has been seen.
type CacheEntry struct {
	// Group is the rule group matching our user agent. A nil Group means no
	// robots.txt applies (missing or unparseable), i.e. everything is allowed.
	Group     *robotstxt.Group
	FetchedAt time.Time
	Error     error
}

// Allows reports whether path is crawlable under this entry's rules.
// path should include the query string when present, since robots.txt rules
// may match on it (e.g. "Allow: /w/load.php?").
func (e *CacheEntry) Allows(path string) bool {
	if e.Group == nil {
		return true
	}
	return e.Group.Test(path)
}

const maxCacheEntries = 100_000

// Cache implements a TTL-based cache for robots.txt rules
type Cache struct {
	entries     map[string]*CacheEntry
	mu          sync.RWMutex
	ttl         time.Duration
	stopCleanup chan struct{}
}

// NewCache creates a new robots.txt cache
func NewCache(ttl time.Duration) *Cache {
	c := &Cache{
		entries:     make(map[string]*CacheEntry),
		ttl:         ttl,
		stopCleanup: make(chan struct{}),
	}

	// Start cleanup goroutine
	go c.cleanupRoutine()

	return c
}

// Close stops the cleanup goroutine
func (c *Cache) Close() {
	close(c.stopCleanup)
}

// Get retrieves a cached entry for a domain
func (c *Cache) Get(domain string) (*CacheEntry, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	entry, exists := c.entries[domain]
	if !exists {
		return nil, false
	}

	// Check if expired
	if time.Since(entry.FetchedAt) > c.ttl {
		return nil, false
	}

	return entry, true
}

// Set stores a domain's parsed robots.txt rules.
func (c *Cache) Set(domain string, group *robotstxt.Group, err error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	// Evict expired entries when at capacity to bound memory usage
	if len(c.entries) >= maxCacheEntries {
		cutoff := time.Now().Add(-c.ttl)
		for d, entry := range c.entries {
			if entry.FetchedAt.Before(cutoff) {
				delete(c.entries, d)
			}
		}
	}

	c.entries[domain] = &CacheEntry{
		Group:     group,
		FetchedAt: time.Now(),
		Error:     err,
	}
}

// cleanupRoutine periodically removes expired entries
func (c *Cache) cleanupRoutine() {
	ticker := time.NewTicker(c.ttl / 2)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			c.cleanup()
		case <-c.stopCleanup:
			return
		}
	}
}

// cleanup removes expired entries
func (c *Cache) cleanup() {
	c.mu.Lock()
	defer c.mu.Unlock()

	cutoff := time.Now().Add(-c.ttl)

	for domain, entry := range c.entries {
		if entry.FetchedAt.Before(cutoff) {
			delete(c.entries, domain)
		}
	}
}

// Stats returns cache statistics
func (c *Cache) Stats() map[string]interface{} {
	c.mu.RLock()
	defer c.mu.RUnlock()

	return map[string]interface{}{
		"total_entries": len(c.entries),
		"ttl_seconds":   c.ttl.Seconds(),
	}
}

// Clear removes all entries from the cache
func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.entries = make(map[string]*CacheEntry)
}
