package queue

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/sqs"
)

func (h Handler) Add(ctx context.Context, message Message) error {
	messageJson, err := json.Marshal(message)
	if err != nil {
		return err
	}
	_, err = h.client.SendMessage(ctx, &sqs.SendMessageInput{
		QueueUrl:    aws.String(h.url),
		MessageBody: aws.String(string(messageJson)),
	})
	return err
}

func (h Handler) BatchAdd(ctx context.Context, message []Message) error {
	for _, msg := range message {
		err := h.Add(ctx, msg)
		if err != nil {
			return err
		}
	}
	return nil

}
