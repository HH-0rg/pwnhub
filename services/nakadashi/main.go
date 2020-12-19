package main

import (
	"fmt"
	"log"

	dockerclient "github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

var dockercli *dockerclient.Client
var successpoll string

func main() {
	fmt.Println("Nakadashi")
	var err error
	dockercli, err = dockerclient.NewClientWithOpts(dockerclient.FromEnv)
	if err != nil {
		log.Fatal(err)
	}
	successpoll = "http://localhost:5000/passed?name=%s&status=%d"

	router := gin.Default()
	router.POST("/deploy", Deploy)
	router.Run()
}
