package site

import (
	"fmt"
	"github.com/anaskhan96/soup"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"
	"webcrawler/queue"
)

func NewPage(fetchURL string) (Page, string, error) {
	client := &http.Client{
		Timeout: time.Second * 10, // Set timeout to 10 seconds
	}

	resp, err := client.Get(fetchURL)
	if err != nil {
		return Page{}, "", fmt.Errorf("get %s", err)
	}

	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return Page{}, "", fmt.Errorf("status code error: %d %s", resp.StatusCode, resp.Status)
	}

	// response into string
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return Page{}, "", err
	}

	doc := soup.HTMLParse(string(body))
	titleTag := doc.Find("title")
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
	}, string(body), nil
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
