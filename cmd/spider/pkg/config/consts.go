package config

const (
	// UserAgent identifies this crawler honestly, with a contact URL so site
	// owners can find out who is crawling them and how to block us.
	//
	// This previously impersonated Googlebot. Beyond being dishonest, it made
	// robots.txt handling wrong: sites that grant Googlebot broader access than
	// "*" would have had those Google-specific rules applied to us.
	UserAgent = "SearchEngineBot/1.0 (+https://search.collie.codes/about)"
)
