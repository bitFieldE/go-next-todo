package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"status": http.StatusOK})
}
