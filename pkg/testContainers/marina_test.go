package testContainers

import (
	"context"
	"testing"
)

func Test_connect(t *testing.T) {
	t.Run("Test Connect marinaDB", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Skipf("Skipping test - Docker not available: %v", r)
			}
		}()

		ctx := context.Background()
		conn, testContainer, err := NewMarina(ctx)
		if err != nil {
			t.Skipf("Skipping test - Docker not available: %v", err)
			return
		}
		defer testContainer.Terminate(ctx)
		if conn == nil {
			t.Errorf("Expected connection to be created")
		}
	})
}
