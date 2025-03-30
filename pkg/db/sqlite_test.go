package dbx

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func Test_Connect(t *testing.T) {
	t.Run("Test Connect sqlite3", func(t *testing.T) {
		conn, err := NewSqlite()
		require.NoError(t, err)
		if conn == nil {
			t.Errorf("Expected connection to be created")
		}
	})
}
