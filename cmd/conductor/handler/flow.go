package handler

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"time"
	"webcrawler/cmd/conductor/metrics"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/generated/service/spider"
	sitepb "webcrawler/pkg/generated/types/site"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Listen continuously receives crawled pages from Spider via gRPC streaming,
// deduplicates them, stores new pages in PostgreSQL, and manages the crawl queue
func (h *Handler) Listen(ctx context.Context) {
	slog.Info("Starting conductor listener")

	for {
		select {
		case <-ctx.Done():
			slog.Info("Context cancelled, stopping listener")
			return
		default:
			if err := h.processBatch(ctx); err != nil {
				if errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
					return
				}
				if status.Code(err) == codes.Unavailable {
					slog.Warn("Spider service unavailable, retrying in 10s", slog.Any("error", err))
					time.Sleep(10 * time.Second)
					continue
				}
				slog.Error("Error processing batch", slog.Any("error", err))
				time.Sleep(5 * time.Second)
			}
		}
	}
}

// processBatch establishes a gRPC stream with Spider and processes incoming pages
func (h *Handler) processBatch(ctx context.Context) error {
	// Establish streaming connection with Spider
	stream, err := h.spiderClient.GetSeenList(ctx)
	if err != nil {
		return err
	}

	// Request pages from Spider
	req := &spider.SeenListRequest{
		Limit: 100, // Request batches of 100 pages
	}
	if err := stream.Send(req); err != nil {
		return err
	}

	// Process incoming pages
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			resp, err := stream.Recv()
			if err == io.EOF {
				slog.Debug("Stream ended normally")
				return nil
			}
			if err != nil {
				return err
			}

			// Process each page in the response
			for _, page := range resp.SeenSites {
				if err := h.processPage(ctx, page); err != nil {
					slog.Error("Failed to process page",
						slog.String("url", page.Url),
						slog.Any("error", err))
					metrics.DatabaseErrors.WithLabelValues("process").Inc()
					continue
				}
			}

			// Log any errors from Spider
			for _, err := range resp.Errors {
				slog.Warn("Spider reported error",
					slog.String("message", err.Message),
					slog.String("url", err.Url))
			}
		}
	}
}

// processPage handles a single page: deduplication, storage, and link extraction
func (h *Handler) processPage(ctx context.Context, protoPage *sitepb.Page) error {
	timer := time.Now()
	defer func() {
		metrics.ProcessingDuration.WithLabelValues("total").Observe(time.Since(timer).Seconds())
	}()

	metrics.PagesReceived.WithLabelValues("spider").Inc()

	// Convert protobuf page to internal Page type
	page := site.Page{
		URL:         protoPage.Url,
		Title:       protoPage.Title,
		Body:        protoPage.Body,
		BaseURL:     protoPage.BaseUrl,
		Meta:        protoPage.Meta,
		CrawledDate: uint64(time.Now().Unix()),
		Links:       protoPage.Links,
	}

	// Store page in database (includes deduplication check)
	dedupTimer := time.Now()
	err := h.siteI.Add(ctx, page)
	metrics.ProcessingDuration.WithLabelValues("dedup").Observe(time.Since(dedupTimer).Seconds())

	if err != nil {
		if isDuplicateError(err) {
			metrics.DuplicatesFound.Inc()
			slog.Debug("Duplicate page skipped", slog.String("url", page.URL))
			return nil
		}
		metrics.DatabaseErrors.WithLabelValues("insert").Inc()
		return err
	}

	metrics.NewPagesStored.Inc()
	slog.Debug("Stored new page", slog.String("url", page.URL), slog.Int("links", len(page.Links)))

	// Add extracted links to the queue
	if len(page.Links) > 0 {
		queueTimer := time.Now()
		if err := h.addLinksToQueue(ctx, page.Links); err != nil {
			slog.Error("Failed to add links to queue",
				slog.String("url", page.URL),
				slog.Any("error", err))
			metrics.DatabaseErrors.WithLabelValues("queue").Inc()
			return err
		}
		metrics.ProcessingDuration.WithLabelValues("queue").Observe(time.Since(queueTimer).Seconds())
	}

	return nil
}

// addLinksToQueue adds discovered links to the Postgres queue for future crawling
func (h *Handler) addLinksToQueue(ctx context.Context, links []string) error {
	if err := h.queue.AddLinks(ctx, links); err != nil {
		return err
	}

	metrics.QueueDepth.Add(float64(len(links)))
	return nil
}

// isDuplicateError checks if the error is due to a duplicate URL constraint
func isDuplicateError(err error) bool {
	if err == nil {
		return false
	}
	// PostgreSQL unique violation error code
	return status.Code(err) == codes.AlreadyExists ||
		err.Error() == "duplicate key value violates unique constraint"
}
