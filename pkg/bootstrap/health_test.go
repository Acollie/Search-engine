package bootstrap

import (
	"fmt"
	"io"
	"net/http"
	"testing"
	"time"
)

func TestHealthCheck(t *testing.T) {
	// Start the health check server.
	if err := HealthCheck(); err != nil {
		t.Fatal("HealthCheck() failed: %w", err)
	}

	// Give the server a moment to start.
	time.Sleep(50 * time.Millisecond)

	testCases := []struct {
		name       string
		path       string
		wantStatus int
		wantBody   string
	}{
		{
			name:       "health endpoint",
			path:       "/health",
			wantStatus: http.StatusOK,
			wantBody:   "ok",
		},
		{
			name:       "metrics endpoint",
			path:       "/metrics",
			wantStatus: http.StatusOK,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			url := fmt.Sprintf("http://localhost:%d%s", PrometheusPort, tc.path)
			resp, err := http.Get(url)
			if err != nil {
				t.Fatalf("failed to get %s: %v", url, err)
			}
			defer resp.Body.Close()

			if resp.StatusCode != tc.wantStatus {
				t.Errorf("got status %d, want %d", resp.StatusCode, tc.wantStatus)
			}

			if tc.wantBody != "" {
				body, err := io.ReadAll(resp.Body)
				if err != nil {
					t.Fatalf("failed to read response body: %v", err)
				}
				if string(body) != tc.wantBody {
					t.Errorf("got body %q, want %q", string(body), tc.wantBody)
				}
			}
		})
	}
}
