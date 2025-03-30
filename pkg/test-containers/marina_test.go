package test_containers

import (
	"context"
	"testing"
)

func Test_connect(t *testing.T) {
	t.Run("Test Connect marinaDB", func(t *testing.T) {
		ctx := context.Background()
		conn, testContainer, err := NewMarina(ctx)
		if err != nil {
			t.Errorf("Expected connection to be created")
		}
		defer testContainer.Terminate(ctx)
		if conn == nil {
			t.Errorf("Expected connection to be created")
		}
	})
}
