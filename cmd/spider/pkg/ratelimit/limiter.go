package ratelimit

import (
	"context"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// DomainLimiter implements per-domain rate limiting
type DomainLimiter struct {
	limiters map[string]*rate.Limiter
	mu       sync.RWMutex

	// Rate limit configuration
	requestsPerSecond float64
	burst             int

	// Cleanup
	lastAccess      map[string]time.Time
	cleanupInterval time.Duration
	stopCleanup     chan struct{}
}

// NewDomainLimiter creates a new per-domain rate limiter
func NewDomainLimiter(requestsPerSecond float64, burst int) *DomainLimiter {
	dl := &DomainLimiter{
		limiters:          make(map[string]*rate.Limiter),
		lastAccess:        make(map[string]time.Time),
		requestsPerSecond: requestsPerSecond,
		burst:             burst,
		cleanupInterval:   5 * time.Minute,
		stopCleanup:       make(chan struct{}),
	}

	// Start cleanup goroutine
	go dl.cleanupRoutine()

	return dl
}

// Close stops the cleanup goroutine
func (d *DomainLimiter) Close() {
	close(d.stopCleanup)
}

// Wait blocks until the rate limit allows a request for the given domain
func (d *DomainLimiter) Wait(ctx context.Context, domain string) error {
	limiter := d.getLimiter(domain)
	return limiter.Wait(ctx)
}

// Allow checks if a request is allowed for the domain without blocking
func (d *DomainLimiter) Allow(domain string) bool {
	limiter := d.getLimiter(domain)
	return limiter.Allow()
}

// getLimiter gets or creates a rate limiter for a domain
func (d *DomainLimiter) getLimiter(domain string) *rate.Limiter {
	d.mu.RLock()
	limiter, exists := d.limiters[domain]
	d.mu.RUnlock()

	if exists {
		d.mu.Lock()
		d.lastAccess[domain] = time.Now()
		d.mu.Unlock()
		return limiter
	}

	// Create new limiter
	d.mu.Lock()
	defer d.mu.Unlock()

	// Double-check after acquiring write lock
	if limiter, exists := d.limiters[domain]; exists {
		d.lastAccess[domain] = time.Now()
		return limiter
	}

	limiter = rate.NewLimiter(rate.Limit(d.requestsPerSecond), d.burst)
	d.limiters[domain] = limiter
	d.lastAccess[domain] = time.Now()

	return limiter
}

// cleanupRoutine periodically removes unused rate limiters
func (d *DomainLimiter) cleanupRoutine() {
	ticker := time.NewTicker(d.cleanupInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			d.cleanup()
		case <-d.stopCleanup:
			return
		}
	}
}

// cleanup removes rate limiters that haven't been used recently
func (d *DomainLimiter) cleanup() {
	d.mu.Lock()
	defer d.mu.Unlock()

	cutoff := time.Now().Add(-30 * time.Minute)

	for domain, lastAccess := range d.lastAccess {
		if lastAccess.Before(cutoff) {
			delete(d.limiters, domain)
			delete(d.lastAccess, domain)
		}
	}
}

// Stats returns statistics about the rate limiter
func (d *DomainLimiter) Stats() map[string]interface{} {
	d.mu.RLock()
	defer d.mu.RUnlock()

	return map[string]interface{}{
		"total_domains":       len(d.limiters),
		"requests_per_second": d.requestsPerSecond,
		"burst":               d.burst,
	}
}
