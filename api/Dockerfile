FROM golang:1.21.3-alpine as dev

COPY . /github.com/bitFieldE/go-next-todo/api
WORKDIR /github.com/bitFieldE/go-next-todo/api

ENV GO111MODULE=on

COPY *.go ./
COPY go.mod go.sum ./
RUN apk update && \
  apk add --no-cache git && \
  apk add --update gcc musl-dev && \
  go mod download && \
  go get -u github.com/gin-gonic/gin && \
  go install github.com/pressly/goose/v3/cmd/goose@latest && \
  go install github.com/cosmtrek/air@latest && \
  go install github.com/volatiletech/sqlboiler/v4@latest && \
  go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest

  CMD ["air", "-c", ".air.toml"]