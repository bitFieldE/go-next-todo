package handler

import (
	"log"
	"net/http"
	"strconv"

	"github.com/bitFieldE/go-next-todo/api/db"
	"github.com/bitFieldE/go-next-todo/api/models"
	"github.com/gin-gonic/gin"

	// v4
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func GetTodos(c *gin.Context) {
	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("unabled to open database:", err)
	}
	defer db.Close()

	todos, err := models.Todos().All(c.Request.Context(), db)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, errorResponse(err))
	}

	c.IndentedJSON(http.StatusOK, gin.H{"todos": todos})
}

func CreateTodo(c *gin.Context) {
	todo := models.Todo{}

	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("Unabled to open database:", err)
	}
	// 主にContent-Typeが application/x-www-form-urlencoded や multipart/form-data などのフォームデータを処理するための関数
	if err := c.ShouldBind(&todo); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	if err = todo.Insert(c.Request.Context(), db, boil.Infer()); err != nil {
		log.Fatal("Unabled to create todo:", err)
	}
	c.IndentedJSON(http.StatusOK, gin.H{"todo": todo})
}

func GetTodo(c *gin.Context) {
	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("unabled to open database on edit:", err)
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, errorResponse(err))
		return
	}
	todo, _ := models.FindTodo(c.Request.Context(), db, id)
	c.IndentedJSON(http.StatusOK, gin.H{"todo": todo})
}

func UpdateTodo(c *gin.Context) {
	form := models.Todo{}
	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("Unabled to open database on update:", err)
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, errorResponse(err))
		return
	}

	if err := c.ShouldBind(&form); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	todo, _ := models.FindTodo(c.Request.Context(), db, id)
	todo.Content = form.Content
	todo.Update(c.Request.Context(), db, boil.Infer())

	c.IndentedJSON(http.StatusOK, gin.H{"todo": todo})
}

func DeleteTodo(c *gin.Context) {
	db, err := db.OpenDB()
	if err != nil {
		log.Fatal("Unabled to open database on delete:", err)
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, errorResponse(err))
		return
	}
	todo, _ := models.FindTodo(c.Request.Context(), db, id)
	todo.Delete(c.Request.Context(), db)

	c.IndentedJSON(http.StatusOK, gin.H{"msg": "削除しました"})
}
