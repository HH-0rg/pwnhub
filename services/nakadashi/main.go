package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

func main() {
	fmt.Println("Nakadashi")
	var config Config
	confile, err := ioutil.ReadFile("config/config.json")
	if err != nil {
		log.Fatal(err)
	}
	json.Unmarshal(confile, &config)
	fmt.Println(config.DB)
	files, err := ioutil.ReadDir("./")
	for i, f := range files {
		fmt.Println(i, f.Name())
	}
}
