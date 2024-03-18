package router

import (
	"log"

	handler "github.com/bitFieldE/go-next-todo/api/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func printReqCtxMiddleware(c *gin.Context) {
	log.Printf("Reaquest method: %s, path: %s", c.Request.Method, c.Request.URL.Path)
	c.Next()
}

func InitRouter(r *gin.Engine) {
	// CORSの設定
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Access-Control-Allow-Headers", "Content-Type"},
	}))

	r.Use(printReqCtxMiddleware)
	namespace := r.Group("/api/v1")
	{
		namespace.GET("/todos", handler.GetTodos)
		namespace.GET("/todos/:id", handler.GetTodo)
		namespace.GET("/top", handler.HealthCheck)
		namespace.POST("/todos", handler.CreateTodo)
		namespace.PUT("/todos/:id", handler.UpdateTodo)
		namespace.DELETE("/todos/:id", handler.DeleteTodo)
	}

}
