package graph

import (
	"context"
	"testing"
	"webcrawler/cmd/spider/pkg/site"

	"github.com/stretchr/testify/require"
)

func Test_Graph(t *testing.T) {
	ctx := context.Background()
	tests := []struct {
		name   string
		input  Graph
		output Graph
	}{
		{
			name:   "nil test",
			input:  nil,
			output: nil,
		},
		{
			name: "basic cycle all nodes should have a ProminenceValue of 1",
			input: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page3"},
					ProminenceValue: 0,
				},
				"page3": {
					Links:           []string{"page4"},
					ProminenceValue: 0,
				},
				"page4": {
					Links:           []string{"page1"},
					ProminenceValue: 0,
				},
			},
			output: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: HitScore,
				},
				"page2": {
					Links:           []string{"page3"},
					ProminenceValue: HitScore,
				},
				"page3": {
					Links:           []string{"page4"},
					ProminenceValue: HitScore,
				},
				"page4": {
					Links:           []string{"page1"},
					ProminenceValue: HitScore,
				},
			},
		},
		{
			name: "Some pages not liking",
			input: map[string]*site.Page{
				"page1": {
					Links: []string{"page2"},
				},
				"page2": {
					Links: []string{"page3"},
				},
				"page3": {
					Links: []string{"page-4"},
				},
				"page4": {
					Links: []string{"page-1"},
				},
			},
			output: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page3"},
					ProminenceValue: 1,
				},
				"page3": {
					Links:           []string{"page-4"},
					ProminenceValue: 1,
				},
				"page4": {
					Links:           []string{"page-1"},
					ProminenceValue: 0,
				},
			},
		},
		{
			name: "Two pages linking rest not",
			input: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page3", "page1"},
					ProminenceValue: 0,
				},
				"page3": {
					Links:           []string{"page4", "page1"},
					ProminenceValue: 0,
				},
				"page4": {
					Links:           []string{"page1"},
					ProminenceValue: 0,
				},
			},
			output: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: HitScore * 3,
				},
				"page2": {
					Links:           []string{"page3"},
					ProminenceValue: HitScore,
				},
				"page3": {
					Links:           []string{"page4"},
					ProminenceValue: HitScore,
				},
				"page4": {
					Links:           []string{"page1"},
					ProminenceValue: HitScore,
				},
			},
		},
		{
			name: "two links on the same page should have the same score",
			input: map[string]*site.Page{
				"page1": {
					Links:           []string{"page2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page1", "page1"},
					ProminenceValue: 0,
				},
			},
			output: map[string]*site.Page{
				"page1": {
					ProminenceValue: HitScore,
				},
				"page2": {
					ProminenceValue: HitScore,
				},
			},
		},
		{
			name: "No pages linking",
			input: map[string]*site.Page{
				"page1": {
					Links:           []string{"page-2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page-3"},
					ProminenceValue: 0,
				},
				"page3": {
					Links:           []string{"page-4"},
					ProminenceValue: 0,
				},
				"page4": {
					Links:           []string{"page-1"},
					ProminenceValue: 0,
				},
			},
			output: map[string]*site.Page{
				"page1": {
					Links:           []string{"page-2"},
					ProminenceValue: 0,
				},
				"page2": {
					Links:           []string{"page-3"},
					ProminenceValue: 0,
				},
				"page3": {
					Links:           []string{"page-4"},
					ProminenceValue: 0,
				},
				"page4": {
					Links:           []string{"page-1"},
					ProminenceValue: 0,
				},
			},
		},
	}

	t.Parallel()
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			output, err := Traverse(ctx, test.input)
			require.NoError(t, err)
			for i, page := range output {
				require.Equal(t, test.output[i].ProminenceValue, page.ProminenceValue)
			}
		})
	}
}
