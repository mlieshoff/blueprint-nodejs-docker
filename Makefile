logs:
	docker logs blueprint-nodejs-docker

up:
	docker-compose build
	docker-compose up -d

up-prod:
	echo "up-prod"

down:
	docker-compose down
