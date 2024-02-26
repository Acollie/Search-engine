package site

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/temoto/robotstxt"
)

func FetchRobots(baseUrl string) (bool, error) {
	return canVisitURL(baseUrl)

}

func canVisitURL(targetURL string) (bool, error) {
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		return false, err
	}

	resp, err := http.Get(fmt.Sprintf("%s://%s/robots.txt", parsedURL.Scheme, parsedURL.Host))
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	robots, err := robotstxt.FromResponse(resp)
	if err != nil {
		return false, err
	}

	return robots.TestAgent(parsedURL.Path, "webcrawler"), nil

}
