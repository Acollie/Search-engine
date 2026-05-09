package handler

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestClientIP_RemoteAddr(t *testing.T) {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	r.RemoteAddr = "203.0.113.1:12345"

	assert.Equal(t, "203.0.113.1", clientIP(r))
}

func TestClientIP_XForwardedFor(t *testing.T) {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	r.RemoteAddr = "10.0.0.1:9999"
	r.Header.Set("X-Forwarded-For", "203.0.113.5, 10.0.0.2")

	// Should use leftmost (original client) entry
	assert.Equal(t, "203.0.113.5", clientIP(r))
}

func TestClientIP_XRealIP(t *testing.T) {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	r.RemoteAddr = "10.0.0.1:9999"
	r.Header.Set("X-Real-IP", "203.0.113.9")

	assert.Equal(t, "203.0.113.9", clientIP(r))
}

func TestClientIP_XForwardedForTakesPrecedence(t *testing.T) {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	r.Header.Set("X-Forwarded-For", "203.0.113.5")
	r.Header.Set("X-Real-IP", "203.0.113.9")

	assert.Equal(t, "203.0.113.5", clientIP(r))
}

func TestClientKey(t *testing.T) {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	r.RemoteAddr = "203.0.113.1:1234"
	r.Host = "search.example.com"

	key := clientKey(r)
	assert.Equal(t, "203.0.113.1|search.example.com", key)
}

func TestRateLimitMiddleware_AllowsUnderLimit(t *testing.T) {
	handler := RateLimitMiddleware(100, 10, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	r := httptest.NewRequest(http.MethodGet, "/search?q=test", nil)
	r.RemoteAddr = "203.0.113.1:1234"

	w := httptest.NewRecorder()
	handler.ServeHTTP(w, r)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestRateLimitMiddleware_BlocksWhenExceeded(t *testing.T) {
	handler := RateLimitMiddleware(1, 1, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	r := httptest.NewRequest(http.MethodGet, "/search?q=test", nil)
	r.RemoteAddr = "203.0.113.1:1234"
	r.Host = "example.com"

	// First request uses the burst token
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, r)
	assert.Equal(t, http.StatusOK, w.Code)

	// Second request exceeds limit
	w = httptest.NewRecorder()
	handler.ServeHTTP(w, r)
	assert.Equal(t, http.StatusTooManyRequests, w.Code)
}

func TestRateLimitMiddleware_DifferentIPsAreIndependent(t *testing.T) {
	handler := RateLimitMiddleware(1, 1, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	makeRequest := func(ip string) int {
		r := httptest.NewRequest(http.MethodGet, "/search?q=test", nil)
		r.RemoteAddr = ip + ":1234"
		r.Host = "example.com"
		w := httptest.NewRecorder()
		handler.ServeHTTP(w, r)
		return w.Code
	}

	assert.Equal(t, http.StatusOK, makeRequest("203.0.113.1"))
	assert.Equal(t, http.StatusTooManyRequests, makeRequest("203.0.113.1")) // same IP, exhausted
	assert.Equal(t, http.StatusOK, makeRequest("203.0.113.2"))              // different IP, own quota
}

func TestRateLimitMiddleware_SameIPDifferentHostsAreIndependent(t *testing.T) {
	handler := RateLimitMiddleware(1, 1, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	makeRequest := func(host string) int {
		r := httptest.NewRequest(http.MethodGet, "/", nil)
		r.RemoteAddr = "203.0.113.1:1234"
		r.Host = host
		w := httptest.NewRecorder()
		handler.ServeHTTP(w, r)
		return w.Code
	}

	assert.Equal(t, http.StatusOK, makeRequest("host-a.com"))
	assert.Equal(t, http.StatusTooManyRequests, makeRequest("host-a.com"))
	assert.Equal(t, http.StatusOK, makeRequest("host-b.com")) // different host, own quota
}
