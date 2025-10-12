package config

import (
	"sync"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestIgnoreList(t *testing.T) {
	s := sync.Map{}
	conf := Config{
		Website: s,
	}
	conf.Website.Store("github.com", true)
	url := "https://github.com"
	require.True(t, conf.Ignore(url))
	require.False(t, conf.Ignore("https://alexcollie.com"))
}
