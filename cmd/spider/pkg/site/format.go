package site

import (
	"fmt"
	"github.com/anaskhan96/soup"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"time"
)

const (
	MaxBodyLength    = 10000
	MaxResponseBytes = 10 * 1024 * 1024 // 10MB max response size
)

func NewPage(fetchURL string) (Page, string, error) {
	client := &http.Client{
		Timeout: time.Second * 10,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			// Limit redirects to 5
			if len(via) >= 5 {
				return fmt.Errorf("too many redirects")
			}
			return nil
		},
	}

	// Create request with proper User-Agent
	req, err := http.NewRequest("GET", fetchURL, nil)
	if err != nil {
		return Page{}, "", fmt.Errorf("create request: %w", err)
	}

	// Set User-Agent to identify the crawler
	req.Header.Set("User-Agent", "AlexCollieBot/1.0 (+https://alexcollie.com/bot; crawler@alexcollie.com)")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9")

	resp, err := client.Do(req)
	if err != nil {
		return Page{}, "", fmt.Errorf("get %s", err)
	}

	defer resp.Body.Close()

	// Check Content-Type to avoid parsing non-HTML content
	contentType := resp.Header.Get("Content-Type")
	if contentType != "" && !strings.Contains(strings.ToLower(contentType), "text/html") {
		return Page{}, "", fmt.Errorf("not HTML content: %s", contentType)
	}

	if resp.StatusCode != 200 {
		return Page{}, "", fmt.Errorf("status code error: %d %s", resp.StatusCode, resp.Status)
	}

	// Limit response body size to prevent OOM
	limitedReader := io.LimitReader(resp.Body, MaxResponseBytes)
	body, err := io.ReadAll(limitedReader)

	if err != nil {
		return Page{}, "", err
	}

	// Check if we hit the limit
	if len(body) >= MaxResponseBytes {
		return Page{}, "", fmt.Errorf("response body too large (>%d bytes)", MaxResponseBytes)
	}

	doc := soup.HTMLParse(string(body))
	titleTag := doc.Find("title")
	title := ""
	if titleTag.Error == nil {
		title = titleTag.Text()
	} else {
		title = "title not found"
	}

	baseURL, _ := url.Parse(fetchURL)
	return Page{
		URL:         fetchURL,
		Title:       title,
		Body:        fetchText(&doc),
		BaseURL:     baseURL.Hostname(),
		CrawledDate: uint64(time.Now().Unix()),
		Meta:        fetchMeta(&doc),
	}, string(body), nil
}

func fetchMeta(root *soup.Root) map[string]string {
	metaInformation := make(map[string]string)
	meta := root.FindAll("meta")
	for _, value := range meta {
		name := value.Attrs()["name"]
		content := value.Attrs()["content"]
		if name != "" && content != "" {
			metaInformation[name] = content
		}
	}
	if len(metaInformation) == 0 {
		return map[string]string{}
	}
	return metaInformation
}

func NewWebsite(urlFull string, links []string) Website {
	hostName, _ := url.Parse(urlFull)
	return Website{
		Url:             hostName.Hostname(),
		Links:           links,
		ProminenceValue: 0,
	}
}

// This function gets all of the text from a soup file
func fetchText(root *soup.Root) string {
	res := ""
	for _, node := range root.FindAll("p") {
		res += node.FullText()
	}
	for _, node := range root.FindAll("h1") {
		res += node.FullText()
	}
	for _, node := range root.FindAll("h2") {
		res += node.FullText()
	}
	for _, node := range root.FindAll("div") {
		res += node.FullText()
	}
	for _, node := range root.FindAll("span") {
		res += node.FullText()
	}

	res = strings.ReplaceAll(res, "\n", "")
	res = strings.ReplaceAll(res, "\t", "")
	res = strings.ReplaceAll(res, "\r", "")
	res = strings.ReplaceAll(res, "  ", " ")
	res = strings.ReplaceAll(res, "\u00A0", " ") // Non-breaking space
	res = strings.ReplaceAll(res, "\f", "")      // Form feed
	res = strings.ReplaceAll(res, "\v", "")      // Vertical tab
	res = strings.ReplaceAll(res, "\u200B", "")  // Zero-width space
	res = strings.TrimSpace(res)

	if len(res) < MaxBodyLength {
		return res
	}
	return res[:MaxBodyLength]
}

func stripHTML(text *string) {
	re := regexp.MustCompile("<[^>]*>")
	*text = re.ReplaceAllString(*text, "")

}

func scriptEmptyLines(text *string) {
	re := regexp.MustCompile(`(?m)^\s*$[\r\n]*|<[^>]*>`)
	*text = re.ReplaceAllString(*text, "")

}

func stripJavascript(text *string) {
	re := regexp.MustCompile("(?i)<script[^>]*>(.*?)</script>")
	*text = re.ReplaceAllString(*text, "")
}

func stripCSS(text *string) {
	re := regexp.MustCompile("(?i)<style[^>]*>(.*?)</style>")
	*text = re.ReplaceAllString(*text, "")
}

