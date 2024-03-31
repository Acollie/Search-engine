package dynamo_db_x

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"webcrawler/site"
)

func (db *DB) RemovePage(website site.Page) error {
	ctx := context.Background()
	_, err := db.session.DeleteItem(ctx, &dynamodb.DeleteItemInput{
		TableName: &db.pageNameTable,
		Key: map[string]types.AttributeValue{
			"PageURL": &types.AttributeValueMemberS{Value: website.Url},
		},
	})
	return err
}

func (db *DB) RemoveWebsite(website site.Website) error {
	ctx := context.Background()
	_, err := db.session.DeleteItem(ctx, &dynamodb.DeleteItemInput{
		TableName: &db.websiteNameTable,
		Key: map[string]types.AttributeValue{
			"BaseURL": &types.AttributeValueMemberS{Value: website.Url},
		},
	})
	return err
}
