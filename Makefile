# Start docker containers
start:
	docker-compose up -d

# Stop docker containers
stop:
	docker-compose down

# List SQS queues
list-queues:
	aws --endpoint-url=http://localhost:4570 sqs list-queues

# Create queue
create-queue:
	aws --endpoint-url=http://localhost:4570 sqs create-queue --queue-name test-queue

# Delete queue
delete-queue:
	aws --endpoint-url=http://localhost:4570 sqs delete-queue --queue-url http://localhost:4570/000000000000/test-queue


# Recreate queue
recreate-queue: delete-queue create-queue