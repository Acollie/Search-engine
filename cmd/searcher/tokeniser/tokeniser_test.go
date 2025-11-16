package tokeniser

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_Tokenise(t *testing.T) {
	tests := []struct {
		name string
		text string
		want []string
	}{
		{
			name: "Simple sentence",
			text: "Hello, world! This is a test.",
			want: []string{"Hello", "world", "This", "is", "a", "test"},
		},
		{
			name: "Multiple spaces",
			text: "Hello    world",
			want: []string{"Hello", "world"},
		},
		{
			name: "New lines and tabs",
			text: "Hello\nworld\tthis is\ta test",
			want: []string{"Hello", "world", "this", "is", "a", "test"},
		},
		{
			name: "Empty string",
			text: "",
			want: []string{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Tokenise(tt.text)
			require.Equal(t, tt.want, got)
		})
	}

}
