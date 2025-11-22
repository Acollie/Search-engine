package health

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

// LivenessProbe checks if the service is running (for Kubernetes liveness probe)
func LivenessProbe(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(map[string]string{"status": "alive"})
}

// ReadinessProbe checks if the service is ready to accept traffic (for Kubernetes readiness probe)
func ReadinessProbe(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// Check database connectivity
		if err := db.PingContext(r.Context()); err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			json.NewEncoder(w).Encode(map[string]string{
				"status": "not_ready",
				"reason": "database_unavailable",
				"error":  err.Error(),
			})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"status": "ready"})
	}
}

// Ok Used for health check as a part of the k8s cluster (deprecated: use LivenessProbe instead)
func Ok(writer http.ResponseWriter, _ *http.Request) {
	writer.WriteHeader(http.StatusOK)
	writer.Header().Set("Content-Type", "application/json")
	writer.Write([]byte(`ok`))
	return
}
