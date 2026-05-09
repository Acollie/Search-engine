package handler

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"strconv"
	"time"
	grpcClient "webcrawler/cmd/frontend/grpc"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	searchRequests = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "frontend_search_requests_total",
			Help: "Total number of search requests",
		},
		[]string{"status"},
	)

	searchDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "frontend_search_duration_seconds",
			Help:    "Search request duration in seconds",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"status"},
	)
)

type SearchHandler struct {
	searcherClient *grpcClient.SearcherClient
}

type SearchResult struct {
	URL         string `json:"url"`
	Title       string `json:"title"`
	Snippet     string `json:"snippet"`
	LastCrawled string `json:"lastCrawled"`
}

type SearchAPIResponse struct {
	Results     []SearchResult `json:"results"`
	ResultCount int            `json:"resultCount"`
	Page        int            `json:"page"`
	NextPage    int            `json:"nextPage"`
	PrevPage    int            `json:"prevPage"`
	HasNext     bool           `json:"hasNext"`
	HasPrev     bool           `json:"hasPrev"`
	SearchTime  float64        `json:"searchTime"`
	Error       string         `json:"error,omitempty"`
	Query       string         `json:"query"`
}

func NewSearchHandler(searcherAddr string) (*SearchHandler, error) {
	client, err := grpcClient.NewSearcherClient(searcherAddr)
	if err != nil {
		return nil, err
	}
	return &SearchHandler{searcherClient: client}, nil
}

func (h *SearchHandler) HandleSearchAPI(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()

	w.Header().Set("Content-Type", "application/json")

	query := r.URL.Query().Get("q")
	if query == "" {
		json.NewEncoder(w).Encode(SearchAPIResponse{Error: "query parameter required"}) //nolint:errcheck
		return
	}

	page := 1
	if p, err := strconv.Atoi(r.URL.Query().Get("page")); err == nil && p > 0 {
		page = p
	}

	limit := int32(10)
	offset := int32((page - 1) * 10)

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	resp, err := h.searcherClient.Search(ctx, query, limit, offset)
	duration := time.Since(startTime).Seconds()

	if err != nil {
		slog.Error("Search request failed", slog.Any("error", err), slog.String("query", query))
		searchRequests.WithLabelValues("error").Inc()
		searchDuration.WithLabelValues("error").Observe(duration)
		json.NewEncoder(w).Encode(SearchAPIResponse{ //nolint:errcheck
			Error:      "Search service unavailable. Please try again later.",
			Query:      query,
			SearchTime: duration,
			Results:    []SearchResult{},
		})
		return
	}

	searchRequests.WithLabelValues("success").Inc()
	searchDuration.WithLabelValues("success").Observe(duration)

	results := make([]SearchResult, 0, len(resp.Pages))
	for _, pg := range resp.Pages {
		lastCrawled := ""
		if pg.LastSeen > 0 {
			lastCrawled = time.Unix(pg.LastSeen, 0).Format("Jan 2, 2006")
		}
		results = append(results, SearchResult{
			URL:         pg.Url,
			Title:       pg.Title,
			Snippet:     pg.Body,
			LastCrawled: lastCrawled,
		})
	}

	json.NewEncoder(w).Encode(SearchAPIResponse{ //nolint:errcheck
		Results:     results,
		ResultCount: len(results),
		Page:        page,
		NextPage:    page + 1,
		PrevPage:    page - 1,
		HasNext:     len(results) == int(limit),
		HasPrev:     page > 1,
		SearchTime:  duration,
		Query:       query,
	})
}

func (h *SearchHandler) Close() error {
	return h.searcherClient.Close()
}
