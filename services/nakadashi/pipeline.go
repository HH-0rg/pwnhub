package main

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/docker/docker/api/types"
	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/pkg/stdcopy"
	"github.com/go-git/go-git/v5"
	githttp "github.com/go-git/go-git/v5/plumbing/transport/http"
)

func clone(remote string, local string, auth *githttp.BasicAuth) (string, error) {
	cloneConfig := &git.CloneOptions{
		URL:      remote,
		Progress: os.Stdout,
		Auth:     auth,
	}

	tmpdir, err := ioutil.TempDir("storage", local)
	if err != nil {
		return "", err
	}

	if _, err := git.PlainClone(tmpdir, false, cloneConfig); err != nil {
		return "", err
	}

	return tmpdir, nil
}

func StartContainer(id string, out chan<- bool) {
	err := dockercli.ContainerStart(context.Background(), id, dockertypes.ContainerStartOptions{})
	if err != nil {
		out <- false
	} else {
		out <- true
	}
}

func DockerExec(ctx context.Context, containerID string, command []string) (ExecResult, error) {
	docker := dockercli

	config := types.ExecConfig{
		AttachStderr: true,
		AttachStdout: true,
		Cmd:          command,
	}

	resp, err := docker.ContainerExecCreate(ctx, containerID, config)
	if err != nil {
		return ExecResult{}, err
	}

	return getLeetResult(ctx, resp.ID)
}

func getLeetResult(ctx context.Context, id string) (ExecResult, error) {
	var execResult ExecResult
	docker := dockercli

	resp, err := docker.ContainerExecAttach(ctx, id, types.ExecStartCheck{})
	if err != nil {
		return execResult, err
	}
	defer resp.Close()

	var outBuf, errBuf bytes.Buffer
	outputDone := make(chan error)

	go func() {
		_, err = stdcopy.StdCopy(&outBuf, &errBuf, resp.Reader)
		outputDone <- err
	}()

	select {
	case err := <-outputDone:
		if err != nil {
			return execResult, err
		}
		break

	case <-ctx.Done():
		return execResult, ctx.Err()
	}

	stdout, err := ioutil.ReadAll(&outBuf)
	if err != nil {
		return execResult, err
	}
	stderr, err := ioutil.ReadAll(&errBuf)
	if err != nil {
		return execResult, err
	}

	res, err := docker.ContainerExecInspect(ctx, id)
	if err != nil {
		return execResult, err
	}

	execResult.ExitCode = res.ExitCode
	execResult.StdOut = string(stdout)
	execResult.StdErr = string(stderr)
	return execResult, nil
}

func cleanup(ctx context.Context, id string) {
	if err := dockercli.ContainerStop(ctx, id, nil); err != nil {
		log.Fatal(err)
	}

	if err := dockercli.ContainerRemove(ctx, id, dockertypes.ContainerRemoveOptions{}); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Cleanup finished")
}

func runTest(chaldir, testdir, expname, unameleet string) {
	fmt.Printf("Running tests for %s\n", expname)
	timeout := 50
	containerConfig := &container.Config{
		WorkingDir: "/test",
		Image:      "alpine",
		Volumes: map[string]struct{}{
			"/usr/bin:/expl":                   {},
			fmt.Sprintf("./%s:/test", testdir): {},
		},
		StopTimeout: &timeout,
		Cmd:         []string{"tail", "-f", "/dev/null"},
	}

	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	hostConfig := &container.HostConfig{
		Mounts: []mount.Mount{
			{
				Type:   mount.TypeBind,
				Source: path.Join(cwd, chaldir),
				Target: "/expl",
			},
			{
				Type:   mount.TypeBind,
				Source: path.Join(cwd, testdir),
				Target: "/test",
			},
		},
	}

	ctx := context.Background()
	created, err := dockercli.ContainerCreate(ctx, containerConfig, hostConfig, nil, nil, chaldir[8:])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Container Created")

	ch := make(chan bool)
	go StartContainer(created.ID, ch)
	if <-ch {
		fmt.Println("Container Started")
	} else {
		fmt.Println("Container Crashed")
	}

	execmd := []string{"chmod", "777", "/test/run.sh"}
	_, err = DockerExec(ctx, created.ID, execmd)
	if err != nil {
		log.Fatal(err)
	}

	execmd = []string{"chmod", "777", "/expl/setup.sh"}
	_, err = DockerExec(ctx, created.ID, execmd)
	if err != nil {
		log.Fatal(err)
	}

	execmd = []string{"chmod", "777", "/test/setup.sh"}
	_, err = DockerExec(ctx, created.ID, execmd)
	if err != nil {
		log.Fatal(err)
	}

	execmd = []string{"/expl/setup.sh"}
	_, err = DockerExec(ctx, created.ID, execmd)
	if err != nil {
		log.Fatal(err)
	}

	execmd = []string{"/test/run.sh"}
	execResult, err := DockerExec(ctx, created.ID, execmd)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(execResult)

	go cleanup(ctx, created.ID)

	var success int
	if strings.Contains(execResult.StdOut, "true") {
		success = 1
	} else {
		success = 0
	}

	http.Get(fmt.Sprintf(successpoll, unameleet, success))
}
