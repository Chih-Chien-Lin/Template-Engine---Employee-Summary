const axios = require("axios");

class Engineer {
    constructor(name, id, email, GitHubName) {
        this.name = name,
        this.id = id,
        this.email = email,
        this.github = GitHubName
    }

    getRole() {
        if(this.name !== "" && this.id !== "" && this.email !=="" && this.GitHubName !== ""){
            return "Engineer"
        }
    }
    getGithub() {
        const queryUrl = `https://api.github.com/users/${this.github}`;
        console.log(queryUrl);
        axios
        .get(queryUrl)
        .then(function (res) {

            console.log("get name: ",res.data.login);
            return res.data.login;
        })

    }
}
const testValue = "GitHubUser";
const testRole = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  console.log("return: ",e.getGithub());
  console.log("getRole: ",e.getRole());
  console.log("github Name: ",e.github);
//   console.log(e)

