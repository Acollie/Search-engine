package formating

import (
	"net/url"
	"path"
	"strings"

	"github.com/anaskhan96/soup"
)

const (
	MaxDepth = 8
)

func GetLinks(fetchingURL string, body string) ([]string, error) {
	var links []string
	doc := soup.HTMLParse(body)
	for _, link := range doc.FindAll("a") {
		link := resolveURL(fetchingURL, link.Attrs()["href"])
		links = append(links, link)
	}

	links = removeLargeWebSites(links)
	links = removeAnchors(links)
	links = removeDuplicates(links)
	links = removeMailTo(links)
	links = removeNonHTMLLinks(links)
	links = removeDepthLinks(links)

	return links, nil
}

func resolveURL(baseURL, relURL string) string {
	if strings.Contains(relURL, "http") {
		return relURL
	}
	base, err := url.Parse(baseURL)
	if err != nil {
		return ""
	}
	ref, err := url.Parse(relURL)
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
			return nil
		}
		u.Fragment = ""
		result = append(result, u.String())
	}
	return result
}

func removeMailTo(links []string) []string {
	var result []string
	for _, link := range links {
		u, err := url.Parse(link)
		if err != nil {
			return nil
		}
		if u.Scheme == "mailto" {
			continue
		}
		result = append(result, u.String())
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
		skip := false
		if err == nil && parsed != nil {
			if _, ok := largeWebsites[parsed.Hostname()]; ok {
				skip = true
			}
		}
		if !skip {
			result = append(result, link)
			if len(result) >= 100 {
				break
			}
		}
	}
	return result
}
