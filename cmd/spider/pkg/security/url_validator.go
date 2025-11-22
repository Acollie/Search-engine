package security

import (
	"fmt"
	"net"
	"net/url"
	"strings"
)

// URLValidator validates URLs for security issues
type URLValidator struct {
	allowedSchemes []string
	blockedHosts   map[string]bool
}

// NewURLValidator creates a new URL validator
func NewURLValidator() *URLValidator {
	return &URLValidator{
		allowedSchemes: []string{"http", "https"},
		blockedHosts: map[string]bool{
			"169.254.169.254":          true, // AWS/Azure metadata
			"169.254.169.253":          true, // Azure metadata (old)
			"metadata.google.internal": true, // GCP metadata
			"fd00:ec2::254":            true, // AWS IPv6 metadata
		},
	}
}

// Validate checks if a URL is safe to crawl
func (v *URLValidator) Validate(rawURL string) error {
	if rawURL == "" {
		return fmt.Errorf("empty URL")
	}

	parsed, err := url.Parse(rawURL)
	if err != nil {
		return fmt.Errorf("invalid URL: %w", err)
	}

	// Check scheme
	if !v.isAllowedScheme(parsed.Scheme) {
		return fmt.Errorf("scheme not allowed: %s (only http/https allowed)", parsed.Scheme)
	}

	// Check for blocked hosts
	hostname := parsed.Hostname()
	if v.blockedHosts[strings.ToLower(hostname)] {
		return fmt.Errorf("blocked host: %s", hostname)
	}

	// Check if hostname is an IP address
	if ip := net.ParseIP(hostname); ip != nil {
		if err := v.validateIP(ip); err != nil {
			return err
		}
	} else {
		// Resolve hostname to check if it points to a private IP
		if err := v.validateHostname(hostname); err != nil {
			return err
		}
	}

	return nil
}

// isAllowedScheme checks if the URL scheme is allowed
func (v *URLValidator) isAllowedScheme(scheme string) bool {
	scheme = strings.ToLower(scheme)
	for _, allowed := range v.allowedSchemes {
		if scheme == allowed {
			return true
		}
	}
	return false
}

// validateIP checks if an IP address is safe to access
func (v *URLValidator) validateIP(ip net.IP) error {
	// Block loopback addresses (127.0.0.0/8, ::1)
	if ip.IsLoopback() {
		return fmt.Errorf("loopback address not allowed: %s", ip)
	}

	// Block private addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, fc00::/7)
	if ip.IsPrivate() {
		return fmt.Errorf("private IP address not allowed: %s", ip)
	}

	// Block link-local addresses (169.254.0.0/16, fe80::/10)
	if ip.IsLinkLocalUnicast() || ip.IsLinkLocalMulticast() {
		return fmt.Errorf("link-local address not allowed: %s", ip)
	}

	// Block multicast addresses
	if ip.IsMulticast() {
		return fmt.Errorf("multicast address not allowed: %s", ip)
	}

	// Block unspecified addresses (0.0.0.0, ::)
	if ip.IsUnspecified() {
		return fmt.Errorf("unspecified address not allowed: %s", ip)
	}

	return nil
}

// validateHostname resolves a hostname and validates the resulting IPs
func (v *URLValidator) validateHostname(hostname string) error {
	// Special case: localhost variations
	if strings.ToLower(hostname) == "localhost" {
		return fmt.Errorf("localhost not allowed")
	}

	// Resolve hostname to IP addresses
	ips, err := net.LookupIP(hostname)
	if err != nil {
		// If we can't resolve, allow it (DNS might be temporarily down)
		// The HTTP request will fail anyway
		return nil
	}

	// Check if any resolved IP is private/blocked
	for _, ip := range ips {
		if err := v.validateIP(ip); err != nil {
			return fmt.Errorf("hostname %s resolves to blocked IP: %w", hostname, err)
		}
	}

	return nil
}
