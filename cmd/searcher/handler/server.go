package handler

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"os"
	"strconv"
	"strings"
	"time"
	"unicode"
	"webcrawler/cmd/searcher/metrics"
	"webcrawler/cmd/searcher/tokeniser"
	"webcrawler/pkg/generated/service/searcher"
	"webcrawler/pkg/generated/types/site"
)

type Handler struct {
	searcher.UnimplementedSearcherServer

	db          *sql.DB
	cache       *resultCache[*searcher.SearchResponse]
	suggestions *resultCache[[]string]
	health      *healthStats
}

func NewRPCServer(db *sql.DB) *Handler {
	return &Handler{
		db:          db,
		cache:       newResultCache[*searcher.SearchResponse](cacheSize(), cacheTTL()),
		suggestions: newResultCache[[]string](suggestCacheSize, suggestCacheTTL),
		health:      newHealthStats(healthStatsTTL),
	}
}

// defaultMaxCandidates bounds how many matching rows get ranked. See the
// comment in runSearch for the measurements behind this value.
const defaultMaxCandidates = 5000

// maxCandidates reads SEARCH_MAX_CANDIDATES so the cap can be tuned against a
// live index without rebuilding the image. Invalid or non-positive values fall
// back to the default rather than disabling the cap.
func maxCandidates() int {
	raw := os.Getenv("SEARCH_MAX_CANDIDATES")
	if raw == "" {
		return defaultMaxCandidates
	}
	n, err := strconv.Atoi(raw)
	if err != nil || n <= 0 {
		return defaultMaxCandidates
	}
	return n
}

// candidateOrderPageRank is the SEARCH_CANDIDATE_ORDER value that selects the
// candidate set by PageRank instead of in arbitrary table order.
const candidateOrderPageRank = "pagerank"

// rankCandidatesByPageRank reports whether candidates should be the
// highest-PageRank matches rather than an arbitrary slice of them. It is opt-in
// because the planner's choice of plan for this shape depends on the data (an
// index walk in score order is fast for common terms and slow for rare ones),
// so it must be compared with EXPLAIN ANALYZE on the live index before it
// becomes the default.
func rankCandidatesByPageRank() bool {
	return strings.EqualFold(os.Getenv("SEARCH_CANDIDATE_ORDER"), candidateOrderPageRank)
}

const (
	// highlightStart and highlightStop wrap matched terms in snippets. They are
	// Unicode private-use characters, which never occur in real page text, so
	// the client can split on them without any escaping and never has to treat
	// the snippet as HTML.
	highlightStart = ""
	highlightStop  = ""

	// headlineBodyChars bounds how much of a page body ts_headline reads. It
	// has to parse its whole input, so an unbounded body would make highlighting
	// cost depend on page size.
	headlineBodyChars = 20000

	maxQueryRunes   = 200
	maxFilterRunes  = 253
	snippetCapRunes = 600
)

// headlineOptions asks ts_headline for up to two short fragments around the
// matches, with the markers above in place of <b> tags.
var headlineOptions = `StartSel=` + highlightStart + `, StopSel=` + highlightStop +
	`, MaxWords=35, MinWords=15, MaxFragments=2, FragmentDelimiter=" … "`

// filters are the optional restrictions on a search. Zero values mean no filter.
// domain is a host name such as "en.wikipedia.org".
type filters struct {
	language string
	domain   string
	since    int64
}

func (f filters) key() string { return fmt.Sprintf("%s|%s|%d", f.language, f.domain, f.since) }

func cleanFilter(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	if r := []rune(s); len(r) > maxFilterRunes {
		s = string(r[:maxFilterRunes])
	}
	return s
}

// normaliseQuery collapses whitespace and bounds the length, so equivalent
// queries share a cache entry and a pathological one cannot make the query
// parser do unbounded work.
func normaliseQuery(q string) string {
	q = strings.Join(strings.Fields(q), " ")
	if r := []rune(q); len(r) > maxQueryRunes {
		q = string(r[:maxQueryRunes])
	}
	return q
}

