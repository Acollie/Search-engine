package ratelimit

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestLimiter_AllowsUnderLimit(t *testing.T) {
	l := New(10, 5)
	defer l.Close()

	// Should allow up to burst size immediately
	for i := 0; i < 5; i++ {
		assert.True(t, l.Allow("key1"), "request %d should be allowed within burst", i+1)
	}
}

func TestLimiter_BlocksOverLimit(t *testing.T) {
	l := New(1, 1)
	defer l.Close()

	assert.True(t, l.Allow("key1"))
	// Burst exhausted, next should be denied
	assert.False(t, l.Allow("key1"))
}

func TestLimiter_IndependentKeys(t *testing.T) {
	l := New(1, 1)
	defer l.Close()

	assert.True(t, l.Allow("ip1|host"))
	assert.False(t, l.Allow("ip1|host")) // exhausted

	// Different key should have its own quota
	assert.True(t, l.Allow("ip2|host"))
}

func TestLimiter_RefillsOverTime(t *testing.T) {
	l := New(100, 1) // 100 rps so refill is fast
	defer l.Close()

	assert.True(t, l.Allow("key1"))
	assert.False(t, l.Allow("key1"))

	time.Sleep(15 * time.Millisecond) // wait for token to refill
	assert.True(t, l.Allow("key1"))
}

func TestLimiter_Close(t *testing.T) {
	l := New(10, 5)
	l.Close() // should not panic or deadlock
}
