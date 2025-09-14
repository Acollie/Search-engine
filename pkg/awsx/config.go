package awsx

import (
	"context"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
)

func GetConfig(ctx context.Context) (aws.Config, error) {
	cfg, err := config.LoadDefaultConfig(
		ctx,
		config.WithRegion(os.Getenv("AWS_REGION")), // Your AWS Region,
		config.WithSharedConfigProfile(os.Getenv("AWS_PROFILE")),
	)

	return cfg, err
}
