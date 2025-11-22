package handler

import (
	"time"
	"webcrawler/cmd/spider/pkg/cycle"
	"webcrawler/cmd/spider/pkg/ratelimit"
	"webcrawler/cmd/spider/pkg/robots"
	"webcrawler/cmd/spider/pkg/security"
	"webcrawler/pkg/config"
	"webcrawler/pkg/sqlx"
)

type Server struct {
	Db            sqlx.Db
	Config        *config.Config
	URLValidator  *security.URLValidator
	RateLimiter   *ratelimit.DomainLimiter
	RobotsCache   *robots.Cache
	CycleDetector *cycle.Detector
}

func New(db sqlx.Db, config *config.Config) Server {
	return Server{
		Db:            db,
		Config:        config,
		URLValidator:  security.NewURLValidator(),
		RateLimiter:   ratelimit.NewDomainLimiter(2.0, 5), // 2 req/sec per domain, burst of 5
		RobotsCache:   robots.NewCache(24 * time.Hour),    // Cache for 24 hours
		CycleDetector: cycle.NewDetector(100),             // Max 100 similar patterns
	}
}

// Close stops all background goroutines
func (s *Server) Close() {
	if s.RateLimiter != nil {
		s.RateLimiter.Close()
	}
	if s.RobotsCache != nil {
		s.RobotsCache.Close()
	}
	if s.CycleDetector != nil {
		s.CycleDetector.Close()
	}
}
