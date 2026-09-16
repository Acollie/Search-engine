package site

import (
	"net/url"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/temoto/robotstxt"
)

func TestNormalizeURL(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
	}{
		{"strips fragment", "https://example.com/a#section", "https://example.com/a"},
		{"lowercases host", "https://EXAMPLE.com/a", "https://example.com/a"},
		{"lowercases scheme", "HTTPS://example.com/a", "https://example.com/a"},
		{"drops default https port", "https://example.com:443/a", "https://example.com/a"},
		{"drops default http port", "http://example.com:80/a", "http://example.com/a"},
		{"keeps non-default port", "https://example.com:8443/a", "https://example.com:8443/a"},
		{"trims trailing slash", "https://example.com/about/", "https://example.com/about"},
		{"keeps root slash", "https://example.com/", "https://example.com/"},
		{"strips utm params", "https://example.com/a?utm_source=x&utm_medium=y", "https://example.com/a"},
		{"strips fbclid", "https://example.com/a?fbclid=abc", "https://example.com/a"},
		{"keeps meaningful params", "https://example.com/a?id=7", "https://example.com/a?id=7"},
		{"sorts params", "https://example.com/a?b=2&a=1", "https://example.com/a?a=1&b=2"},
		{"mixes real and tracking", "https://example.com/a?id=7&utm_source=x", "https://example.com/a?id=7"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			require.Equal(t, tc.want, NormalizeURL(tc.in))
		})
	}
}

func TestNormalizeURLReturnsInputWhenUnparseable(t *testing.T) {
	// A URL we cannot parse must be passed through rather than dropped.
	require.Equal(t, "::not a url", NormalizeURL("::not a url"))
	require.Equal(t, "relative/path", NormalizeURL("relative/path"))
}

func TestNormalizeURLsDeduplicates(t *testing.T) {
	in := []string{
		"https://example.com/a",
		"https://example.com/a/",
		"https://example.com/a#top",
		"https://example.com/a?utm_source=news",
		"https://example.com/b",
	}

	got := NormalizeURLs(in)

	// The first four are all the same page once canonicalized.
	require.Equal(t, []string{"https://example.com/a", "https://example.com/b"}, got)
}

func TestRobotsPathIncludesQuery(t *testing.T) {
	// Rules can match on the query string, so it must be part of the tested path.
	u := mustParse(t, "https://en.wikipedia.org/w/index.php?title=Rough_Collie&action=edit")
	require.Equal(t, "/w/index.php?title=Rough_Collie&action=edit", robotsPath(u))

	u = mustParse(t, "https://example.com")
	require.Equal(t, "/", robotsPath(u))
}

func mustParse(t *testing.T, raw string) *url.URL {
	t.Helper()
	u, err := url.Parse(raw)
	require.NoError(t, err)
	return u
}

// TestCanCrawlHonoursDisallowPerPath is the regression test for the cache bug
// that indexed ~294k disallowed Wikipedia /w/ URLs: one parsed rule group must
// give different answers for different paths on the same host.
func TestCanCrawlHonoursDisallowPerPath(t *testing.T) {
	robotsTxt := "User-agent: *\nAllow: /w/load.php?\nDisallow: /w/\n"

	robots, err := robotstxt.FromString(robotsTxt)
	require.NoError(t, err)
	group := robots.FindGroup("SearchEngineBot")

	allowed, err := CanCrawl(group, "https://en.wikipedia.org/wiki/Rough_Collie")
	require.NoError(t, err)
	require.True(t, allowed, "article paths should be crawlable")

	for _, blocked := range []string{
		"https://en.wikipedia.org/w/index.php?title=Rough_Collie&action=edit",
		"https://en.wikipedia.org/w/index.php?title=Rough_Collie&action=history",
		"https://en.wikipedia.org/w/index.php?title=Rough_Collie&printable=yes",
		"https://en.wikipedia.org/w/index.php?title=Rough_Collie&oldid=1346244163",
	} {
		allowed, err := CanCrawl(group, blocked)
		require.NoError(t, err)
		require.False(t, allowed, "expected %s to be disallowed by /w/", blocked)
	}
}

func TestCanCrawlNilGroupAllowsEverything(t *testing.T) {
	allowed, err := CanCrawl(nil, "https://example.com/anything")
	require.NoError(t, err)
	require.True(t, allowed)
}
