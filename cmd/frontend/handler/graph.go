package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"
	"sort"
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
	// Weight is only set in constellation mode: the number of out-links the two
	// hubs share (co-citation), plus a bonus when one links directly to the other.
	Weight int `json:"weight,omitempty"`
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
	cache map[string]cachedGraph
}

// graphCandidateLimit bounds how many recent pages are considered before
// ranking by PageRank score, keeping the query off a full table scan.
const graphCandidateLimit = 20000

func NewGraphHandler(db *sql.DB) *GraphHandler {
	return &GraphHandler{db: db, cache: make(map[string]cachedGraph)}
}

func (h *GraphHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	n := 100
	if v := r.URL.Query().Get("n"); v != "" {
		if parsed, err := strconv.Atoi(v); err == nil && parsed > 0 && parsed <= 500 {
			n = parsed
		}
	}

	constellation := r.URL.Query().Get("mode") == "constellation"
	cacheKey := strconv.Itoa(n)
	if constellation {
		cacheKey = "c" + cacheKey
	}

	// Serve from cache if still fresh.
	h.mu.Lock()
	if entry, ok := h.cache[cacheKey]; ok && time.Now().Before(entry.expiresAt) {
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

	if constellation {
		h.serveConstellation(ctx, w, cacheKey, nodes, rawIDs)
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
	h.cache[cacheKey] = cachedGraph{payload: payload, expiresAt: time.Now().Add(5 * time.Minute)}
	h.mu.Unlock()

	w.Write(payload) //nolint:errcheck
}

// constellationMaxEdges caps co-citation links per hub so the payload stays small.
const constellationMaxEdges = 4

// constellationMinShared is the minimum number of shared out-links for two hubs
// to be joined when they do not link to each other directly.
const constellationMinShared = 3

// serveConstellation builds co-citation links between the already-selected hubs.
// It reads the links column of only those hubs (by primary key, at most 500
// rows) and does all matching in memory, so there is no join against the 3M-row
// table.
func (h *GraphHandler) serveConstellation(ctx context.Context, w http.ResponseWriter, cacheKey string, nodes []GraphNode, rawIDs []int64) {
	// left() bounds how much of each hub's link list is read. Hub pages (portals,
	// lists) can carry many thousands of links, and 500 of them loaded whole could
	// run the frontend pod (512Mi limit) out of memory; the first ~2,500 URLs are
	// plenty to find shared citations. A URL cut at the boundary is harmless.
	rows, err := h.db.QueryContext(ctx, `SELECT id, left(links, 150000) FROM seenpages WHERE id = ANY($1)`, pq.Array(rawIDs))
	if err != nil {
		slog.Error("graph: failed to query hub links", slog.Any("error", err))
		json.NewEncoder(w).Encode(GraphResponse{Nodes: nodes, Edges: []GraphEdge{}}) //nolint:errcheck
		return
	}
	defer rows.Close()

	links := make(map[string]string, len(nodes))
	for rows.Next() {
		var id int64
		var l string
		if err := rows.Scan(&id, &l); err != nil {
			continue
		}
		links[strconv.FormatInt(id, 10)] = l
	}

	payload, err := json.Marshal(GraphResponse{Nodes: nodes, Edges: buildCocitationEdges(nodes, links)})
	if err != nil {
		slog.Error("graph: failed to marshal response", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	h.mu.Lock()
	h.cache[cacheKey] = cachedGraph{payload: payload, expiresAt: time.Now().Add(5 * time.Minute)}
	h.mu.Unlock()
	w.Write(payload) //nolint:errcheck
}

// buildCocitationEdges links hubs that cite many of the same URLs, plus hubs
// that link to each other directly. linksByID maps node ID to the
// '------'-joined links column. URLs cited by more than half the hubs
// (navigation boilerplate) are ignored, and each hub keeps its strongest
// constellationMaxEdges links.
func buildCocitationEdges(nodes []GraphNode, linksByID map[string]string) []GraphEdge {
	const maxLinksPerPage = 5000
	idx := make(map[string]int, len(nodes))
	for i, nd := range nodes {
		idx[nd.URL] = i
	}

	citers := make(map[string][]int)
	direct := make(map[[2]int]bool)
	for i, nd := range nodes {
		seen := make(map[string]struct{})
		for k, u := range strings.Split(linksByID[nd.ID], "------") {
			if k >= maxLinksPerPage {
				break
			}
			if u == "" {
				continue
			}
			if _, dup := seen[u]; dup {
				continue
			}
			seen[u] = struct{}{}
			citers[u] = append(citers[u], i)
			if j, ok := idx[u]; ok && j != i {
				a, b := i, j
				if a > b {
					a, b = b, a
				}
				direct[[2]int{a, b}] = true
			}
		}
	}

	maxCiters := len(nodes) / 2
	if maxCiters < 2 {
		maxCiters = 2
	}
	shared := make(map[[2]int]int)
	for _, c := range citers {
		if len(c) < 2 || len(c) > maxCiters {
			continue
		}
		for x := 0; x < len(c); x++ {
			for y := x + 1; y < len(c); y++ {
				a, b := c[x], c[y]
				if a > b {
					a, b = b, a
				}
				shared[[2]int{a, b}]++
			}
		}
	}
	for p := range direct {
		shared[p] += constellationMinShared
	}

	type cand struct {
		p [2]int
		w int
	}
	cands := make([]cand, 0, len(shared))
	for p, w := range shared {
		if w >= constellationMinShared {
			cands = append(cands, cand{p, w})
		}
	}
	sort.Slice(cands, func(i, j int) bool {
		if cands[i].w != cands[j].w {
			return cands[i].w > cands[j].w
		}
		if cands[i].p[0] != cands[j].p[0] {
			return cands[i].p[0] < cands[j].p[0]
		}
		return cands[i].p[1] < cands[j].p[1]
	})

	degree := make([]int, len(nodes))
	edges := []GraphEdge{}
	for _, c := range cands {
		if degree[c.p[0]] >= constellationMaxEdges || degree[c.p[1]] >= constellationMaxEdges {
			continue
		}
		degree[c.p[0]]++
		degree[c.p[1]]++
		edges = append(edges, GraphEdge{Source: nodes[c.p[0]].ID, Target: nodes[c.p[1]].ID, Weight: c.w})
	}
	return edges
}
