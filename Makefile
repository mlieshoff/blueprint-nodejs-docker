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
	docker-compose --env-file envs/local.env build
	docker-compose --env-file envs/local.env up -d

down:
	docker-compose --env-file envs/local.env down

###############################################################################
# PRODUCTION                                                                  #
###############################################################################

up-prod:
	docker-compose -f docker-compose.prod.yml --env-file envs/prod.env build
	docker-compose -f docker-compose.prod.yml --env-file envs/prod.env up -d

down-prod:
	docker-compose -f docker-compose.prod.yml --env-file envs/prod.env down