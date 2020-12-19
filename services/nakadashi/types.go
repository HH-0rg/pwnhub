package main

type Config struct {
	DB   string `json:"database"`
	Port int    `json:"nakadashi>port"`
}

type Deployment struct {
	Name         string `json:"name"`
	Repo         string `json:"repo"`
	Username     string `json:"username"`
	Token        string `json:"token"`
	TestRepo     string `json:"testrepo"`
	TestUserName string `json:"testusername"`
	TestToken    string `json:"testtoken"`
}

type ExecResult struct {
	StdOut   string
	StdErr   string
	ExitCode int
}
