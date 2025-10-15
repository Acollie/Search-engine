package testContainers

import (
	"context"
	"testing"
)

func Test_connectPostgres(t *testing.T) {
	t.Run("Test Connect Postgres", func(t *testing.T) {
		ctx := context.Background()
		conn, testContainer, err := NewPostgres(ctx)
		if err != nil {
			t.Errorf("Expected connection to be created, got error: %s", err)
		}
		defer testContainer.Terminate(ctx)
		if conn == nil {
			t.Errorf("Expected connection to be created")
		}
	})
}
