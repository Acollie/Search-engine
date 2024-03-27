package dynamoDBx

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"reflect"
	"webcrawler/site"
)

func (db *DB) UpdateWebsite(page site.Page, website site.Website) error {

	ctx := context.Background()
	websiteDB, err := db.FetchWebsite(page.BaseURL)
	if err != nil {
		return err
	}
	if reflect.DeepEqual(websiteDB, site.Website{}) {
		return db.AddWebsite(website)
	}

	websiteDB.Links = append(websiteDB.Links, page.Url)
	websiteDB.ProminenceValue += 1
	av, err := attributevalue.MarshalMap(websiteDB)
	if err != nil {
		return err
	}
	_, err = db.session.PutItem(ctx, &dynamodb.PutItemInput{
		Item:      av,
		TableName: &db.websiteNameTable,
	})
	return err
}
