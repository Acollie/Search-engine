package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
	"webcrawler/cmd/frontend/handler"
	"webcrawler/pkg/bootstrap"
	dbx "webcrawler/pkg/db"

	"github.com/caarlos0/env/v11"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type config struct {
	Port           string  `env:"PORT"             envDefault:"3000"`
	HealthPort     string  `env:"HEALTH_PORT"      envDefault:"8080"`
	SearcherHost   string  `env:"SEARCHER_HOST"    envDefault:"localhost"`
	SearcherPort   string  `env:"SEARCHER_PORT"    envDefault:"9002"`
	UIDistPath     string  `env:"UI_DIST_PATH"     envDefault:"cmd/frontend/ui/dist"`
	RateLimitRPS   float64 `env:"RATE_LIMIT_RPS"   envDefault:"10"`
	RateLimitBurst int     `env:"RATE_LIMIT_BURST" envDefault:"20"`
	DBUser         string  `env:"DB_USER"          envDefault:"postgres"`
	DBPassword     string  `env:"DB_PASSWORD"      envDefault:""`
	DBHost         string  `env:"DB_HOST"          envDefault:"localhost"`
	DBPort         int     `env:"DB_PORT"          envDefault:"5432"`
	DBName         string  `env:"DB_NAME"          envDefault:"databaseName"`
}

func main() {
	cfg := config{}
	if err := env.Parse(&cfg); err != nil {
		slog.Error("Failed to parse environment config", slog.Any("error", err))
		os.Exit(1)
	}

	if err := bootstrap.Observability(); err != nil {
		slog.Error("Failed to initialize OpenTelemetry", slog.Any("error", err))
		os.Exit(1)
	}

	db, _, err := dbx.Postgres(cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)
	if err != nil {
		slog.Error("Failed to connect to database", slog.Any("error", err))
		os.Exit(1)
	}
	defer db.Close()

	searcherAddr := fmt.Sprintf("%s:%s", cfg.SearcherHost, cfg.SearcherPort)
	searchHandler, err := handler.NewSearchHandler(searcherAddr)
	if err != nil {
		slog.Error("Failed to create search handler", slog.Any("error", err))
		os.Exit(1)
	}
	defer searchHandler.Close()

	statsHandler := handler.NewStatsHandler(db)

	mux := http.NewServeMux()

	mux.HandleFunc("/api/search", searchHandler.HandleSearchAPI)
	mux.HandleFunc("/api/stats", statsHandler.Handle)

	mux.HandleFunc("/", spaHandler(cfg.UIDistPath))

	rateLimited := handler.RateLimitMiddleware(cfg.RateLimitRPS, cfg.RateLimitBurst, mux)

	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      rateLimited,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	healthMux := http.NewServeMux()
	healthMux.HandleFunc("/health", handler.HealthCheckHandler)
	healthMux.HandleFunc("/ready", handler.ReadinessHandler)
	healthMux.Handle("/metrics", promhttp.Handler())

	healthServer := &http.Server{
		Addr:        ":" + cfg.HealthPort,
		Handler:     healthMux,
		ReadTimeout: 5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	go func() {
		slog.Info("Starting health check server", slog.String("port", cfg.HealthPort))
		if err := healthServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("Health server error", slog.Any("error", err))
		}
	}()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		slog.Info("Received signal, shutting down gracefully", slog.String("signal", sig.String()))

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			slog.Error("Server shutdown error", slog.Any("error", err))
		}
		if err := healthServer.Shutdown(ctx); err != nil {
			slog.Error("Health server shutdown error", slog.Any("error", err))
		}
	}()

	slog.Info("Starting frontend server", slog.String("port", cfg.Port))
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("Server error", slog.Any("error", err))
		os.Exit(1)
	}

	slog.Info("Server stopped gracefully")
}

// spaHandler serves a React SPA: static assets from dist, index.html for all other paths.
func spaHandler(distPath string) http.HandlerFunc {
	fs := http.FileServer(http.Dir(distPath))
	return func(w http.ResponseWriter, r *http.Request) {
		absPath := filepath.Join(distPath, filepath.Clean("/"+r.URL.Path))
		if _, err := os.Stat(absPath); os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(distPath, "index.html"))
			return
		}
		fs.ServeHTTP(w, r)
	}
}
