package handler

import (
	"context"
	"html/template"
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
	indexTemplate  *template.Template
	resultsTemplate *template.Template
}

type SearchResult struct {
	URL         string
	Title       string
	Snippet     string
	LastCrawled string
}

type SearchPageData struct {
	Query       string
	Results     []SearchResult
	ResultCount int
	Page        int
	NextPage    int
	PrevPage    int
	HasNext     bool
	HasPrev     bool
	SearchTime  float64
	Error       string
}

func NewSearchHandler(searcherAddr string) (*SearchHandler, error) {
	client, err := grpcClient.NewSearcherClient(searcherAddr)
	if err != nil {
		return nil, err
	}

	// Parse templates
	indexTmpl, err := template.ParseFiles("cmd/frontend/templates/index.html")
	if err != nil {
		return nil, err
	}

	resultsTmpl, err := template.ParseFiles("cmd/frontend/templates/results.html")
	if err != nil {
		return nil, err
	}

	return &SearchHandler{
		searcherClient: client,
		indexTemplate:  indexTmpl,
		resultsTemplate: resultsTmpl,
	}, nil
}

func (h *SearchHandler) HandleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	if err := h.indexTemplate.Execute(w, nil); err != nil {
		slog.Error("Failed to render index template", slog.Any("error", err))
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}

func (h *SearchHandler) HandleSearch(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()

	query := r.URL.Query().Get("q")
	if query == "" {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	// Parse page parameter
	pageStr := r.URL.Query().Get("page")
	page := 1
	if pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
			page = p
		}
	}

	// Calculate offset (10 results per page)
	limit := int32(10)
	offset := int32((page - 1) * 10)

	// Perform search
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	resp, err := h.searcherClient.Search(ctx, query, limit, offset)

	duration := time.Since(startTime).Seconds()

	if err != nil {
		slog.Error("Search request failed", slog.Any("error", err), slog.String("query", query))
		searchRequests.WithLabelValues("error").Inc()
		searchDuration.WithLabelValues("error").Observe(duration)

		data := SearchPageData{
			Query:      query,
			Error:      "Search service unavailable. Please try again later.",
			SearchTime: duration,
		}

		if err := h.resultsTemplate.Execute(w, data); err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	searchRequests.WithLabelValues("success").Inc()
	searchDuration.WithLabelValues("success").Observe(duration)

	// Convert results
	var results []SearchResult
	for _, page := range resp.Pages {
		lastCrawled := ""
		if page.LastSeen > 0 {
			t := time.Unix(page.LastSeen, 0)
			lastCrawled = t.Format("Jan 2, 2006")
		}

		results = append(results, SearchResult{
			URL:         page.Url,
			Title:       page.Title,
			Snippet:     page.Body,
			LastCrawled: lastCrawled,
		})
	}

	data := SearchPageData{
		Query:       query,
		Results:     results,
		ResultCount: len(results),
		Page:        page,
		NextPage:    page + 1,
		PrevPage:    page - 1,
		HasNext:     len(results) == int(limit),
		HasPrev:     page > 1,
		SearchTime:  duration,
	}

	if err := h.resultsTemplate.Execute(w, data); err != nil {
		slog.Error("Failed to render results template", slog.Any("error", err))
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}

func (h *SearchHandler) Close() error {
	return h.searcherClient.Close()
}
