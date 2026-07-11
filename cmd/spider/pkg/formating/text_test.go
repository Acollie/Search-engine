package formating

import (
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
)

func TestFetchLinks(t *testing.T) {
	link := "http://www.alexcollie.com/"

	t.Run("Test basic", func(t *testing.T) {
		_, resp, err := site.NewPage(link)
		links, err := GetLinks(link, resp)
		require.NoError(t, err)
		require.Equal(t, len(links) > 0, true)

	})

}

func TestLinkResolve(t *testing.T) {
	url := resolveURL("http://www.example.com/", "test")
	require.Equal(t, url, "http://www.example.com/test", "Resolving relative URL failed")
	url = resolveURL("http://www.example.com/", "/test")
	require.Equal(t, url, "http://www.example.com/test", "Resolving absolute URL failed")

	// Test with another base URL
	url = resolveURL("https://www.anotherexample.com/", "/sample")
	require.Equal(t, url, "https://www.anotherexample.com/sample", "Resolving absolute URL with https base URL failed")

	// Test with empty path
	url = resolveURL("https://www.anotherexample.com/", "")
	require.Equal(t, url, "https://www.anotherexample.com/", "Resolving with empty path failed")

	// Test with path that has a leading slash and subdirectory
	url = resolveURL("https://www.anotherexample.com", "/a/b/c")
	require.Equal(t, url, "https://www.anotherexample.com/a/b/c", "Resolving path with subdirectories failed")

	// Test with path without a leading slash and with subdirectory
	url = resolveURL("https://www.anotherexample.com", "a/b/c")
	require.Equal(t, url, "https://www.anotherexample.com/a/b/c", "Resolving path without leading slash and with subdirectories failed")

	// Relative paths that merely contain the substring "http" must still be
	// resolved against the base, not returned verbatim.
	url = resolveURL("https://www.example.com/", "/https-explained")
	require.Equal(t, url, "https://www.example.com/https-explained", "Resolving relative path containing 'http' substring failed")
	url = resolveURL("https://www.example.com/", "/search?ref=http://other.com")
	require.Equal(t, url, "https://www.example.com/search?ref=http://other.com", "Resolving relative path with query containing 'http' failed")

	// Protocol-relative URLs should inherit the base scheme.
	url = resolveURL("https://www.example.com/", "//cdn.example.com/a")
	require.Equal(t, url, "https://cdn.example.com/a", "Resolving protocol-relative URL failed")
}

func TestRemoveAnchorsSkipsOnlyMalformedLink(t *testing.T) {
	links := []string{"http://www.example.com/good", "http://%zz-invalid", "http://www.example.com/also-good"}
	result := removeAnchors(links)
	require.Equal(t, []string{"http://www.example.com/good", "http://www.example.com/also-good"}, result, "A single malformed link should not drop the whole list")
}

func TestRemoveInvalidSchemes(t *testing.T) {
	links := []string{
		"http://www.example.com/",
		"https://www.example.com/",
		"mailto:someone@example.com",
		"javascript:void(0)",
		"tel:+123456789",
		"ftp://files.example.com/",
		"",
	}
	result := removeInvalidSchemes(links)
	require.Equal(t, []string{"http://www.example.com/", "https://www.example.com/"}, result, "Non-http(s) schemes and empty links should be filtered out")
}

func TestRemoveLargeWebSitesMatchesSubdomains(t *testing.T) {
	links := []string{
		"https://www.facebook.com/somepage",
		"https://FACEBOOK.COM/other",
		"https://m.youtube.com/watch",
		"https://example.com/page",
	}
	result := removeLargeWebSites(links)
	require.Equal(t, []string{"https://example.com/page"}, result, "www./m. subdomains and case variants of blocked hosts should be filtered")
}

func TestCapLinksRunsAfterDeduplication(t *testing.T) {
	links := make([]string, 0, 150)
	for i := 0; i < 150; i++ {
		links = append(links, "http://www.example.com/dup")
	}
	links = removeDuplicates(links)
	links = capLinks(links, maxLinksPerPage)
	require.Equal(t, []string{"http://www.example.com/dup"}, links, "Deduplication before capping should leave the single unique link")
}

func TestRemoveDepthLinks(t *testing.T) {
	tests := []struct {
		url      string
		expected bool
	}{
		{"http://www.example.com/", true},
		{"http://www.example.com/test", true},
		{"http://www.example.com/test/test", true},
		{"http://www.example.com/test/test/test", true},
		{"http://www.example.com/test/test/test/test", true},
		{"http://www.example.com/test/test/test/test/test", true},
		{"http://www.example.com/test/test/test/test/test/test", false},
	}
	t.Run("Test basic", func(t *testing.T) {
		for _, test := range tests {
			result := testDepthLink(test.url, 5)
			require.Equalf(t, result, test.expected, "Removing depth links failed %s", test.url)
		}

	})
}

func TestRemoveDuplicates(t *testing.T) {
	links := []string{"http://www.example.com/", "http://www.example.com/", "http://www.example.com/test", "http://www.example.com/test"}
	links = removeDuplicates(links)
	require.Equal(t, len(links), 2, "Removing duplicates failed")
}

func TestRemoveAnchors(t *testing.T) {
	links := []string{"http://www.example.com/#", "http://www.example.com/test#"}
	links = removeAnchors(links)
	require.Equal(t, len(links), 2, "Removing anchors failed")
}
