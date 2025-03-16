package config

import (
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
	"net/url"
)

type Config struct {
	Website    map[string]bool
	Depth      int
	Relational bool
	LinkDepth  int
}
type rawIgnoreList struct {
	Websites   []string `yaml:"websites"`
	Relational bool     `yaml:"relational"`
	Depth      int      `yaml:"depth"`
	LinkDepth  int      `yaml:"link-depth"`
}

func Fetch() *Config {
	yamlFile, err := ioutil.ReadFile("config.yml")
	if err != nil {
		log.Printf("yamlFile.Get err #%v ", err)
	}
	raw := &rawIgnoreList{}
	err = yaml.Unmarshal(yamlFile, raw)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	conf := &Config{
		Website:    make(map[string]bool),
		Relational: raw.Relational,
		Depth:      raw.Depth,
		LinkDepth:  raw.LinkDepth,
	}

	for _, website := range raw.Websites {
		// Extract host from the url
		parsedUrl, err := url.Parse(website)
		if err != nil {
			log.Printf("Failed to parse URL from yaml file: %v, err: %v", website, err)
			continue
		}
		conf.Website[parsedUrl.Host] = true
	}
	return conf
}

func (i *Config) Ignore(urlStr string) bool {

	parsedURL, err := url.Parse(urlStr)
	if err != nil {
		log.Printf("Url parse error %v ", err)
		return false
	}

	_, isIgnored := i.Website[parsedURL.Host]
	return isIgnored
}
