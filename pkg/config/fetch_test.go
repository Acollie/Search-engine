package config

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestIgnoreList(t *testing.T) {
	conf := Config{
		Website: map[string]bool{
			"github.com": true,
		},
	}
	url := "https://github.com"
	require.Equal(t, conf.Ignore(url), true)
	require.Equal(t, conf.Ignore("https://alexcollie.com"), false)
}
