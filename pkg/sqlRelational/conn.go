package sqlRelational

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"os"
)

type SqlDB struct {
	Client *sql.DB
	DBName string
}

func connect(dbName string) *sql.DB {
	host := os.Getenv("POSTGRES_HOST")
	password := os.Getenv("POSTGRES_PASSWORD")
	user := os.Getenv("POSTGRES_USER")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbName)

	client, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	return client
}

func New(dbName string) *SqlDB {
	return &SqlDB{
		Client: connect(dbName),
		DBName: dbName,
	}
}
