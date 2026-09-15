package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/lib/pq"
)

type GraphNode struct {
	ID    string  `json:"id"`
	URL   string  `json:"url"`
	Title string  `json:"title"`
	Score float64 `json:"score"`
}

type GraphEdge struct {
	Source string `json:"source"`
	Target string `json:"target"`
}

type GraphResponse struct {
	Nodes []GraphNode `json:"nodes"`
	Edges []GraphEdge `json:"edges"`
}

type cachedGraph struct {
	payload   []byte
	expiresAt time.Time
}

type GraphHandler struct {
	db    *sql.DB
	mu    sync.Mutex
	cache map[int]cachedGraph
}

// graphCandidateLimit bounds how many recent pages are considered before
// ranking by PageRank score, keeping the query off a full table scan.
const graphCandidateLimit = 20000

func NewGraphHandler(db *sql.DB) *GraphHandler {
	return &GraphHandler{db: db, cache: make(map[int]cachedGraph)}
}

func (h *GraphHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	n := 100
	if v := r.URL.Query().Get("n"); v != "" {
		if parsed, err := strconv.Atoi(v); err == nil && parsed > 0 && parsed <= 500 {
			n = parsed
		}
	}

	// Serve from cache if still fresh.
	h.mu.Lock()
	if entry, ok := h.cache[n]; ok && time.Now().Before(entry.expiresAt) {
		payload := entry.payload
		h.mu.Unlock()
		w.Write(payload) //nolint:errcheck
		return
	}
	h.mu.Unlock()

	ctx, cancel := context.WithTimeout(r.Context(), 25*time.Second)
	defer cancel()

	// Ordering the whole table by PageRank score forces a sequential scan over
	// every indexable page (3M rows, 80GB) and a sort, which blows past the
	// 25s deadline and returns nothing. Take a bounded, recent candidate set
	// using the crawl_time index first, then rank those by score. When
	// PageRank has run the top pages are recent enough to appear here; when it
	// has not, every score is 0 and this ordering is what the old query
	// produced anyway.
	rows, err := h.db.QueryContext(ctx, `
		SELECT c.id, c.url,
			COALESCE(NULLIF(TRIM(c.title), ''), c.url),
			COALESCE(pr.score, 0.0) as score
		FROM (
			SELECT sp.id, sp.url, sp.title, sp.crawl_time
			FROM seenpages sp
			WHERE sp.is_indexable = true AND sp.links != ''
			ORDER BY sp.crawl_time DESC
			LIMIT $2
		) c
		LEFT JOIN pagerankresults pr ON c.id = pr.page_id AND pr.is_latest = true
		ORDER BY COALESCE(pr.score, 0.0) DESC, c.crawl_time DESC
		LIMIT $1
	`, n, graphCandidateLimit)
	if err != nil {
		slog.Error("graph: failed to query nodes", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	nodes := []GraphNode{}
	rawIDs := []int64{}
	for rows.Next() {
		var node GraphNode
		var rawID int64
		if err := rows.Scan(&rawID, &node.URL, &node.Title, &node.Score); err != nil {
			continue
		}
		node.ID = strconv.FormatInt(rawID, 10)
		node.Title = strings.ToValidUTF8(node.Title, "")
		nodes = append(nodes, node)
		rawIDs = append(rawIDs, rawID)
	}

	if len(nodes) == 0 {
		json.NewEncoder(w).Encode(GraphResponse{Nodes: []GraphNode{}, Edges: []GraphEdge{}}) //nolint:errcheck
		return
	}

	// Integer IDs allow the PK index to be used (text cast would force a seq scan).
	edgeRows, err := h.db.QueryContext(ctx, `
		SELECT DISTINCT src.id::text, tgt.id::text
		FROM seenpages src
		CROSS JOIN LATERAL unnest(string_to_array(src.links, '------')) AS link_url
		JOIN seenpages tgt ON tgt.url = link_url
		WHERE src.id = ANY($1)
		  AND tgt.id = ANY($1)
		  AND src.id != tgt.id
		LIMIT 2000
	`, pq.Array(rawIDs))
	if err != nil {
		slog.Error("graph: failed to query edges", slog.Any("error", err))
		json.NewEncoder(w).Encode(GraphResponse{Nodes: nodes, Edges: []GraphEdge{}}) //nolint:errcheck
		return
	}
	defer edgeRows.Close()

	edges := []GraphEdge{}
	for edgeRows.Next() {
		var e GraphEdge
		if err := edgeRows.Scan(&e.Source, &e.Target); err != nil {
			continue
		}
		edges = append(edges, e)
	}

	payload, err := json.Marshal(GraphResponse{Nodes: nodes, Edges: edges})
	if err != nil {
		slog.Error("graph: failed to marshal response", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	h.mu.Lock()
	h.cache[n] = cachedGraph{payload: payload, expiresAt: time.Now().Add(5 * time.Minute)}
	h.mu.Unlock()

	w.Write(payload) //nolint:errcheck
}
