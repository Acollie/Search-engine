package handler

import (
	"net/url"
	"regexp"
	"strings"
	"time"
	grpcClient "webcrawler/cmd/frontend/grpc"
)

const (
	matchStart = ''
	matchEnd   = ''

	maxQueryLen = 512
)

// Segment is a run of snippet text; Match is true for highlighted terms.
type Segment struct {
	Text  string `json:"text"`
	Match bool   `json:"match"`
}

// snippetSegments splits a marker-annotated snippet into segments. It is
// tolerant of unbalanced markers: a repeated start is ignored, a stray end is
// ignored, and an unterminated match runs to the end of the text. Marker
// characters never appear in the output.
func snippetSegments(s string) []Segment {
	segs := []Segment{}
	var cur strings.Builder
	in := false
	flush := func() {
		if cur.Len() > 0 {
			segs = append(segs, Segment{Text: cur.String(), Match: in})
			cur.Reset()
		}
	}
	for _, r := range s {
		switch r {
		case matchStart:
			if !in {
				flush()
				in = true
			}
		case matchEnd:
			if in {
				flush()
				in = false
			}
		default:
			cur.WriteRune(r)
		}
	}
	flush()
	return segs
}

func stripMarkers(s string) string {
	return strings.Map(func(r rune) rune {
		if r == matchStart || r == matchEnd {
			return -1
		}
		return r
	}, s)
}

var (
	languageRe = regexp.MustCompile(`^[a-z]{2,3}(-[a-z0-9]{2,8})?$`)
	domainRe   = regexp.MustCompile(`^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$`)
)

// sinceFromRelative converts day|week|month|year to a unix time; 0 if unknown.
//
// The cutoff is rounded down to the hour. It becomes part of the searcher's
// cache key, so a cutoff computed from the current second would be different on
// every request and the cache could never hit for a recency-filtered search.
func sinceFromRelative(v string, now time.Time) int64 {
	now = now.Truncate(time.Hour)
	switch v {
	case "day":
		return now.AddDate(0, 0, -1).Unix()
	case "week":
		return now.AddDate(0, 0, -7).Unix()
	case "month":
		return now.AddDate(0, -1, 0).Unix()
	case "year":
		return now.AddDate(-1, 0, 0).Unix()
	}
	return 0
}

// parseFilters validates and whitelists the filter query params. Anything that
// does not validate is silently dropped (treated as "no filter").
func parseFilters(q url.Values, now time.Time) grpcClient.SearchFilters {
	var f grpcClient.SearchFilters
	if l := strings.ToLower(strings.TrimSpace(q.Get("language"))); languageRe.MatchString(l) {
		f.Language = l
	}
	if d := strings.ToLower(strings.TrimSpace(q.Get("domain"))); len(d) <= 253 && domainRe.MatchString(d) {
		f.Domain = d
	}
	f.SinceUnix = sinceFromRelative(strings.ToLower(strings.TrimSpace(q.Get("since"))), now)
	return f
}
