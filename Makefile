postgres:
build-api:
	docker-compose run --rm api build
build-client:
	docker-compose run --rm client build
build-all:
	docker-compose build
