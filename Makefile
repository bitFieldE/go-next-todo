include .env

build-api:
	docker-compose run --rm api build
build-client:
	docker-compose run --rm client build
build-all:
	docker-compose build
up:
	docker-compose up
migrate:
	docker-compose run --rm api goose -dir ./infrastructure/db postgres "user=$(DATABASE_USERNAME) password=$(DATABASE_PASSWORD) host=$(DATABASE_HOST) port=$(DATABASE_PORT) dbname=$(DATABASE_NAME) sslmode=disable" up
drop:
	docker-compose run --rm api goose -dir ./infrastructure/db postgres "user=$(DATABASE_USERNAME) password=$(DATABASE_PASSWORD) host=$(DATABASE_HOST) port=$(DATABASE_PORT) dbname=$(DATABASE_NAME) sslmode=disable" down
table-create:
	docker-compose run --rm api goose -dir ./infrastructure/db create $(TABLE_NAME) sql
