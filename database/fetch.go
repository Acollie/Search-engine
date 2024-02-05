package database

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"webcrawler/site"
)

func (db *DB) FetchWebsite(website site.Page) error {
	ctx := context.TODO()
	_, err := db.session.GetItem(ctx, &dynamodb.GetItemInput{
		TableName: &db.websiteNameTable,
		Key: map[string]types.AttributeValue{
			"BaseURL": &types.AttributeValueMemberS{Value: website.Url},
		},
	})
	return err

}

func (db *DB) FetchPage(website site.Page) error {
	ctx := context.TODO()
	_, err := db.session.GetItem(ctx, &dynamodb.GetItemInput{
		TableName: &db.pageNameTable,
		Key: map[string]types.AttributeValue{
			"PageURL": &types.AttributeValueMemberS{Value: website.Url},
		},
	})
	return err
}
