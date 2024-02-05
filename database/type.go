package database

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type DB struct {
	session          *dynamodb.Client
	pageNameTable    string
	websiteNameTable string
}

func New(pageName string, websiteName string, cfg aws.Config) *DB {
	return &DB{
		session:          dynamodb.NewFromConfig(cfg),
		pageNameTable:    pageName,
		websiteNameTable: websiteName,
	}
}