func (c *Handler) SearchPages(ctx context.Context, request *searcher.SearchRequest) (*searcher.SearchResponse, error) {
	start := time.Now()
	q := normaliseQuery(request.GetQuery())

	// If no tokens, return empty response
	if len(tokeniser.Tokenise(q)) == 0 {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.QueriesProcessed.WithLabelValues("no_results").Inc()
		return &searcher.SearchResponse{}, nil
	}

	// Set default limit and offset
	limit := request.GetLimit()
	if limit <= 0 {
		limit = 10
	}
	offset := int32(0)
	if request.GetOffset() > 0 {
		offset = request.GetOffset()
	}
	f := filters{
		language: cleanFilter(request.GetLanguage()),
		domain:   cleanFilter(request.GetDomain()),
		since:    request.GetSinceUnix(),
	}
	if f.since < 0 {
		f.since = 0
	}

	// Identical queries are served from a short-lived cache, and identical
	// concurrent queries share one database call. The key is the normalised,
	// lower-cased query (the parser lower-cases terms, so case never changes the
	// results) plus the page and filters, so "Go  Lang" and "go lang" hit the
	// same entry but different filters never do.
	key := fmt.Sprintf("%s|%d|%d|%s", strings.ToLower(q), limit, offset, f.key())
	resp, shared, err := c.cache.do(ctx, key, func() (*searcher.SearchResponse, error) {
		return c.runSearch(ctx, q, limit, offset, f)
	})
	if shared && err == nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.QueriesProcessed.WithLabelValues("cached").Inc()
	}
	return resp, err
}

// buildSearchQuery assembles the ranking query and its arguments. $1..$4 are
// always the query text, limit, offset and candidate cap; the optional filters
// take the following placeholders, in a fixed order.
func buildSearchQuery(q string, limit, offset int32, candidates int, f filters, byPageRank bool) (string, []any) {
	args := []any{q, limit, offset, candidates}
	var where strings.Builder
	addFilter := func(clause string, v any) {
		args = append(args, v)
		where.WriteString("\n\t\t\t\t\t  AND " + fmt.Sprintf(clause, len(args)))
	}
	// The crawler's current write path never fills sp.domain or sp.language, so
	// both filters work from the URL instead of trusting those columns: the host
	// is the third '/'-separated part of "https://host/path", and Wikipedia
	// encodes the language in its subdomain ("en.wikipedia.org"). A stored
	// language still takes precedence when a page has one.
	if f.language != "" {
		addFilter(`COALESCE(NULLIF(sp.language, ''), CASE WHEN split_part(sp.url, '/', 3) LIKE '%%.wikipedia.org' `+
			`THEN split_part(split_part(sp.url, '/', 3), '.', 1) END) = $%d`, f.language)
	}
	if f.domain != "" {
		addFilter("split_part(sp.url, '/', 3) = $%d", f.domain)
	}
	if f.since > 0 {
		addFilter("sp.crawl_time >= to_timestamp($%d::double precision)", f.since)
	}

	candidateSQL := `
					SELECT sp.id, sp.search_vector, NULL::float8 AS pr_score
					FROM seenpages sp
					WHERE sp.search_vector @@ websearch_to_tsquery('english', $1)
					  AND sp.is_indexable = true` + where.String() + `
					LIMIT $4`
	if byPageRank {
		candidateSQL = `
					SELECT sp.id, sp.search_vector, pr.score AS pr_score
					FROM pagerankresults pr
					JOIN seenpages sp ON sp.id = pr.page_id
					WHERE pr.is_latest = true
					  AND sp.search_vector @@ websearch_to_tsquery('english', $1)
					  AND sp.is_indexable = true` + where.String() + `
					ORDER BY pr.score DESC
					LIMIT $4`
	}

	// Full-text search query combining ts_rank (30%) with PageRank score (70%).
	// ts_rank is computed once in the subquery to avoid calling it twice per row.
	//
	// Ranking works on ids and scores only. The text columns are fetched in the
	// outer query for just the page of results being returned, not for every
	// candidate. The snippet is produced there too: ts_headline is expensive, so
	// it runs on the handful of returned rows (over a bounded prefix of the body)
	// rather than on every candidate, and it is returned in the body column with
	// the highlight markers in place.
	query := `
		SELECT sp.url, sp.title,
			ts_headline('english', left(sp.body, ` + strconv.Itoa(headlineBodyChars) + `),
				websearch_to_tsquery('english', $1), '` + headlineOptions + `') AS body,
			sp.description,
			r.pagerank_score, r.text_relevance, r.combined_score, sp.crawl_time
		FROM (
			SELECT id, pagerank_score, text_relevance,
				text_relevance * 0.3 + pagerank_score * 0.7 as combined_score
			FROM (
				SELECT
					c.id,
					COALESCE(c.pr_score, pr.score, 0.0) as pagerank_score,
					ts_rank(c.search_vector, websearch_to_tsquery('english', $1)) as text_relevance
				FROM (` + candidateSQL + `
				) c
				LEFT JOIN pagerankresults pr ON c.id = pr.page_id AND pr.is_latest = true
			) scored
			ORDER BY combined_score DESC
			LIMIT $2 OFFSET $3
		) r
		JOIN seenpages sp ON sp.id = r.id
		ORDER BY r.combined_score DESC
	`
	return query, args
}

