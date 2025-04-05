###############################################################################
# LOCAL DEV                                                                   #
###############################################################################

dev:
	npm run dev

start:
	npm run build
	npm run start

###############################################################################
# DOCKER DEV                                                                  #
###############################################################################

logs:
	docker logs blueprint-nodejs-docker

up:
	docker-compose build
	docker-compose up -d

down:
	docker-compose down

###############################################################################
# PRODUCTION                                                                  #
###############################################################################

up-prod:
	docker-compose build -f docker-compose.prod.yml
	docker-compose up -d -f docker-compose.prod.yml

down-prod:
	docker-compose down -f docker-compose.prod.yml
