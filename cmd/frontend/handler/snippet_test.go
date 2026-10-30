package handler

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestSnippetSegments(t *testing.T) {
	const s, e = "", ""
	tests := []struct {
		name string
		in   string
		want []Segment
	}{
		{"empty", "", []Segment{}},
		{"plain", "hello", []Segment{{"hello", false}}},
		{"balanced", "a " + s + "go" + e + " b", []Segment{{"a ", false}, {"go", true}, {" b", false}}},
		{"adjacent", s + "a" + e + s + "b" + e, []Segment{{"a", true}, {"b", true}}},
		{"unterminated", "x " + s + "go", []Segment{{"x ", false}, {"go", true}}},
		{"stray end", "x" + e + "y", []Segment{{"xy", false}}},
		{"double start", s + "a" + s + "b" + e + "c", []Segment{{"ab", true}, {"c", false}}},
		{"empty match", "a" + s + e + "b", []Segment{{"a", false}, {"b", false}}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := snippetSegments(tt.in)
			assert.Equal(t, tt.want, got)
			for _, g := range got {
				assert.False(t, strings.ContainsAny(g.Text, s+e))
			}
		})
	}
	assert.Equal(t, "a go b", stripMarkers("a "+s+"go"+e+" b"+e))
}

func TestParseFilters(t *testing.T) {
	now := time.Unix(1_700_000_000, 0)
	f := parseFilters(url.Values{"language": {"EN"}, "domain": {"en.wikipedia.org"}, "since": {"week"}}, now)
	assert.Equal(t, "en", f.Language)
	assert.Equal(t, "en.wikipedia.org", f.Domain)
	assert.Equal(t, now.Truncate(time.Hour).AddDate(0, 0, -7).Unix(), f.SinceUnix, "cutoff is rounded to the hour so it is cacheable")

	bad := parseFilters(url.Values{
		"language": {"en; DROP TABLE"}, "domain": {"evil.com/path?x"}, "since": {"1700000000"},
	}, now)
	assert.Equal(t, "", bad.Language)
	assert.Equal(t, "", bad.Domain)
	assert.Equal(t, int64(0), bad.SinceUnix)

	assert.Equal(t, "", parseFilters(url.Values{"domain": {"localhost"}}, now).Domain)
	assert.Equal(t, "", parseFilters(url.Values{"domain": {"a b.com"}}, now).Domain)
	assert.Equal(t, "pt-br", parseFilters(url.Values{"language": {"pt-BR"}}, now).Language)
	for _, v := range []string{"day", "month", "year"} {
		assert.NotZero(t, parseFilters(url.Values{"since": {v}}, now).SinceUnix)
	}
}

type fakeSuggester struct {
	out    []string
	err    error
	called bool
	prefix string
}

func (f *fakeSuggester) Suggest(_ context.Context, p string, _ int32) ([]string, error) {
	f.called, f.prefix = true, p
	return f.out, f.err
}

func doSuggest(h http.Handler, q string) (*httptest.ResponseRecorder, []string) {
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest("GET", "/api/suggest?q="+url.QueryEscape(q), nil))
	var body struct {
		Suggestions []string `json:"suggestions"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &body)
	return rec, body.Suggestions
}

func TestSuggestHandler(t *testing.T) {
	f := &fakeSuggester{out: []string{"golang", "go tour"}}
	h := NewSuggestHandler(f)

	rec, s := doSuggest(h, "g")
	assert.False(t, f.called)
	assert.Equal(t, []string{}, s)
	assert.Contains(t, rec.Body.String(), `"suggestions":[]`)

	rec, s = doSuggest(h, "  go ")
	assert.Equal(t, []string{"golang", "go tour"}, s)
	assert.Equal(t, "go", f.prefix)
	assert.NotEmpty(t, rec.Header().Get("Cache-Control"))

	doSuggest(h, strings.Repeat("x", 200))
	assert.Len(t, []rune(f.prefix), suggestMaxLen)

	f.err = errors.New("boom")
	rec, s = doSuggest(h, "go")
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, []string{}, s)
}

func TestSinceFromRelative_StableWithinTheHour(t *testing.T) {
	a := time.Date(2026, 10, 30, 13, 5, 1, 0, time.UTC)
	b := time.Date(2026, 10, 30, 13, 59, 59, 0, time.UTC)
	c := time.Date(2026, 10, 30, 14, 0, 0, 0, time.UTC)

	for _, v := range []string{"day", "week", "month", "year"} {
		assert.Equal(t, sinceFromRelative(v, a), sinceFromRelative(v, b), "%s must not change within an hour (it keys the search cache)", v)
		assert.NotEqual(t, sinceFromRelative(v, a), sinceFromRelative(v, c), "%s should move on at the next hour", v)
	}
}
