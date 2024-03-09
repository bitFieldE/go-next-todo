package main

import (
	"github.com/bitFieldE/go-next-todo/api/config"
	"github.com/bitFieldE/go-next-todo/api/infrastructure/router"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	router.InitRouter(r)
	r.Run(":" + config.Server.Port)
}
