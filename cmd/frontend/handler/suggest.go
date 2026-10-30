package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"
	"unicode/utf8"
)

const (
	suggestMinLen  = 2
	suggestMaxLen  = 64
	suggestLimit   = 8
	suggestTimeout = 500 * time.Millisecond
)

type suggester interface {
	Suggest(ctx context.Context, prefix string, limit int32) ([]string, error)
}

// SuggestHandler serves GET /api/suggest?q=... for autocomplete.
type SuggestHandler struct{ client suggester }

func NewSuggestHandler(c suggester) *SuggestHandler { return &SuggestHandler{client: c} }

func (h *SuggestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=60")

	out := []string{}
	q := strings.TrimSpace(r.URL.Query().Get("q"))
	if utf8.RuneCountInString(q) >= suggestMinLen {
		if utf8.RuneCountInString(q) > suggestMaxLen {
			q = string([]rune(q)[:suggestMaxLen])
		}
		ctx, cancel := context.WithTimeout(r.Context(), suggestTimeout)
		defer cancel()
		if s, err := h.client.Suggest(ctx, q, suggestLimit); err == nil && s != nil {
			for _, v := range s {
				v = stripMarkers(v)
				if v != "" {
					out = append(out, v)
				}
			}
		} else if err != nil {
			// Autocomplete must never surface errors; do not cache failures.
			w.Header().Set("Cache-Control", "no-store")
		}
	}
	json.NewEncoder(w).Encode(map[string][]string{"suggestions": out}) //nolint:errcheck
}
