package handler

import (
	"context"
	"errors"
	"log/slog"
	"math"
	"net/url"
	"strings"
	"sync"
	"time"
	"webcrawler/cmd/spider/metrics"
	"webcrawler/cmd/spider/pkg/formating"
	"webcrawler/cmd/spider/pkg/site"
)

const (
	maxRetries     = 3
	maxConcurrency = 10
	baseRetryDelay = 1 * time.Second
	maxRetryDelay  = 30 * time.Second
)

// Scan continuously processes URLs from the queue until context is cancelled
func (h *Server) Scan(ctx context.Context) {
	slog.Info("Starting Spider scan loop")

	for {
		select {
		case <-ctx.Done():
			slog.Info("Context cancelled, stopping scan", slog.Any("reason", ctx.Err()))
			return
		default:
			if err := h.processBatch(ctx); err != nil {
				if errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
					slog.Info("Context cancelled during batch processing")
					return
				}
				slog.Error("Error processing batch", slog.Any("error", err))
				time.Sleep(5 * time.Second)
			}
		}
	}
}

func (h *Server) processBatch(ctx context.Context) error {
	links, err := h.Db.Queue.GetExplore(ctx)
	if err != nil {
		return err
	}

	slog.Info("Fetched links from queue", slog.Int("count", len(links)))
	metrics.QueueDepth.Set(float64(len(links)))

	if len(links) == 0 {
		// No work to do, sleep briefly to avoid busy loop
		time.Sleep(10 * time.Second)
		return nil
	}

	wg := sync.WaitGroup{}
	semaphore := make(chan struct{}, maxConcurrency)

	for _, link := range links {
		// Check context before starting new goroutine
		select {
		case <-ctx.Done():
			wg.Wait() // Wait for in-flight requests to complete
			return ctx.Err()
		default:
		}

		wg.Add(1)
		semaphore <- struct{}{}

		go func(url string) {
			defer wg.Done()
			defer func() { <-semaphore }()

			metrics.ActiveCrawls.Inc()
			defer metrics.ActiveCrawls.Dec()

			h.processURL(ctx, url)
		}(link)
	}

	wg.Wait()
	return nil
}

func (h *Server) processURL(ctx context.Context, pageURL string) {
	domain := extractDomain(pageURL)
	start := time.Now()

	defer func() {
		duration := time.Since(start)
		metrics.CrawlDuration.WithLabelValues(domain).Observe(duration.Seconds())
	}()

	// 1. Validate URL for SSRF protection
	if err := h.URLValidator.Validate(pageURL); err != nil {
		slog.Warn("URL validation failed", slog.String("url", pageURL), slog.Any("error", err))
		h.Db.Queue.RemoveLink(ctx, pageURL)
		metrics.PagesFailed.WithLabelValues("invalid_url").Inc()
		return
	}

	// 2. Check for crawl cycles
	if h.CycleDetector.IsCycle(pageURL) {
		slog.Debug("Cycle detected, skipping", slog.String("url", pageURL))
		h.Db.Queue.RemoveLink(ctx, pageURL)
		metrics.PagesFailed.WithLabelValues("cycle").Inc()
		return
	}

	// 3. Check for infinite patterns (e.g., pagination loops)
	if h.CycleDetector.IsInfinitePattern(pageURL) {
		slog.Warn("Infinite pattern detected, skipping", slog.String("url", pageURL))
		h.Db.Queue.RemoveLink(ctx, pageURL)
		metrics.PagesFailed.WithLabelValues("infinite_pattern").Inc()
		return
	}

	// Mark URL as seen
	h.CycleDetector.MarkSeen(pageURL)

	// 4. Apply rate limiting per domain
	if err := h.RateLimiter.Wait(ctx, domain); err != nil {
		slog.Error("Rate limiter error", slog.Any("error", err))
		return
	}

	// 5. Check robots.txt with caching
	allowed, err := h.checkRobotsCached(domain, pageURL)
	if err != nil {
		slog.Error("Error fetching robots.txt", slog.Any("error", err), slog.String("url", pageURL))
		// Don't remove link on robots.txt fetch error - might be temporary
		return
	}
	if !allowed {
		slog.Info("Robots disallowed", slog.String("url", pageURL))
		metrics.RobotsBlocked.WithLabelValues(domain).Inc()
		h.Db.Queue.RemoveLink(ctx, pageURL)
		return
	}

	// 6. Fetch page with retries
	if err := h.fetchAndSavePage(ctx, pageURL, domain); err != nil {
		if isRetriableError(err) {
			slog.Warn("Retriable error, keeping in queue for retry",
				slog.String("url", pageURL),
				slog.Any("error", err))
			// Don't remove from queue - will retry later
		} else {
			slog.Error("Non-retriable error, removing from queue",
				slog.String("url", pageURL),
				slog.Any("error", err))
			h.Db.Queue.RemoveLink(ctx, pageURL)
			metrics.PagesFailed.WithLabelValues(classifyError(err)).Inc()
		}
	}
}

