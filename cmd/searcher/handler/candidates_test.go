package handler

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestMaxCandidates(t *testing.T) {
	t.Run("defaults when unset", func(t *testing.T) {
		t.Setenv("SEARCH_MAX_CANDIDATES", "")
		require.Equal(t, defaultMaxCandidates, maxCandidates())
	})

	t.Run("reads override", func(t *testing.T) {
		t.Setenv("SEARCH_MAX_CANDIDATES", "1234")
		require.Equal(t, 1234, maxCandidates())
	})

	// A bad value must not silently disable the cap -- an unbounded rank is the
	// behaviour that timed out and tripped the circuit breaker.
	t.Run("falls back on invalid", func(t *testing.T) {
		for _, bad := range []string{"abc", "0", "-1", "1.5"} {
			t.Setenv("SEARCH_MAX_CANDIDATES", bad)
			require.Equal(t, defaultMaxCandidates, maxCandidates(), "input %q", bad)
		}
	})
}
