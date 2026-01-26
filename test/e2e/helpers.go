package e2e

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os/exec"
	"testing"
	"time"

	_ "github.com/lib/pq"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/health/grpc_health_v1"
)

// pollUntil polls a condition function until it returns true or the timeout is reached.
// Uses exponential backoff with a max interval of 10s.
func pollUntil(ctx context.Context, timeout time.Duration, condition func() (bool, error)) error {
	deadline := time.Now().Add(timeout)
	interval := 1 * time.Second
	maxInterval := 10 * time.Second

	for {
		if time.Now().After(deadline) {
			return fmt.Errorf("timeout after %v", timeout)
		}

		ok, err := condition()
		if err != nil {
			// Continue polling on transient errors
			time.Sleep(interval)
			if interval < maxInterval {
				interval *= 2
				if interval > maxInterval {
					interval = maxInterval
				}
			}
			continue
		}

		if ok {
			return nil
		}

		time.Sleep(interval)
		if interval < maxInterval {
			interval *= 2
			if interval > maxInterval {
				interval = maxInterval
			}
		}
	}
}

// checkServiceHealth checks if a service is healthy via HTTP health endpoint.
func checkServiceHealth(ctx context.Context, url string) (bool, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return false, err
	}

	client := &http.Client{
		Timeout: 5 * time.Second,
	}

	resp, err := client.Do(req)
	if err != nil {
		return false, nil // Return false without error to keep polling
	}
	defer resp.Body.Close()

	return resp.StatusCode == http.StatusOK, nil
}

// checkGRPCHealth checks if a gRPC service is healthy using the gRPC health check protocol.
func checkGRPCHealth(ctx context.Context, addr string) (bool, error) {
	conn, err := grpc.NewClient(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return false, nil // Return false without error to keep polling
	}
	defer conn.Close()

	client := grpc_health_v1.NewHealthClient(conn)

	ctxTimeout, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	resp, err := client.Check(ctxTimeout, &grpc_health_v1.HealthCheckRequest{})
	if err != nil {
		return false, nil // Return false without error to keep polling
	}

	return resp.Status == grpc_health_v1.HealthCheckResponse_SERVING, nil
}

// checkSpiderHealth checks if Spider gRPC service is healthy.
func checkSpiderHealth(ctx context.Context, addr string) (bool, error) {
	return checkGRPCHealth(ctx, addr)
}

// checkSearcherHealth checks if Searcher gRPC service is healthy.
func checkSearcherHealth(ctx context.Context, addr string) (bool, error) {
	return checkGRPCHealth(ctx, addr)
}

// connectToPostgres connects to PostgreSQL in the docker-compose environment.
func connectToPostgres(ctx context.Context) (*sql.DB, error) {
	connStr := "host=localhost port=5432 user=postgres password=postgres dbname=databaseName sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Verify connection
	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, nil
}

// collectServiceLogs collects logs from specified services for debugging.
func collectServiceLogs(t *testing.T, services []string) {
	t.Helper()
	t.Log("=== Collecting service logs for debugging ===")

	for _, service := range services {
		t.Logf("\n--- Logs for %s ---", service)
		cmd := exec.Command("docker", "logs", fmt.Sprintf("e2e-%s", service), "--tail", "100")
		output, err := cmd.CombinedOutput()
		if err != nil {
			t.Logf("Failed to collect logs for %s: %v", service, err)
			continue
		}
		t.Logf("%s", string(output))
	}
}
