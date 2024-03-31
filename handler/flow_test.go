package handler

import (
	"context"
	"github.com/stretchr/testify/require"
	"os"
	"testing"
	"webcrawler/awsx"
	"webcrawler/dynamo_db_x"

	"webcrawler/queue"
)

func setup(t *testing.T, ctx context.Context) Server {
	cfg, err := awsx.GetConfig(ctx)
	require.NoError(t, err)

	sqsClient := queue.New(
		os.Getenv("LINKS_QUEUE"),
		cfg,
	)
	dbClient := dynamo_db_x.New(
		os.Getenv("DB_TABLE_PAGE"),
		os.Getenv("DB_TABLE_WEBSITE"),
		cfg,
	)
	return Server{
		Queue: sqsClient,
		Db:    dbClient,
	}

}
func teardown() {
	println("teardown")

}

func TestFlow(t *testing.T) {

}
