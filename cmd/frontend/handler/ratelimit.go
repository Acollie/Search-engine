package handler

import (
	"log/slog"
	"net"
	"net/http"
	"strings"
	"webcrawler/pkg/ratelimit"
)

// RateLimitMiddleware returns an HTTP middleware that limits requests per
// client IP + Host. The key combines both so that a single IP cannot abuse
// multiple virtual hosts, and different IPs on the same host are tracked
// independently.
//
// Limit: rps requests per second with the given burst allowance.
// Clients that exceed the limit receive 429 Too Many Requests.
func RateLimitMiddleware(rps float64, burst int, next http.Handler) http.Handler {
	limiter := ratelimit.New(rps, burst)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := clientKey(r)
		if !limiter.Allow(key) {
			slog.Warn("Rate limit exceeded",
				slog.String("ip", clientIP(r)),
				slog.String("host", r.Host),
			)
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// clientKey builds a composite key from the client IP and the HTTP Host header.
func clientKey(r *http.Request) string {
	return clientIP(r) + "|" + r.Host
}

// clientIP extracts the real client IP, preferring X-Forwarded-For when the
// request comes through a reverse proxy.
func clientIP(r *http.Request) string {
	if forwarded := r.Header.Get("X-Forwarded-For"); forwarded != "" {
		// X-Forwarded-For may be a comma-separated list; the leftmost entry is
		// the original client.
		if ip, _, err := net.SplitHostPort(strings.TrimSpace(strings.Split(forwarded, ",")[0])); err == nil {
			return ip
		}
		return strings.TrimSpace(strings.Split(forwarded, ",")[0])
	}
	if realIP := r.Header.Get("X-Real-IP"); realIP != "" {
		return strings.TrimSpace(realIP)
	}
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}
