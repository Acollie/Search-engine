package slice

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func Test_deDuplication(t *testing.T) {
	tests := []struct {
		name   string
		input  []any
		expect []any
	}{
		{
			name:   "nil test",
			input:  nil,
			expect: nil,
		},
		{
			name:   "basic test no duplicates",
			input:  []any{"1", "2", "3"},
			expect: []any{"1", "2", "3"},
		},
		{
			name:   "basic test with duplicates",
			input:  []any{"1", "2", "2", "3"},
			expect: []any{"1", "2", "3"},
		},
		{
			name:   "using int",
			input:  []any{1, 2, 2, 3},
			expect: []any{1, 2, 3},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			output := DeDuplicate(test.input)
			require.Equal(t, output, test.expect)

		})
	}
}
