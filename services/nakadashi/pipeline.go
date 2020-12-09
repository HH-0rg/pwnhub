package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"github.com/go-git/go-git/v5"
	githttp "github.com/go-git/go-git/v5/plumbing/transport/http"
)

func clone(remote string, local string, auth *githttp.BasicAuth) error {
	cloneConfig := &git.CloneOptions{
		URL:      remote,
		Progress: os.Stdout,
		Auth:     auth,
	}
	tmpdir, err := ioutil.TempDir("tmp", fmt.Sprintf("storage/%s", local))
	if err != nil {
		return err
	}

	fmt.Printf("Temporary directory created: %s", tmpdir)
	if _, err := git.PlainClone(fmt.Sprintf(tmpdir), false, cloneConfig); err != nil {
		return err
	}

	return nil
}
