package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
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

type GraphHandler struct {
	db *sql.DB
}

func NewGraphHandler(db *sql.DB) *GraphHandler {
	return &GraphHandler{db: db}
}

func (h *GraphHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	n := 100
	if v := r.URL.Query().Get("n"); v != "" {
		if parsed, err := strconv.Atoi(v); err == nil && parsed > 0 && parsed <= 500 {
			n = parsed
		}
	}

	ctx, cancel := context.WithTimeout(r.Context(), 25*time.Second)
	defer cancel()

	// Include all indexable pages, not just those with PageRank scores.
	// Pages with scores sort first; remainder ordered by recency.
	rows, err := h.db.QueryContext(ctx, `
		SELECT sp.id, sp.url,
			COALESCE(NULLIF(TRIM(sp.title), ''), sp.url),
			COALESCE(pr.score, 0.0) as score
		FROM seenpages sp
		LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
		WHERE sp.is_indexable = true AND sp.links != ''
		ORDER BY COALESCE(pr.score, 0.0) DESC, sp.crawl_time DESC
		LIMIT $1
	`, n)
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

	// Use integer IDs so PostgreSQL can use the primary key index (text cast prevents it).
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

	json.NewEncoder(w).Encode(GraphResponse{Nodes: nodes, Edges: edges}) //nolint:errcheck
}
