package site

import (
	"fmt"
	"github.com/anaskhan96/soup"
	"net/http"
	"net/url"
	"webcrawler/queue"
)

func NewPage(fetchURL string) (Page, string, error) {
	resp, err := soup.Get(fetchURL)
	if err != nil {
		return Page{}, "", err
	}
	doc := soup.HTMLParse(resp)
	titleTag := doc.Find("title")
	// checking if title tag exists
	title := ""
	if titleTag.Error == nil {
		// printing the title text
		title = titleTag.Text()
	} else {
		title = "title not found"
	}
	text := doc.FullText()

	baseUrl, _ := url.Parse(fetchURL)
	return Page{
		Url:     fetchURL,
		Title:   title,
		Body:    text,
		BaseURL: baseUrl.Hostname(),
	}, resp, nil
}
func NewWebsite(urlFull string, links []queue.Message) Website {
	hostName, _ := url.Parse(urlFull)
	return Website{
		Url:             hostName.Hostname(),
		Links:           resolveMessageIntoLinks(links),
		ProminenceValue: 0,
	}
}
func resolveMessageIntoLinks(messages []queue.Message) []string {
	var links []string
	for _, message := range messages {
		links = append(links, message.Url)
	}
	return links
}

func CheckRobots(baseUrl string) (bool, error) {
	fullUrl := baseUrl + "/robots.txt"

	// Create a new GET request
	req, err := http.NewRequest(http.MethodGet, fullUrl, nil)
	if err != nil {
		return false, err
	}

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, fmt.Errorf("request error: %w", err)
	}
	defer resp.Body.Close()

	// Check status code to determine whether robots.txt exists
	if resp.StatusCode == 200 {
		return true, nil
	} else {
		return false, nil
	}
}
