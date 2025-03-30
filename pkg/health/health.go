package health

import (
	"net/http"
)

// Ok Used for health check as a part of the k8s cluster
func Ok(writer http.ResponseWriter, _ *http.Request) {
	writer.WriteHeader(http.StatusOK)
	writer.Header().Set("Content-Type", "application/json")
	writer.Write([]byte(`ok`))
	return
}
