package graphx

import "github.com/neo4j/neo4j-go-driver/v5/neo4j"

type Graph struct {
	Neo4j neo4j.DriverWithContext
}

var (
	Neo4kStdSession neo4j.SessionConfig = neo4j.SessionConfig{}
)
