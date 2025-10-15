package dynamoDBx

import (
	"context"
	"fmt"
	"os"
	"webcrawler/pkg/awsx"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	dynamodblocal "github.com/testcontainers/testcontainers-go/modules/dynamodb"
)

type DB struct {
	session          *dynamodb.Client
	pageNameTable    string
	websiteNameTable string
}

func New(pageName string, websiteName string, cfg aws.Config) *DB {
	cfg.Region = awsx.Region
	sessionClient := dynamodb.NewFromConfig(cfg)

	if os.Getenv("ENVIRONMENT") == "local" {
		cfg.EndpointResolver = aws.EndpointResolverFunc(func(service, region string) (aws.Endpoint, error) {
			return aws.Endpoint{
				PartitionID:   "aws",
				URL:           "http://localhost:8000",
				SigningRegion: awsx.Region,
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

func NewTestContainer(ctx context.Context) (*DB, error) {
	dynamodbContainer, err := dynamodblocal.Run(ctx, "amazon/dynamodb-local:2.2.1")
	host, err := dynamodbContainer.Host(ctx)
	if err != nil {
		return nil, err
	}

	port, err := dynamodbContainer.MappedPort(ctx, "8000/tcp")
	if err != nil {
		return nil, err
	}

	endpoint := fmt.Sprintf("http://%s:%s", host, port.Port())

	// Load a default config, then override region and credentials
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("us-east-1"), // or your region of choice
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider("FAKEID", "FAKESECRET", ""),
		),
	)
	if err != nil {
		return nil, err
	}

	// Override the endpoint for DynamoDB Local
	cfg.EndpointResolverWithOptions = aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{},
	) (aws.Endpoint, error) {
		return aws.Endpoint{
			PartitionID:   "aws",
			URL:           endpoint,
			SigningRegion: "us-east-1",
		}, nil
	})

	client := dynamodb.NewFromConfig(cfg)

	return &DB{
		session:          client,
		websiteNameTable: "test",
		pageNameTable:    "test1",
	}, nil
}

func (db *DB) SetupTables(ctx context.Context) error {
	tableInput := &dynamodb.CreateTableInput{
		TableName: aws.String(db.pageNameTable),
		// You need an AttributeDefinition for every key attribute
		AttributeDefinitions: []types.AttributeDefinition{
			{
				AttributeName: aws.String("PageURL"),
				AttributeType: types.ScalarAttributeTypeS,
			},
		},
		KeySchema: []types.KeySchemaElement{
			{
				AttributeName: aws.String("PageURL"),
				KeyType:       types.KeyTypeHash, // "HASH" is for the partition key
			},
		},
		ProvisionedThroughput: &types.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(5),
			WriteCapacityUnits: aws.Int64(5),
		},
	}

	_, err := db.session.CreateTable(ctx, tableInput)
	if err != nil {
		return fmt.Errorf("failed to create table: %w", err)
	}

	tableInput = &dynamodb.CreateTableInput{
		TableName: aws.String(db.websiteNameTable),
		// You need an AttributeDefinition for every key attribute
		AttributeDefinitions: []types.AttributeDefinition{
			{
				AttributeName: aws.String("BaseURL"),
				AttributeType: types.ScalarAttributeTypeS,
			},
		},
		KeySchema: []types.KeySchemaElement{
			{
				AttributeName: aws.String("BaseURL"),
				KeyType:       types.KeyTypeHash, // "HASH" is for the partition key
			},
		},
		ProvisionedThroughput: &types.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(5),
			WriteCapacityUnits: aws.Int64(5),
		},
	}

	_, err = db.session.CreateTable(ctx, tableInput)
	if err != nil {
		return fmt.Errorf("failed to create table: %w", err)
	}

	return nil
}
