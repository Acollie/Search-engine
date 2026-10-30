package handler

import (
	"context"
	"database/sql"
	"os"
	"strings"
	"testing"
	"time"
	"webcrawler/pkg/generated/service/searcher"

	_ "github.com/lib/pq"
	"github.com/stretchr/testify/require"
)

// These tests run the real SQL against a real Postgres, which the sqlmock tests
// cannot do: sqlmock only checks that a query string matches, not that Postgres
// accepts it or what it returns. They are skipped unless SEARCH_TEST_DSN points
// at a database already loaded with scripts/01-init-schema.sql, test pages, and
// scripts/04-search-suggestions.sql, e.g. a throwaway container:
//
//	docker run -d --name pgtest -e POSTGRES_PASSWORD=x -e POSTGRES_DB=databaseName -p 55432:5432 postgres:15-alpine
//	SEARCH_TEST_DSN='postgres://postgres:x@localhost:55432/databaseName?sslmode=disable' go test ./cmd/searcher/handler -run Integration
func integrationHandler(t *testing.T) *Handler {
	t.Helper()
	dsn := os.Getenv("SEARCH_TEST_DSN")
	if dsn == "" {
		t.Skip("SEARCH_TEST_DSN not set")
	}
	db, err := sql.Open("postgres", dsn)
	require.NoError(t, err)
	t.Cleanup(func() { db.Close() })
	require.NoError(t, db.Ping())
	return NewRPCServer(db)
}

func urls(resp *searcher.SearchResponse) []string {
	var out []string
	for _, p := range resp.Pages {
		out = append(out, p.Url)
	}
	return out
}

func search(t *testing.T, h *Handler, req *searcher.SearchRequest) *searcher.SearchResponse {
	t.Helper()
	if req.Limit == 0 {
		req.Limit = 20
	}
	resp, err := h.SearchPages(context.Background(), req)
	require.NoError(t, err)
	return resp
}

func TestIntegration_HighlightedSnippets(t *testing.T) {
	h := integrationHandler(t)
	resp := search(t, h, &searcher.SearchRequest{Query: "python"})
	require.NotEmpty(t, resp.Pages)

	var marked int
	for _, p := range resp.Pages {
		if strings.Contains(p.Body, highlightStart) {
			marked++
			require.Equal(t, strings.Count(p.Body, highlightStart), strings.Count(p.Body, highlightStop), "balanced markers: %q", p.Body)
		}
	}
	require.Positive(t, marked, "at least one snippet should highlight the match")
}

func TestIntegration_QuerySyntax(t *testing.T) {
	h := integrationHandler(t)

	t.Run("phrase", func(t *testing.T) {
		got := urls(search(t, h, &searcher.SearchRequest{Query: `"programming language"`}))
		require.Contains(t, got, "https://en.wikipedia.org/wiki/Go_(programming_language)")
		require.Contains(t, got, "https://example.com/snakes", "the words are adjacent in its body")
		// A phrase is order- and adjacency-sensitive, unlike the same words unquoted.
		require.Empty(t, search(t, h, &searcher.SearchRequest{Query: `"language programming"`}).Pages)
		require.NotEmpty(t, search(t, h, &searcher.SearchRequest{Query: `language programming`}).Pages)
	})
	t.Run("exclude", func(t *testing.T) {
		all := urls(search(t, h, &searcher.SearchRequest{Query: "python"}))
		without := urls(search(t, h, &searcher.SearchRequest{Query: "python -snake"}))
		require.Contains(t, all, "https://example.com/snakes")
		require.NotContains(t, without, "https://example.com/snakes")
		require.NotEmpty(t, without)
	})
	t.Run("or", func(t *testing.T) {
		got := urls(search(t, h, &searcher.SearchRequest{Query: "pythagoras OR tucson"}))
		require.Contains(t, got, "https://en.wikipedia.org/wiki/Pythagoras")
		require.Contains(t, got, "https://en.wikipedia.org/wiki/University_of_Arizona")
	})
	t.Run("malformed input never errors", func(t *testing.T) {
		for _, q := range []string{`"unterminated`, `python AND OR -`, `((`, `--`, `'; DROP TABLE seenpages; --`} {
			_, err := h.SearchPages(context.Background(), &searcher.SearchRequest{Query: q})
			require.NoError(t, err, "query %q", q)
		}
	})
}

