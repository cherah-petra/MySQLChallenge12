//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');


const db = mysql.createConnection({
    host: "localhost",
      
    port: 3306,
      
    user: "root",
      
    password: "password",
    database: "employee_tracker"
    });

    db.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + db.threadId);
      
        begin();
      });

function begin() {
    inquirer
        .createPromptModule({
            type: "list",
            name: "task",
            choices: [
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "View departments",
                "View exhisting roles",
                "View all employees",
                "Change the role for an existing employee",
                "Quit"
            ],
            message: "What would you like to do?",
            name: "option"
        })
        .then(function(result) {
            console.log("You selected: " + result.option);

            switch (result.option) {
            case "Add a new department":
                addDepartment();
                BREAK;
            case "Add a new role":
                addRole();
                BREAK;

            case "Add a new employee":
                addEmployee();
                BREAK;

            case "View departments":
                viewDepartments();
                BREAK;

            case "View exhisting roles":
                viewRoles();
                BREAK;

            case "View all employees":
                viewEmployees();
                BREAK;

            case "Change the role for an existing employee":
                changeRole();
                BREAK;

            default:
                quit();
            }
        })
}

//Individual Functions

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the new department?",
        name: "departmentName"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
            if (err) throw err;
            console.table(res)
            begin()
        })
    })
    }

    function addRole() {
        inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary for the new role?",
            name: "salaryTotal"
        },
        {
            type: "input",
            message: "What is the department id for the new role?",
            name: "deptID"
        }
    ])
        .then(function(answer){
            connection.query("INSERT INTO role (name, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptId], function (err, res) {
                if (err) throw err;
                console.table(res)
                begin()
            })
        })
        }
    
        function addEmployee() {
            inquirer.prompt([
            {
                type: "input",
                message: "What is the first name of the new employee?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the last name of the new employee?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the role id for the new employee?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the manager ID number?",
                name: "managerID"
            }
        ])
            .then(function(answer){
                connection.query("INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    begin()
                })
            })
            }
        
            function changeRole() {
                inquirer.prompt([
                {
                    type: "input",
                    message: "Which employee would you like to make changes to?",
                    name: "update"
                },
                {
                    type: "input",
                    message: "What should the employees new role be changed to?",
                    name: "updateRole"
                }
            ])
                .then(function(answer){
                    connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.update],function(err, res) {
                        if (err) throw err;
                        console.table(res)
                        begin()
                    });
                });
                }

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        begin()
    });
}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        begin()
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        begin()
    });
}

function quit() {
    connection.end();
    process.exit();
}