package graph

import (
	"testing"
	"webcrawler/cmd/spider/pkg/site"

	"github.com/stretchr/testify/require"
)

func Test_New(t *testing.T) {
	t.Run("ensure can build graph", func(t *testing.T) {
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
						URL:  "example.com",
						Body: "foo bar",
					},
				},
				expected: map[string]*site.Page{
					"example.com": {
						Body: "foo bar",
						URL:  "example.com",
					},
				},
			},
			{
				name: "three sites",
				input: []*site.Page{
					{
						URL:  "example.com",
						Body: "foo bar",
					},
					{
						URL:  "alexcollie.com",
						Body: "alex collie",
					},
					{
						URL:  "collie.codes",
						Body: "collie codes",
					},
				},
				expected: map[string]*site.Page{
					"example.com": {
						Body: "foo bar",
						URL:  "example.com",
					},
					"alexcollie.com": {
						URL:  "alexcollie.com",
						Body: "alex collie",
					},
					"collie.codes": {
						URL:  "collie.codes",
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
	})
}
