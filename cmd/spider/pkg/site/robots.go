package site

import (
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/temoto/robotstxt"

	"webcrawler/cmd/spider/pkg/config"
)

// robotsPath returns the path used to test a URL against robots.txt rules.
// The query string is included because robots.txt rules can match on it
// (Wikipedia, for example, has "Disallow: /w/" alongside "Allow: /w/load.php?").
func robotsPath(u *url.URL) string {
	path := u.EscapedPath()
	if path == "" {
		path = "/"
	}
	if u.RawQuery != "" {
		path += "?" + u.RawQuery
	}
	return path
}

// FetchRobotsGroup fetches and parses robots.txt for the host of targetURL and
// returns the rule group matching our user agent.
//
// A nil group with a nil error means no rules apply (no robots.txt), i.e.
// everything on that host is crawlable. Callers should cache the returned group
// per host and test each individual URL against it via CanCrawl -- caching a
// single allow/deny verdict per host is incorrect and lets disallowed paths through.
func FetchRobotsGroup(targetURL string) (*robotstxt.Group, error) {
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		return nil, err
	}
	if parsedURL.Host == "" {
		return nil, fmt.Errorf("robots: URL has no host: %q", targetURL)
	}

	client := &http.Client{
		Timeout: time.Second * 10,
	}

	resp, err := client.Get(fmt.Sprintf("%s://%s/robots.txt", parsedURL.Scheme, parsedURL.Host))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// No robots.txt means no restrictions.
	if resp.StatusCode == http.StatusNotFound {
		return nil, nil
	}

	robots, err := robotstxt.FromResponse(resp)
	if err != nil {
		return nil, err
	}

	return robots.FindGroup(config.UserAgent), nil
}

// CanCrawl reports whether targetURL is allowed by the given rule group.
// A nil group allows everything.
func CanCrawl(group *robotstxt.Group, targetURL string) (bool, error) {
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		return false, err
	}
	if group == nil {
		return true, nil
	}
	return group.Test(robotsPath(parsedURL)), nil
}

// FetchRobots reports whether a single URL may be crawled, fetching robots.txt
// each time. Prefer FetchRobotsGroup plus CanCrawl with a per-host cache; this
// helper exists for one-off checks and refetches robots.txt on every call.
func FetchRobots(baseUrl string) (bool, error) {
	return canVisitURL(baseUrl)
}

func canVisitURL(targetURL string) (bool, error) {
	group, err := FetchRobotsGroup(targetURL)
	if err != nil {
		return false, err
	}
	return CanCrawl(group, targetURL)
}
