package testContainers

import (
	"context"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/mariadb"
	"log"
	"time"
)

const (
	DatabaseName = "foo"
	Password     = "root"
	Username     = "root"
)

func NewMarina(ctx context.Context) (*sql.DB, testcontainers.Container, error) {
	mariadbContainer, err := mariadb.Run(ctx,
		"mariadb:11.0.3",
		mariadb.WithDatabase(DatabaseName),
		mariadb.WithUsername(Username),
		mariadb.WithPassword(Password),
	)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to start container: %w", err)
	}

	host, err := mariadbContainer.Host(ctx)
	if err != nil {
		return nil, mariadbContainer, fmt.Errorf("failed to get container host: %w", err)
	}

	mappedPort, err := mariadbContainer.MappedPort(ctx, "3306")
	if err != nil {
		return nil, mariadbContainer, fmt.Errorf("failed to get mapped port: %w", err)
	}

	dsn := fmt.Sprintf("root:root@tcp(%s:%d)/foo?parseTime=true", host, mappedPort.Int())
	var db *sql.DB
	for i := 0; i < 10; i++ {
		db, err = sql.Open("mysql", dsn)
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
		return nil, mariadbContainer, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, mariadbContainer, nil
}
