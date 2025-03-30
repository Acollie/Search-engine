PROTO_SRC_DIR := protos
PROTO_OUT_DIR := pkg/generated

buildSpider:
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t spider .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
	docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
