package handler

import (
	"log"
	"net/http"

	"github.com/bitFieldE/go-next-todo/api/db"
	"github.com/bitFieldE/go-next-todo/api/models"
	"github.com/gin-gonic/gin"
)

func Top(c *gin.Context) {
	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("could not open database:", err)
	}
	todos, err := models.Todos().All(c.Request.Context(), db)
	if err != nil {
		panic(err)
	}
	c.IndentedJSON(http.StatusOK, gin.H{"todos": todos})
}
