package ratelimit

import (
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// Limiter is a generic per-key token-bucket rate limiter with periodic cleanup.
type Limiter struct {
	mu       sync.RWMutex
	limiters map[string]*entry

	rps   float64
	burst int

	cleanupInterval time.Duration
	idleTTL         time.Duration
	stopCleanup     chan struct{}
}

type entry struct {
	limiter    *rate.Limiter
	lastAccess time.Time
}

// New creates a Limiter allowing rps requests per second with the given burst size.
func New(rps float64, burst int) *Limiter {
	l := &Limiter{
		limiters:        make(map[string]*entry),
		rps:             rps,
		burst:           burst,
		cleanupInterval: 5 * time.Minute,
		idleTTL:         30 * time.Minute,
		stopCleanup:     make(chan struct{}),
	}
	go l.cleanupLoop()
	return l
}

// Close stops the background cleanup goroutine.
func (l *Limiter) Close() {
	close(l.stopCleanup)
}

// Allow returns true if the key is within its rate limit quota.
func (l *Limiter) Allow(key string) bool {
	return l.get(key).Allow()
}

func (l *Limiter) get(key string) *rate.Limiter {
	l.mu.RLock()
	e, ok := l.limiters[key]
	l.mu.RUnlock()
	if ok {
		l.mu.Lock()
		e.lastAccess = time.Now()
		l.mu.Unlock()
		return e.limiter
	}

	l.mu.Lock()
	defer l.mu.Unlock()
	if e, ok := l.limiters[key]; ok {
		e.lastAccess = time.Now()
		return e.limiter
	}
	e = &entry{
		limiter:    rate.NewLimiter(rate.Limit(l.rps), l.burst),
		lastAccess: time.Now(),
	}
	l.limiters[key] = e
	return e.limiter
}

func (l *Limiter) cleanupLoop() {
	ticker := time.NewTicker(l.cleanupInterval)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			l.cleanup()
		case <-l.stopCleanup:
			return
		}
	}
}

func (l *Limiter) cleanup() {
	cutoff := time.Now().Add(-l.idleTTL)
	l.mu.Lock()
	defer l.mu.Unlock()
	for key, e := range l.limiters {
		if e.lastAccess.Before(cutoff) {
			delete(l.limiters, key)
		}
	}
}