// runSearch executes the ranked full-text query against Postgres.
func (c *Handler) runSearch(ctx context.Context, q string, limit, offset int32, f filters) (*searcher.SearchResponse, error) {
	start := time.Now()

	// Cap the candidate set before ranking. ts_rank has to detoast search_vector
	// for every matching row, so ranking all matches of a common term touched
	// ~4GB of buffers and took 85s -- far past the caller's deadline, which
	// tripped the frontend circuit breaker and took down unrelated queries too.
	// Capping bounds that work: measured on "python" (51,524 matches),
	// uncapped 85.5s, 10,000 candidates 6.8s, 2,000 candidates 1.65s.
	//
	// The trade-off is that for very broad terms we rank a slice of the matches
	// rather than all of them, so results are approximate. By default that slice
	// is arbitrary; SEARCH_CANDIDATE_ORDER=pagerank makes it the most important
	// matches instead. Returning good-enough results beats timing out and
	// returning none.
	candidates := maxCandidates()
	if min := int(limit + offset); candidates < min {
		candidates = min
	}

	query, args := buildSearchQuery(q, limit, offset, candidates, f, rankCandidatesByPageRank())

	rows, err := c.db.QueryContext(ctx, query, args...)
	if err != nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.DatabaseErrors.Inc()
		metrics.QueriesProcessed.WithLabelValues("error").Inc()
		return nil, fmt.Errorf("failed to query pages: %w", err)
	}
	defer rows.Close()

	// Collect results
	var pages []*site.Page
	for rows.Next() {
		var url string
		var title sql.NullString
		var headline sql.NullString
		var description sql.NullString
		var pagerankScore float64
		var textRelevance float64
		var combinedScore float64
		var crawlTime sql.NullTime

		if err := rows.Scan(&url, &title, &headline, &description, &pagerankScore, &textRelevance, &combinedScore, &crawlTime); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		var lastSeen int64
		if crawlTime.Valid {
			lastSeen = crawlTime.Time.Unix()
		}

		pages = append(pages, &site.Page{
			Url:      strings.ToValidUTF8(url, ""),
			Title:    strings.ToValidUTF8(title.String, ""),
			Body:     strings.ToValidUTF8(buildSnippet(headline.String, description.String), ""),
			LastSeen: lastSeen,
		})
	}

	if err := rows.Err(); err != nil {
		metrics.QueryDuration.Observe(time.Since(start).Seconds())
		metrics.DatabaseErrors.Inc()
		metrics.QueriesProcessed.WithLabelValues("error").Inc()
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	resp := &searcher.SearchResponse{Pages: pages}
	if len(pages) == 0 && offset == 0 {
		resp.DidYouMean = c.didYouMean(ctx, q)
	}

	metrics.QueryDuration.Observe(time.Since(start).Seconds())
	metrics.ResultsReturned.Observe(float64(len(pages)))
	if len(pages) > 0 {
		metrics.QueriesProcessed.WithLabelValues("success").Inc()
	} else {
		metrics.QueriesProcessed.WithLabelValues("no_results").Inc()
	}

	return resp, nil
}

// buildSnippet picks the text shown under a result. A headline containing
// highlight markers is the best answer because it shows the match in context.
// Otherwise prefer the page's own description, and fall back to the start of
// the headline text, truncated at a rune boundary so multi-byte UTF-8 is never
// split.
func buildSnippet(headline, description string) string {
	if strings.Contains(headline, highlightStart) {
		return capMarked(headline, snippetCapRunes)
	}
	if description != "" {
		return description
	}
	runes := []rune(headline)
	if len(runes) > 200 {
		return string(runes[:200]) + "..."
	}
	return headline
}

// capMarked limits a marked-up snippet to max runes without leaving a highlight
// open, so a client that splits on the markers never sees an unterminated one.
func capMarked(s string, max int) string {
	runes := []rune(s)
	if len(runes) <= max {
		return s
	}
	out := string(runes[:max])
	if strings.Count(out, highlightStart) > strings.Count(out, highlightStop) {
		out += highlightStop
	}
	return out + "..."
}

