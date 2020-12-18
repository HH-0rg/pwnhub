package main

import (
	"github.com/gin-gonic/gin"
	githttp "github.com/go-git/go-git/v5/plumbing/transport/http"
)

func Deploy(c *gin.Context) {
	var data Deployment
	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err,
		})
		return
	}

	uname := c.Query("name")
	auth := &githttp.BasicAuth{
		Username: data.Username,
		Password: data.Token,
	}
	chaldir, err := clone(data.Repo, data.Name, auth)
	if err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err,
		})
		return
	}

	auth = &githttp.BasicAuth{
		Username: data.TestUserName,
		Password: data.TestToken,
	}

	testdir, err := clone(data.TestRepo, data.Name, auth)
	if err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err,
		})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
	})

	go runTest(chaldir, testdir, data.Name, uname)
}
