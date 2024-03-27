package dynamoDBx

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"os"
)

type DB struct {
	session          *dynamodb.Client
	pageNameTable    string
	websiteNameTable string
}

func New(pageName string, websiteName string, cfg aws.Config) *DB {
	cfg.Region = "us-west-2"
	sessionClient := dynamodb.NewFromConfig(cfg)

	if os.Getenv("ENVIRONMENT") == "local" {
		cfg.EndpointResolver = aws.EndpointResolverFunc(func(service, region string) (aws.Endpoint, error) {
			return aws.Endpoint{
				PartitionID:   "aws",
				URL:           "http://localhost:8000",
				SigningRegion: "us-west-2",
			}, nil
		})
		sessionClient = dynamodb.NewFromConfig(cfg)
	}

	return &DB{
		session:          sessionClient,
		pageNameTable:    pageName,
		websiteNameTable: websiteName,
	}
}
