package handler

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"testing"
	"time"
	"webcrawler/pkg/generated/service/searcher"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/require"
)

func TestBuildSnippet(t *testing.T) {
	marked := "the " + highlightStart + "go" + highlightStop + " language"

	t.Run("marked headline wins over description", func(t *testing.T) {
		require.Equal(t, marked, buildSnippet(marked, "meta description"))
	})
	t.Run("description when there is no match in the body", func(t *testing.T) {
		require.Equal(t, "meta description", buildSnippet("plain start of body", "meta description"))
	})
	t.Run("headline text when there is no description", func(t *testing.T) {
		require.Equal(t, "plain start of body", buildSnippet("plain start of body", ""))
	})
	t.Run("long unmarked text truncates on a rune boundary", func(t *testing.T) {
		got := buildSnippet(strings.Repeat("é", 300), "")
		require.Equal(t, strings.Repeat("é", 200)+"...", got)
	})
}

func TestCapMarked(t *testing.T) {
	require.Equal(t, "short", capMarked("short", 10))

	// Cutting inside a highlight must close it so clients never see an open one.
	s := "ab" + highlightStart + "cdefgh" + highlightStop
	got := capMarked(s, 5)
	require.Equal(t, strings.Count(got, highlightStart), strings.Count(got, highlightStop))
	require.True(t, strings.HasSuffix(got, "..."))

	// Cutting after a closed highlight adds nothing extra.
	s2 := highlightStart + "a" + highlightStop + "bcdefgh"
	require.Equal(t, highlightStart+"a"+highlightStop+"bc...", capMarked(s2, 5))
}

func TestNormaliseQuery(t *testing.T) {
	require.Equal(t, `"go lang" -java`, normaliseQuery("  \"go lang\"   -java \n"))
	require.Len(t, []rune(normaliseQuery(strings.Repeat("é", 500))), maxQueryRunes)
	require.Equal(t, "", normaliseQuery("   "))
}

func TestCleanFilter(t *testing.T) {
	require.Equal(t, "en.wikipedia.org", cleanFilter("  EN.Wikipedia.org "))
	require.Len(t, []rune(cleanFilter(strings.Repeat("a", 1000))), maxFilterRunes)
}

func TestBuildSearchQuery(t *testing.T) {
	t.Run("no filters uses only the four fixed placeholders", func(t *testing.T) {
		q, args := buildSearchQuery("go", 10, 0, 5000, filters{}, false)
		require.Len(t, args, 4)
		require.NotContains(t, q, "$5")
		require.Contains(t, q, "websearch_to_tsquery")
		require.NotContains(t, q, "plainto_tsquery")
		require.NotContains(t, q, "ORDER BY pr.score DESC", "arbitrary order by default")
	})

	t.Run("filters take consecutive placeholders in a fixed order", func(t *testing.T) {
		q, args := buildSearchQuery("go", 10, 0, 5000,
			filters{language: "en", domain: "en.wikipedia.org", since: 1700000000}, false)
		require.Equal(t, []any{"go", int32(10), int32(0), 5000, "en", "en.wikipedia.org", int64(1700000000)}, args)
		require.Contains(t, q, "= $5")
		require.Contains(t, q, "sp.language")
		require.Contains(t, q, "split_part(sp.url, '/', 3) = $6")
		require.Contains(t, q, "sp.crawl_time >= to_timestamp($7::double precision)")
	})

	t.Run("a single filter uses the next free placeholder", func(t *testing.T) {
		q, args := buildSearchQuery("go", 10, 0, 5000, filters{domain: "x.org"}, false)
		require.Len(t, args, 5)
		require.Contains(t, q, "split_part(sp.url, '/', 3) = $5")
		require.NotContains(t, q, "sp.language")
	})

	t.Run("pagerank order selects candidates by score and still applies filters", func(t *testing.T) {
		q, args := buildSearchQuery("go", 10, 0, 5000, filters{language: "en"}, true)
		require.Len(t, args, 5)
		require.Contains(t, q, "ORDER BY pr.score DESC")
		require.Contains(t, q, "pr.is_latest = true")
		require.Contains(t, q, "= $5")
		require.Contains(t, q, "sp.language")
	})

	t.Run("user text is only ever a bound parameter", func(t *testing.T) {
		evil := `'; DROP TABLE seenpages; --`
		q, args := buildSearchQuery(evil, 10, 0, 5000, filters{domain: evil}, false)
		require.NotContains(t, q, "DROP TABLE")
		require.Contains(t, args, evil)
	})
}

func TestRankCandidatesByPageRank(t *testing.T) {
	t.Setenv("SEARCH_CANDIDATE_ORDER", "")
	require.False(t, rankCandidatesByPageRank())
	t.Setenv("SEARCH_CANDIDATE_ORDER", "PageRank")
	require.True(t, rankCandidatesByPageRank())
	t.Setenv("SEARCH_CANDIDATE_ORDER", "bogus")
	require.False(t, rankCandidatesByPageRank(), "unknown values keep the default")
}

