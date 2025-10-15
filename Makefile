PROTO_SRC_DIR := protos
PROTO_OUT_DIR := pkg/generated

proto_gen:
	protoc --go_out=./pkg/generated --go-grpc_out=./pkg/generated protos/service/spider.proto

buildSpider:
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t spider .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
	docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest

buildConductor:
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t conductor .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest
	docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest

lint:
	go run github.com/mgechev/revive@latest -config revive.toml ./...
