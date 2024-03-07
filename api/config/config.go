package config

import (
	"fmt"
	"os"

	"github.com/BurntSushi/toml"
	"github.com/joho/godotenv"
)

type ApiConfig struct {
	Port              string `toml:"port"`
	ClientUrl         string `toml:"client_url"`
	AccessLogfile     string `toml:"accessLogfile"`
	Logfile           string `toml:"appLogfile"`
	UploadMaxFileSize int64  `toml:"uploadMaxFileSize"`
}

type ConfigList struct {
	Server ApiConfig      `toml:"server"`
	Db     DatabaseConfig `toml:"database"`
}

type DatabaseConfig struct {
	User     string `toml:"user"`
	Password string `toml:"password"`
	Host     string `toml:"host"`
	Port     string `toml:"port"`
	Name     string `toml:"db"`
}

var (
	Config ConfigList
	Db     DatabaseConfig
	Server ApiConfig
)

func LoadDotEnv() {
	err := godotenv.Load(fmt.Sprintf("config/env/%s.env", os.Getenv("GO_ENV")))
	if err != nil {
		panic(err)
	}
}

func init() {
	LoadDotEnv()
	confPath := fmt.Sprintf("config/env/%s.toml", os.Getenv("GO_ENV"))
	_, err := toml.DecodeFile(confPath, &Config)
	if err != nil {
		panic(err)
	}

	Db.Password = os.Getenv("DATABASE_PASSWORD")
	Db.User = os.Getenv("DATABASE_USER")
	Db.Port = os.Getenv("DATABASE_PORT")
	Db.Name = os.Getenv("DATABASE_NAME")
	Db = Config.Db
	Server = Config.Server
}