// didYouMean looks for a known title close to a query that matched nothing,
// using trigram similarity against the small search_suggestions table (see
// scripts/04-search-suggestions.sql). It never fails the search: if the table
// is missing or the lookup is slow it just returns no suggestion.
func (c *Handler) didYouMean(ctx context.Context, q string) string {
	plain := strings.Join(strings.Fields(strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || unicode.IsSpace(r) {
			return unicode.ToLower(r)
		}
		return ' '
	}, q)), " ")
	if len([]rune(plain)) < 3 {
		return ""
	}

	ctx, cancel := context.WithTimeout(ctx, 500*time.Millisecond)
	defer cancel()

	var term string
	err := c.db.QueryRowContext(ctx, `
		SELECT term FROM search_suggestions
		WHERE term_lc % $1 AND term_lc <> $1
		ORDER BY similarity(term_lc, $1) DESC, weight DESC
		LIMIT 1`, plain).Scan(&term)
	if err != nil {
		if err != sql.ErrNoRows {
			slog.Debug("did-you-mean lookup failed", slog.Any("error", err))
		}
		return ""
	}
	return strings.ToValidUTF8(term, "")
}

const (
	suggestCacheSize = 2000
	suggestCacheTTL  = 5 * time.Minute
	defaultSuggest   = 8
	maxSuggest       = 20
	minPrefixRunes   = 2
	maxPrefixRunes   = 64
)

// likeEscaper escapes the LIKE wildcards so a typed "50%" matches literally.
var likeEscaper = strings.NewReplacer(`\`, `\\`, `%`, `\%`, `_`, `\_`)

// Suggest returns title completions for a prefix, most important first, from
// the small search_suggestions table. Autocomplete must never get in the way of
// searching, so any failure (including the table not existing yet) yields an
// empty list instead of an error.
func (c *Handler) Suggest(ctx context.Context, req *searcher.SuggestRequest) (*searcher.SuggestResponse, error) {
	prefix := strings.ToLower(normaliseQuery(req.GetPrefix()))
	if r := []rune(prefix); len(r) > maxPrefixRunes {
		prefix = string(r[:maxPrefixRunes])
	}
	if len([]rune(prefix)) < minPrefixRunes {
		return &searcher.SuggestResponse{}, nil
	}
	limit := int(req.GetLimit())
	if limit <= 0 {
		limit = defaultSuggest
	}
	if limit > maxSuggest {
		limit = maxSuggest
	}

	key := fmt.Sprintf("%s|%d", prefix, limit)
	terms, _, err := c.suggestions.do(ctx, key, func() ([]string, error) {
		ctx, cancel := context.WithTimeout(ctx, time.Second)
		defer cancel()
		rows, err := c.db.QueryContext(ctx, `
			SELECT term FROM search_suggestions
			WHERE term_lc LIKE $1 ESCAPE '\'
			ORDER BY weight DESC, term
			LIMIT $2`, likeEscaper.Replace(prefix)+"%", limit)
		if err != nil {
			return nil, err
		}
		defer rows.Close()
		var out []string
		for rows.Next() {
			var t string
			if err := rows.Scan(&t); err != nil {
				return nil, err
			}
			out = append(out, strings.ToValidUTF8(t, ""))
		}
		return out, rows.Err()
	})
	if err != nil {
		slog.Debug("suggest lookup failed", slog.Any("error", err))
		return &searcher.SuggestResponse{}, nil
	}
	return &searcher.SuggestResponse{Suggestions: terms}, nil
}

func (c *Handler) GetHealth(ctx context.Context, req *searcher.HealthRequest) (*searcher.HealthResponse, error) {
	// Check database connection
	if err := c.db.PingContext(ctx); err != nil {
		return &searcher.HealthResponse{
			Healthy: false,
			Message: fmt.Sprintf("database unhealthy: %v", err),
		}, nil
	}

	// Index counts are cached briefly and the page count is a planner estimate:
	// an exact COUNT(*) over SeenPages is a full scan of a multi-GB table.
	pagesCount, pagerankCount := c.health.get(ctx, c.db)

	message := "searcher operational"
	if pagerankCount == 0 {
		message = "no PageRank data available (degraded)"
	}

	return &searcher.HealthResponse{
		Healthy:         true,
		Message:         message,
		PagesIndexed:    pagesCount,
		PagerankResults: pagerankCount,
	}, nil
}
