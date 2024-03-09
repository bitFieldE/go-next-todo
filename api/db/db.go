package db

import (
	"database/sql"
	"fmt"

	"github.com/bitFieldE/go-next-todo/api/config"
	_ "github.com/lib/pq"
)

func OpenDB() (*sql.DB, error) {
	var err error
	db, err := sql.Open(
		"postgres",
		fmt.Sprintf(
			"user=%s password=%s host=%s port=%s dbname=%s sslmode=disable TimeZone=Asia/Tokyo",
			config.Db.User,
			config.Db.Password,
			config.Db.Host,
			config.Db.Port,
			config.Db.Name,
		),
	)
	return db, err
}
