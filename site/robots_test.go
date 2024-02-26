package site

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestFetchRobots(t *testing.T) {

	t.Run("TestFetchRobots", func(t *testing.T) {

		_, err := canVisitURL("https://__invalid_url")
		require.Error(t, err)
	})

	t.Run("TestFetchRobots", func(t *testing.T) {
		resp, err := canVisitURL("https://example.com")
		require.NoError(t, err)
		require.NotNil(t, resp)

		require.Equal(t, true, resp)
	})

}
