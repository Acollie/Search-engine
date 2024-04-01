package site

type Page struct {
	Url     string `dynamodbav:"PageURL" sql:"url"`
	Title   string `dynamodbav:"title" sql:"title"`
	Body    string `dynamodbav:"body" sql:"body"`
	BaseURL string `dynamodbav:"BaseURL" sql:"baseUrl"`
}

type Website struct {
	Url             string   `dynamodbav:"BaseURL" sql:"baseurl"`
	Links           []string `dynamodbav:"links" sql:"links"`
	ProminenceValue float64  `dynamodbav:"promanceValue" sql:"promanceValue"`
}