func TestSearchPages_FiltersAreBoundAndKeyTheCache(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectQuery(actualQuery).
		WithArgs("golang", int32(10), int32(0), defaultMaxCandidates, "en", "en.wikipedia.org", int64(1700000000)).
		WillReturnRows(sqlmock.NewRows(mockCols).AddRow("https://en.wikipedia.org/wiki/Go", "Go", "x", nil, 0.5, 0.4, 0.43, time.Now()))
	// Same text, different filters: must not be served from the first entry.
	mock.ExpectQuery(actualQuery).
		WithArgs("golang", int32(10), int32(0), defaultMaxCandidates).
		WillReturnRows(sqlmock.NewRows(mockCols).AddRow("https://example.com", "Go", "x", nil, 0.5, 0.4, 0.43, time.Now()))

	h := NewRPCServer(db)
	_, err = h.SearchPages(context.Background(), &searcher.SearchRequest{
		Query: "golang", Language: " EN ", Domain: "En.Wikipedia.org", SinceUnix: 1700000000})
	require.NoError(t, err)
	_, err = h.SearchPages(context.Background(), &searcher.SearchRequest{Query: "golang"})
	require.NoError(t, err)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestSearchPages_MarkedSnippetPassesThrough(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	headline := "learn " + highlightStart + "go" + highlightStop + " today"
	mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols).
		AddRow("https://e.com", "T", headline, "a description", 0.5, 0.4, 0.43, time.Now()))

	resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: "go"})
	require.NoError(t, err)
	require.Equal(t, headline, resp.Pages[0].Body)
}

const didYouMeanSQL = `(?s)SELECT term FROM search_suggestions.*similarity`

func TestSearchPages_NoResultsOffersDidYouMean(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
	mock.ExpectQuery(didYouMeanSQL).WithArgs("univeristy of arizona").
		WillReturnRows(sqlmock.NewRows([]string{"term"}).AddRow("University of Arizona"))

	resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: `"Univeristy of Arizona"`})
	require.NoError(t, err)
	require.Empty(t, resp.Pages)
	require.Equal(t, "University of Arizona", resp.DidYouMean)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestSearchPages_DidYouMeanOnlyOnFirstPageOfNoResults(t *testing.T) {
	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	// Offset > 0: an empty page just means "past the end", so no suggestion
	// lookup may be issued (sqlmock fails the test on an unexpected query).
	mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
	resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: "golang", Offset: 20})
	require.NoError(t, err)
	require.Empty(t, resp.DidYouMean)
	require.NoError(t, mock.ExpectationsWereMet())
}

func TestDidYouMean_NeverFailsTheSearch(t *testing.T) {
	t.Run("missing table", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
		mock.ExpectQuery(didYouMeanSQL).WillReturnError(errors.New(`relation "search_suggestions" does not exist`))

		resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: "zzzz"})
		require.NoError(t, err)
		require.Empty(t, resp.DidYouMean)
	})
	t.Run("no close match", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
		mock.ExpectQuery(didYouMeanSQL).WillReturnError(sql.ErrNoRows)

		resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: "zzzz"})
		require.NoError(t, err)
		require.Empty(t, resp.DidYouMean)
	})
	t.Run("too short to be worth a lookup", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(actualQuery).WillReturnRows(sqlmock.NewRows(mockCols))
		// No suggestion query expected for a 2-character query.
		resp, err := NewRPCServer(db).SearchPages(context.Background(), &searcher.SearchRequest{Query: "zz"})
		require.NoError(t, err)
		require.Empty(t, resp.DidYouMean)
		require.NoError(t, mock.ExpectationsWereMet())
	})
}

const suggestSQL = `(?s)SELECT term FROM search_suggestions.*LIKE`

func TestSuggest(t *testing.T) {
	t.Run("returns completions in order and caches them", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(suggestSQL).WithArgs("univ%", 8).
			WillReturnRows(sqlmock.NewRows([]string{"term"}).AddRow("University of Arizona").AddRow("Universe"))

		h := NewRPCServer(db)
		r1, err := h.Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "  UNIV "})
		require.NoError(t, err)
		require.Equal(t, []string{"University of Arizona", "Universe"}, r1.Suggestions)

		// Second identical prefix must not hit the database again.
		r2, err := h.Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "univ"})
		require.NoError(t, err)
		require.Equal(t, r1.Suggestions, r2.Suggestions)
		require.NoError(t, mock.ExpectationsWereMet())
	})

	t.Run("short prefix does no lookup", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		r, err := NewRPCServer(db).Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "a"})
		require.NoError(t, err)
		require.Empty(t, r.Suggestions)
		require.NoError(t, mock.ExpectationsWereMet())
	})

	t.Run("LIKE wildcards are escaped", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(suggestSQL).WithArgs(`50\%\_x%`, 8).
			WillReturnRows(sqlmock.NewRows([]string{"term"}))
		_, err = NewRPCServer(db).Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "50%_x"})
		require.NoError(t, err)
		require.NoError(t, mock.ExpectationsWereMet())
	})

	t.Run("limit is defaulted and capped", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(suggestSQL).WithArgs("go%", maxSuggest).WillReturnRows(sqlmock.NewRows([]string{"term"}))
		_, err = NewRPCServer(db).Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "go", Limit: 1000})
		require.NoError(t, err)
		require.NoError(t, mock.ExpectationsWereMet())
	})

	t.Run("database error degrades to an empty list", func(t *testing.T) {
		db, mock, err := sqlmock.New()
		require.NoError(t, err)
		defer db.Close()
		mock.ExpectQuery(suggestSQL).WillReturnError(errors.New(`relation "search_suggestions" does not exist`))
		r, err := NewRPCServer(db).Suggest(context.Background(), &searcher.SuggestRequest{Prefix: "go"})
		require.NoError(t, err, "autocomplete must never surface an error")
		require.Empty(t, r.Suggestions)
	})
}
