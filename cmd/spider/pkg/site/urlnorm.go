package site

import (
	"net/url"
	"strings"
)

// trackingParams are query parameters that identify the referrer or campaign
// rather than the content. Two URLs differing only by these serve the same page,
// so they are dropped to avoid indexing the same document many times over.
var trackingParams = map[string]bool{
	"utm_source":   true,
	"utm_medium":   true,
	"utm_campaign": true,
	"utm_term":     true,
	"utm_content":  true,
	"utm_id":       true,
	"gclid":        true,
	"fbclid":       true,
	"msclkid":      true,
	"mc_cid":       true,
	"mc_eid":       true,
	"igshid":       true,
	"ref_src":      true,
	"_ga":          true,
	"yclid":        true,
}

// NormalizeURL returns a canonical form of rawURL for de-duplication.
//
// It lowercases the scheme and host, drops the fragment, removes the default
// port, strips tracking parameters, sorts the remaining query parameters, and
// removes a trailing slash from non-root paths. Without this the crawler treats
// every URL variant of a page as a distinct document.
//
// The input is returned unchanged if it cannot be parsed, so callers never lose
// a URL to a normalization failure.
func NormalizeURL(rawURL string) string {
	trimmed := strings.TrimSpace(rawURL)
	if trimmed == "" {
		return rawURL
	}

	u, err := url.Parse(trimmed)
	if err != nil || u.Host == "" {
		return rawURL
	}

	u.Scheme = strings.ToLower(u.Scheme)
	u.Host = strings.ToLower(u.Host)

	// Fragments are client-side only and never change the fetched document.
	u.Fragment = ""
	u.RawFragment = ""

	// Drop redundant default ports so :443 and the bare host collapse together.
	if (u.Scheme == "http" && u.Port() == "80") || (u.Scheme == "https" && u.Port() == "443") {
		u.Host = u.Hostname()
	}

	if u.RawQuery != "" {
		q := u.Query()
		for key := range q {
			if trackingParams[strings.ToLower(key)] {
				q.Del(key)
			}
		}
		// url.Values.Encode sorts by key, giving a stable parameter order so
		// ?a=1&b=2 and ?b=2&a=1 normalize to the same string.
		u.RawQuery = q.Encode()
	}

	// "/about/" and "/about" are the same page; the root path keeps its slash.
	if len(u.Path) > 1 {
		u.Path = strings.TrimRight(u.Path, "/")
		if u.Path == "" {
			u.Path = "/"
		}
	}

	return u.String()
}

// NormalizeURLs normalizes each URL and removes duplicates, preserving order.
// Used before queueing extracted links so variants of one page are enqueued once.
func NormalizeURLs(urls []string) []string {
	seen := make(map[string]bool, len(urls))
	out := make([]string, 0, len(urls))

	for _, raw := range urls {
		n := NormalizeURL(raw)
		if n == "" || seen[n] {
			continue
		}
		seen[n] = true
		out = append(out, n)
	}

	return out
}