func TestIntegration_Filters(t *testing.T) {
	h := integrationHandler(t)

	t.Run("domain", func(t *testing.T) {
		for _, u := range urls(search(t, h, &searcher.SearchRequest{Query: "python", Domain: "en.wikipedia.org"})) {
			require.True(t, strings.HasPrefix(u, "https://en.wikipedia.org/"), u)
		}
	})
	t.Run("language from the wikipedia subdomain when none is stored", func(t *testing.T) {
		got := urls(search(t, h, &searcher.SearchRequest{Query: "python", Language: "fr"}))
		require.Equal(t, []string{"https://fr.wikipedia.org/wiki/Python_(langage)"}, got)
	})
	t.Run("stored language is honoured", func(t *testing.T) {
		got := urls(search(t, h, &searcher.SearchRequest{Query: "python", Language: "en"}))
		require.Contains(t, got, "https://docs.python.org/3/tutorial/", "language stored as 'en'")
		require.Contains(t, got, "https://en.wikipedia.org/wiki/Python_(programming_language)", "en subdomain")
		require.NotContains(t, got, "https://fr.wikipedia.org/wiki/Python_(langage)")
	})
	t.Run("since", func(t *testing.T) {
		require.NotEmpty(t, search(t, h, &searcher.SearchRequest{Query: "python", SinceUnix: time.Now().Add(-time.Hour).Unix()}).Pages)
		require.Empty(t, search(t, h, &searcher.SearchRequest{Query: "python", SinceUnix: time.Now().Add(time.Hour).Unix()}).Pages)
	})
	t.Run("combined", func(t *testing.T) {
		got := urls(search(t, h, &searcher.SearchRequest{Query: "python", Domain: "en.wikipedia.org", Language: "en"}))
		require.NotEmpty(t, got)
		for _, u := range got {
			require.True(t, strings.HasPrefix(u, "https://en.wikipedia.org/"), u)
		}
	})
}

func TestIntegration_PageRankCandidateOrder(t *testing.T) {
	h := integrationHandler(t)
	t.Setenv("SEARCH_CANDIDATE_ORDER", "pagerank")
	h.cache = newResultCache[*searcher.SearchResponse](0, 0) // don't reuse the default-order cache

	got := urls(search(t, h, &searcher.SearchRequest{Query: "python"}))
	require.NotEmpty(t, got)
	require.Equal(t, "https://en.wikipedia.org/wiki/Python_(programming_language)", got[0], "the only ranked match comes first")
}

func TestIntegration_DidYouMean(t *testing.T) {
	h := integrationHandler(t)
	resp := search(t, h, &searcher.SearchRequest{Query: "pythagorus"})
	require.Empty(t, resp.Pages)
	require.Equal(t, "Pythagoras", resp.DidYouMean)

	require.Empty(t, search(t, h, &searcher.SearchRequest{Query: "zqxjkv wmpfl"}).DidYouMean, "nothing close, so no suggestion")
}

func TestIntegration_Suggest(t *testing.T) {
	h := integrationHandler(t)
	r, err := h.Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "pyth"})
	require.NoError(t, err)
	require.Equal(t, []string{"Pythagoras", "Python (programming language)"}, r.Suggestions, "most important first")

	r, err = h.Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "PYTHON ("})
	require.NoError(t, err)
	require.Equal(t, []string{"Python (programming language)"}, r.Suggestions, "case-insensitive, spaces and punctuation ok")

	for _, p := range []string{"%%", "_a", `\`, "50%"} {
		r, err = h.Suggest(context.Background(), &searcher.SuggestRequest{Prefix: p})
		require.NoError(t, err, "prefix %q", p)
		require.Empty(t, r.Suggestions, "wildcards must be literal, prefix %q", p)
	}
}
