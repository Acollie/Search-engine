package formating

import (
	"net/url"
	"path"
	"strings"

	"github.com/anaskhan96/soup"
)

const (
	MaxDepth        = 8
	maxLinksPerPage = 100
)

func GetLinks(fetchingURL string, body string) ([]string, error) {
	var links []string
	doc := soup.HTMLParse(body)
	for _, link := range doc.FindAll("a") {
		link := resolveURL(fetchingURL, link.Attrs()["href"])
		links = append(links, link)
	}

	links = removeAnchors(links)
	links = removeDuplicates(links)
	links = removeInvalidSchemes(links)
	links = removeNonHTMLLinks(links)
	links = removeLargeWebSites(links)
	links = removeDepthLinks(links)
	links = capLinks(links, maxLinksPerPage)

	return links, nil
}

func resolveURL(baseURL, relURL string) string {
	ref, err := url.Parse(relURL)
	if err != nil {
		return ""
	}
	if ref.IsAbs() {
		return ref.String()
	}
	base, err := url.Parse(baseURL)
	if err != nil {
		return ""
	}
	return base.ResolveReference(ref).String()
}

func removeDuplicates(links []string) []string {
	encountered := map[string]bool{}
	var result []string

	for v := range links {
		if !encountered[links[v]] {
			encountered[links[v]] = true
			result = append(result, links[v])
		}
	}
	return result
}

func removeDepthLinks(links []string) []string {
	var result []string
	for _, link := range links {
		if testDepthLink(link, MaxDepth) {
			result = append(result, link)
		}

	}
	return result
}

func testDepthLink(link string, maxDepth int) bool {
	res := strings.Split(link, "/")
	return len(res) <= maxDepth+3
}

func removeAnchors(links []string) []string {
	var result []string
	for _, link := range links {
		u, err := url.Parse(link)
		if err != nil {
			continue
		}
		u.Fragment = ""
		result = append(result, u.String())
	}
	return result
}

// removeInvalidSchemes keeps only http(s) links, dropping mailto:, tel:,
// javascript:, ftp:, data:, and unresolvable (empty-scheme) links.
func removeInvalidSchemes(links []string) []string {
	var result []string
	for _, link := range links {
		u, err := url.Parse(link)
		if err != nil {
			continue
		}
		scheme := strings.ToLower(u.Scheme)
		if scheme != "http" && scheme != "https" {
			continue
		}
		result = append(result, link)
	}
	return result
}

func removeNonHTMLLinks(links []string) []string {
	blocked := map[string]struct{}{
		".pdf": {}, ".doc": {}, ".docx": {}, ".xls": {}, ".xlsx": {},
		".ppt": {}, ".pptx": {}, ".zip": {}, ".tar": {}, ".gz": {},
		".mp3": {}, ".mp4": {}, ".avi": {}, ".mov": {}, ".wmv": {},
		".jpg": {}, ".jpeg": {}, ".png": {}, ".gif": {}, ".svg": {},
		".css": {}, ".js": {}, ".xml": {}, ".json": {}, ".csv": {},
		".exe": {}, ".dmg": {}, ".iso": {}, ".bin": {},
	}

	var result []string
	for _, link := range links {
		u, err := url.Parse(link)
		if err != nil {
			continue
		}
		ext := strings.ToLower(path.Ext(u.Path))
		if _, blocked := blocked[ext]; !blocked {
			result = append(result, link)
		}
	}
	return result
}

// removeLargeWebSites drops links to high-traffic sites we don't want to
// crawl, matching both the bare domain and any of its subdomains
// (e.g. www.facebook.com, m.youtube.com).
func removeLargeWebSites(links []string) []string {
	largeWebsites := map[string]struct{}{
		"facebook.com": {}, "twitter.com": {}, "instagram.com": {}, "youtube.com": {},
		"linkedin.com": {}, "pinterest.com": {}, "tumblr.com": {}, "reddit.com": {},
		"snapchat.com": {}, "whatsapp.com": {}, "quora.com": {}, "flickr.com": {},
		"vimeo.com": {}, "medium.com": {}, "vk.com": {}, "soundcloud.com": {},
	}

	var result []string
	for _, link := range links {
		parsed, err := url.Parse(link)
		if err != nil {
			continue
		}
		host := strings.ToLower(parsed.Hostname())
		if isBlockedHost(host, largeWebsites) {
			continue
		}
		result = append(result, link)
	}
	return result
}

func isBlockedHost(host string, blocked map[string]struct{}) bool {
	for domain := range blocked {
		if host == domain || strings.HasSuffix(host, "."+domain) {
			return true
		}
	}
	return false
}

func capLinks(links []string, max int) []string {
	if len(links) > max {
		return links[:max]
	}
	return links
}