// checkRobotsCached checks robots.txt with caching
func (h *Server) checkRobotsCached(domain, pageURL string) (bool, error) {
	// Check cache first
	if entry, found := h.RobotsCache.Get(domain); found {
		return entry.Allowed, entry.Error
	}

	// Fetch robots.txt
	allowed, err := site.FetchRobots(pageURL)

	// Cache result
	h.RobotsCache.Set(domain, allowed, err)

	return allowed, err
}

func (h *Server) fetchAndSavePage(ctx context.Context, pageURL, domain string) error {
	var page site.Page
	var resp string
	var err error

	// Retry logic with exponential backoff
	for attempt := 0; attempt < maxRetries; attempt++ {
		if attempt > 0 {
			delay := calculateBackoff(attempt)
			slog.Info("Retrying page fetch",
				slog.String("url", pageURL),
				slog.Int("attempt", attempt+1),
				slog.Duration("delay", delay))

			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(delay):
			}
		}

		page, resp, err = site.NewPage(pageURL)
		if err == nil {
			break // Success
		}

		if !isRetriableError(err) {
			return err // Don't retry non-retriable errors
		}

		slog.Warn("Fetch attempt failed",
			slog.String("url", pageURL),
			slog.Int("attempt", attempt+1),
			slog.Any("error", err))
	}

	if err != nil {
		return err
	}

	// Extract links
	pageLinks, err := formating.GetLinks(pageURL, resp)
	if err != nil {
		slog.Warn("Error extracting links", slog.Any("error", err), slog.String("url", pageURL))
		pageLinks = []string{} // Continue without links
	}
	page.Links = pageLinks

	if len(pageLinks) > 0 {
		metrics.LinksExtracted.WithLabelValues(domain).Add(float64(len(pageLinks)))

		err = h.Db.Queue.AddLinks(ctx, pageLinks)
		if err != nil {
			slog.Error("Error adding links to queue", slog.Any("error", err))
			// Continue processing - don't fail entire page save
		}
	}

	// Remove URL from queue (successfully processed)
	if err := h.Db.Queue.RemoveLink(ctx, pageURL); err != nil {
		slog.Error("Error removing link from queue", slog.Any("error", err))
	}

	// Save page to database
	err = h.Db.Page.SavePage(ctx, page)
	if err != nil {
		slog.Error("Error saving page to database", slog.Any("error", err))
		return err
	}

	metrics.PagesFetched.WithLabelValues(domain).Inc()
	slog.Info("Successfully crawled page",
		slog.String("url", pageURL),
		slog.Int("links", len(pageLinks)))

	return nil
}

// calculateBackoff calculates exponential backoff with jitter
func calculateBackoff(attempt int) time.Duration {
	delay := baseRetryDelay * time.Duration(math.Pow(2, float64(attempt)))
	if delay > maxRetryDelay {
		delay = maxRetryDelay
	}
	// Add jitter (±25%)
	jitterPercent := (2*float64(time.Now().UnixNano()%100)/100.0 - 1)
	jitter := time.Duration(float64(delay) * 0.25 * jitterPercent)
	return delay + jitter
}

// isRetriableError determines if an error is worth retrying
func isRetriableError(err error) bool {
	if err == nil {
		return false
	}

	errStr := err.Error()

	// Network errors are retriable
	if errors.Is(err, context.DeadlineExceeded) {
		return true
	}

	// Timeout errors
	if errors.Is(err, context.Canceled) {
		return false // Don't retry cancelled contexts
	}

	// Common retriable patterns
	retriablePatterns := []string{
		"timeout",
		"connection refused",
		"connection reset",
		"temporary failure",
		"503",
		"502",
		"504",
		"too many requests",
	}

	for _, pattern := range retriablePatterns {
		if errors.Is(err, errors.New(pattern)) ||
			strings.Contains(strings.ToLower(errStr), strings.ToLower(pattern)) {
			return true
		}
	}

	return false
}

// classifyError returns error reason for metrics
func classifyError(err error) string {
	if err == nil {
		return "unknown"
	}

	errStr := strings.ToLower(err.Error())

	if strings.Contains(errStr, "timeout") {
		return "timeout"
	}
	if strings.Contains(errStr, "404") || strings.Contains(errStr, "not found") {
		return "not_found"
	}
	if strings.Contains(errStr, "403") || strings.Contains(errStr, "forbidden") {
		return "forbidden"
	}
	if strings.Contains(errStr, "500") || strings.Contains(errStr, "internal server") {
		return "server_error"
	}
	if strings.Contains(errStr, "connection") {
		return "network"
	}
	if strings.Contains(errStr, "dns") {
		return "dns"
	}

	return "other"
}

func extractDomain(rawURL string) string {
	parsed, err := url.Parse(rawURL)
	if err != nil {
		return "unknown"
	}
	return parsed.Hostname()
}
