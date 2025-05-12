package test_containers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
)

const (
	PostgresDatabase = "foo"
	PostgresUser     = "postgres"
	PostgresPassword = "password"
)

func NewPostgres(ctx context.Context) (*sql.DB, testcontainers.Container, error) {
	postgresContainer, err := postgres.Run(ctx,
		"postgres:15.3",
		postgres.WithDatabase(PostgresDatabase),
		postgres.WithUsername(PostgresUser),
		postgres.WithPassword(PostgresPassword),
	)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to start container: %w", err)
	}

	host, err := postgresContainer.Host(ctx)
	if err != nil {
		return nil, postgresContainer, fmt.Errorf("failed to get container host: %w", err)
	}

	mappedPort, err := postgresContainer.MappedPort(ctx, "5432")
	if err != nil {
		return nil, postgresContainer, fmt.Errorf("failed to get mapped port: %w", err)
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, mappedPort.Int(), PostgresUser, PostgresPassword, PostgresDatabase)

	var db *sql.DB
	for i := 0; i < 10; i++ {
		db, err = sql.Open("postgres", dsn)
		if err == nil {
			err = db.Ping()
			if err == nil {
				break
			}
		}
		log.Printf("failed to ping database, retrying... (%d/10): %s", i+1, err)
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		return nil, postgresContainer, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, postgresContainer, nil
}
