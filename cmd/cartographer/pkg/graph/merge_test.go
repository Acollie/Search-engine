package graph

import (
	"testing"
	"webcrawler/cmd/spider/pkg/site"

	"github.com/stretchr/testify/require"
)

func Test_Merge(t *testing.T) {

	tests := []struct {
		name          string
		graphs        []Graph
		expectedGraph Graph
		expectedErr   error
	}{
		{
			name:        "nil case ",
			expectedErr: ErrNoGraphs,
			graphs:      nil,
		},
		{
			name:        "base case ",
			expectedErr: ErrNoGraphs,
			graphs:      []Graph{},
		},
		{
			name:        "one graph test",
			expectedErr: nil,
			graphs: []Graph{
				{
					"test": &site.Page{
						Url:             "test",
						ProminenceValue: 1,
					},
				},
			},
			expectedGraph: Graph{
				"test": &site.Page{
					Url:             "test",
					ProminenceValue: 1,
				},
			},
		},
		{
			name:        "two graph test",
			expectedErr: nil,
			graphs: []Graph{
				{
					"Site1": &site.Page{
						Url:             "test",
						ProminenceValue: 1,
					},
					"Site2": &site.Page{
						Url:             "test",
						ProminenceValue: 1,
					},
				},
				{
					"Site1": &site.Page{
						Url:             "test",
						ProminenceValue: 1,
					},
				},
			},
			expectedGraph: Graph{
				"Site1": &site.Page{
					Url:             "test",
					ProminenceValue: 2,
				},
				"Site2": &site.Page{
					Url:             "test",
					ProminenceValue: 1,
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			merged, err := Merge(tt.graphs)
			require.Equal(t, merged, tt.expectedGraph)
			require.Equal(t, err, tt.expectedErr)
		})
	}

}
