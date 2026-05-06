package robots

import (
	"sync"
	"time"
)

// CacheEntry represents a cached robots.txt entry
type CacheEntry struct {
	Allowed   bool
	FetchedAt time.Time
	Error     error
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

// Set stores a robots.txt entry for a domain
func (c *Cache) Set(domain string, allowed bool, err error) {
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
		Allowed:   allowed,
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
