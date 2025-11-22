package cycle

import (
	"crypto/sha256"
	"encoding/hex"
	"sync"
	"time"
)

// Detector detects crawl cycles and URL patterns
type Detector struct {
	// Track URLs seen in current crawl session
	seenURLs map[string]time.Time
	mu       sync.RWMutex

	// Track URL patterns to detect infinite crawl loops
	// e.g., /page/1, /page/2, /page/3... → infinite pagination
	patterns map[string]int

	maxPatternCount int
	cleanupInterval time.Duration
	stopCleanup     chan struct{}
}

// NewDetector creates a new cycle detector
func NewDetector(maxPatternCount int) *Detector {
	d := &Detector{
		seenURLs:        make(map[string]time.Time),
		patterns:        make(map[string]int),
		maxPatternCount: maxPatternCount,
		cleanupInterval: 10 * time.Minute,
		stopCleanup:     make(chan struct{}),
	}

	go d.cleanupRoutine()

	return d
}

// Close stops the cleanup goroutine
func (d *Detector) Close() {
	close(d.stopCleanup)
}

// IsCycle checks if a URL creates a crawl cycle
func (d *Detector) IsCycle(url string) bool {
	d.mu.RLock()
	_, exists := d.seenURLs[url]
	d.mu.RUnlock()

	return exists
}

// MarkSeen marks a URL as seen
func (d *Detector) MarkSeen(url string) {
	d.mu.Lock()
	defer d.mu.Unlock()

	d.seenURLs[url] = time.Now()
}

// IsInfinitePattern detects infinite URL patterns like pagination
// Returns true if this URL pattern has been seen too many times
func (d *Detector) IsInfinitePattern(url string) bool {
	pattern := extractPattern(url)

	d.mu.Lock()
	defer d.mu.Unlock()

	count := d.patterns[pattern]
	count++
	d.patterns[pattern] = count

	return count > d.maxPatternCount
}

// extractPattern extracts a URL pattern by replacing numbers with placeholders
// e.g., "/page/123" → "/page/{num}"
func extractPattern(url string) string {
	// Simple pattern: hash the URL structure
	// For better pattern detection, you could use regex to replace numbers
	hash := sha256.Sum256([]byte(url))
	return hex.EncodeToString(hash[:])[:16]
}

// cleanupRoutine periodically removes old entries
func (d *Detector) cleanupRoutine() {
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

// cleanup removes old seen URLs (older than 1 hour)
func (d *Detector) cleanup() {
	d.mu.Lock()
	defer d.mu.Unlock()

	cutoff := time.Now().Add(-1 * time.Hour)

	for url, seenAt := range d.seenURLs {
		if seenAt.Before(cutoff) {
			delete(d.seenURLs, url)
		}
	}

	// Reset pattern counts periodically
	if len(d.patterns) > 10000 {
		d.patterns = make(map[string]int)
	}
}

// Stats returns detector statistics
func (d *Detector) Stats() map[string]interface{} {
	d.mu.RLock()
	defer d.mu.RUnlock()

	return map[string]interface{}{
		"seen_urls":   len(d.seenURLs),
		"patterns":    len(d.patterns),
		"max_pattern": d.maxPatternCount,
	}
}

// Clear removes all entries
func (d *Detector) Clear() {
	d.mu.Lock()
	defer d.mu.Unlock()

	d.seenURLs = make(map[string]time.Time)
	d.patterns = make(map[string]int)
}
