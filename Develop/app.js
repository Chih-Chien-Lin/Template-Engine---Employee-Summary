const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const render = require("./lib/htmlRenderer")
const fs = require("fs");
// const templatesDir = path.resolve(__dirname, "../templates");


let employees = [];
inquirer
    .prompt([
        // Github username
        {
            type: "input",
            message: "What's the name of manager?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What's the id of manager?",
            name: "managerId"
        },
        {
            type: "input",
            message: "What's the email address of manager?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What's the office number of manager?",
            name: "managerOfficeNumber"
        },
        // License
    ])
    .then(function (response) {
        function askPosition() {
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        message: "What's the position of this employee?",
                        name: "position",
                        choices: [
                            "Engineer",
                            "Intern"
                        ]
                    }
                ])
                .then(function (resNext) {
                    // console.log(resNext.position[0]);
                    const resTemp = resNext.position;
                    if (resTemp.length > 1) {
                        console.log("You can only choose one at a time!")
                        askPosition();
                    } else {
                        if (resNext.position[0] === "Engineer") {
                            askEngineerInfo();
                        } else if (resNext.position[0] === "Intern") {
                            askInternInfo();
                        }
                    }
                })
        }
        function askEngineerInfo() {
            inquirer
                .prompt([
                    // Github username
                    {
                        type: "input",
                        message: "What's the name of this engineer?",
                        name: "engineerName"
                    },
                    {
                        type: "input",
                        message: "What's the id of this engineer?",
                        name: "engineerId"
                    },
                    {
                        type: "input",
                        message: "What's the email address of this engineer?",
                        name: "engineerEmail"
                    },
                    {
                        type: "input",
                        message: "What's the github name of this engineer?",
                        name: "engineerGithub"
                    },
                ])
                .then(function (resEng) {
                    let engineer = new Engineer(resEng.engineerName, resEng.engineerId, resEng.engineerEmail, resEng.engineerGithub);
                    employees.push(engineer);
                    console.log("Engineer getRole: ", engineer.getRole());
                    console.log(employees);
                    // console.log(resEng);
                    ifmore();
                })
        }
        function askInternInfo() {
            inquirer
                .prompt([
                    // Github username
                    {
                        type: "input",
                        message: "What's the name of this intern?",
                        name: "internName"
                    },
                    {
                        type: "input",
                        message: "What's the id of this intern?",
                        name: "internId"
                    },
                    {
                        type: "input",
                        message: "What's the email address of this intern?",
                        name: "internEmail"
                    },
                    {
                        type: "input",
                        message: "What's the school of this intern studies in?",
                        name: "internSchool"
                    },
                ])
                .then(function (resInt) {
                    let intern = new Intern(resInt.internName, resInt.internId, resInt.internEmail, resInt.internSchool)
                    employees.push(intern);
                    console.log(employees);
                    console.log("Intern getRole: ", intern.getRole());
                    // console.log(resInt);
                    ifmore();
                })
        }
        function ifmore() {
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        message: "Is there any employee(s)?",
                        name: "ifmore",
                        choices: [
                            "Yes",
                            "No"
                        ]
                    }
                ])
                .then(function (resIf) {
                    if (resIf.ifmore[0] === "Yes") {
                        askPosition();
                    }else{
                        var page = render(employees);
                        fs.writeFileSync("team.html", page,"utf8",function(err){
                            if (err) throw err;
                        })
                        console.log(page);
                        console.log("employee list has been created!!")
                    }
                })
        }
        function writeEmployee(employees) {
            const employeesJSON = JSON.stringify(employees, null, 2);
            fs.writeFileSync("employees.json", employeesJSON, function (err) {
                if (err) {
                    throw err;
                }
            })
        }
        let manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
        console.log("Manager getRole: ", manager.getRole());
        employees.push(manager);
        console.log(employees);
        ifmore();
        
    })