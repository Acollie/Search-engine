package formating

import (
	"github.com/anaskhan96/soup"
	"net/url"
	"path"
	"strings"
	"webcrawler/queue"
)

func GetLinks(fetchingURL string, body string) ([]queue.Message, error) {
	var links []string
	doc := soup.HTMLParse(body)
	for _, link := range doc.FindAll("a") {
		link := resolveURL(fetchingURL, link.Attrs()["href"])
		links = append(links, link)
	}

	links = removeAnchors(links)
	links = removeDuplicates(links)
	links = removeMailTo(links)
	convertedLinks := convertLinksToQueueMessage(links)

	return convertedLinks, nil
}
func convertLinksToQueueMessage(links []string) []queue.Message {
	messages := []queue.Message{}
	for _, link := range links {
		message := queue.Message{Url: link}
		messages = append(messages, message)
	}
	return messages
}

func resolveURL(baseURL, relURL string) string {
	if strings.Contains(relURL, "http") {
		return relURL
	}
	u, err := url.Parse(baseURL)
	if err != nil {
		return ""
	}
	u.Path = path.Join(u.Path, relURL)
	return u.String()
}

func removeDuplicates(links []string) []string {
	encountered := map[string]bool{}
	var result []string
	for v := range links {
		if encountered[links[v]] == true {
		} else {
			encountered[links[v]] = true
			result = append(result, links[v])
		}
	}
	return result
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
