package graphx

import (
	"context"
	"fmt"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
	neo4jTest "github.com/testcontainers/testcontainers-go/modules/neo4j"
)

func Conn(ctx context.Context, user string, password string, url string) (neo4j.DriverWithContext, error) {
	dbUri := url
	dbUser := user
	dbPassword := password
	driver, err := neo4j.NewDriverWithContext(
		dbUri,
		neo4j.BasicAuth(dbUser, dbPassword, ""),
	)

	if err != nil {
		return nil, err
	}
	err = driver.VerifyConnectivity(ctx)
	if err != nil {
		panic(err)
	}
	return driver, err
}

func New(graph neo4j.DriverWithContext) *Graph {
	return &Graph{
		Neo4j: graph,
	}

}
func NewTestContainer(ctx context.Context) (*Graph, error) {
	neo4jContainer, err := neo4jTest.Run(ctx,
		"neo4j:4.4",
		neo4jTest.WithoutAuthentication(),
		neo4jTest.WithLabsPlugin(neo4jTest.Apoc),
	)

	if err != nil {
		return nil, fmt.Errorf("failed to run container: %w", err)
	}

	boltURL, err := neo4jContainer.BoltUrl(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get bolt url: %w", err)
	}

	driver, err := neo4j.NewDriverWithContext(
		boltURL,
		neo4j.NoAuth(),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create driver: %w", err)
	}

	err = driver.VerifyConnectivity(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to verify connectivity: %w", err)
	}

	return &Graph{
		Neo4j: driver,
	}, nil

}
