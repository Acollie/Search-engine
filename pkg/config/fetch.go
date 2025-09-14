package config

import (
	"log"
	"net/url"
	"os"
	"sync"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Website    sync.Map // using a normal map will cause a race condition
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
	yamlFile, err := os.ReadFile("config.yml")
	if err != nil {
		log.Printf("yamlFile.Get err #%v ", err)
	}
	raw := &rawIgnoreList{}
	err = yaml.Unmarshal(yamlFile, raw)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	conf := &Config{
		Website:    sync.Map{},
		Relational: raw.Relational,
		Depth:      raw.Depth,
		LinkDepth:  raw.LinkDepth,
	}

	for _, website := range raw.Websites {
		parsedUrl, err := url.Parse(website)
		if err != nil {
			log.Printf("Failed to parse URL from yaml file: %v, err: %v", website, err)
			continue
		}
		conf.Website.Store(parsedUrl.Host, true)
	}
	return conf
}

func (i *Config) Ignore(urlStr string) bool {

	parsedURL, err := url.Parse(urlStr)
	if err != nil {
		log.Printf("Url parse error %v ", err)
		return false
	}

	_, isIgnored := i.Website.Load(parsedURL.Host)
	return isIgnored
}
