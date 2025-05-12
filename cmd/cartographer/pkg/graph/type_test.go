package graph

import (
	"github.com/stretchr/testify/require"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
)

func Test_new(t *testing.T) {
	tests := []struct {
		name     string
		input    []*site.Page
		expected Graph
	}{
		{
			name:     "empty input",
			input:    nil,
			expected: Graph{},
		},
		{
			name: "one site",
			input: []*site.Page{
				{
					Url:  "example.com",
					Body: "foo bar",
				},
			},
			expected: map[string]*site.Page{
				"example.com": {
					Body: "foo bar",
					Url:  "example.com",
				},
			},
		},
		{
			name: "three sites",
			input: []*site.Page{
				{
					Url:  "example.com",
					Body: "foo bar",
				},
				{
					Url:  "alexcollie.com",
					Body: "alex collie",
				},
				{
					Url:  "collie.codes",
					Body: "collie codes",
				},
			},
			expected: map[string]*site.Page{
				"example.com": {
					Body: "foo bar",
					Url:  "example.com",
				},
				"alexcollie.com": {
					Url:  "alexcollie.com",
					Body: "alex collie",
				},
				"collie.codes": {
					Url:  "collie.codes",
					Body: "collie codes",
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			out := New(tt.input)
			require.Equal(t, out, tt.expected)
		})
	}
}
