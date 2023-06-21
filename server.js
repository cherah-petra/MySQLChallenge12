//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet")

const db = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  begin();
  
});

function begin() {
    figlet("Employee Tracker 2000", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })

  inquirer
    .prompt({
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
        "Quit",
      ],
      message: "What would you like to do?",
      name: "option",
    })
    .then(function (result) {
      console.log("You selected: " + result.option);

      switch (result.option) {
        case "Add a new department":
          addDepartment();
          return;
        case "Add a new role":
          addRole();
          return;

        case "Add a new employee":
          addEmployee();
          return;

        case "View departments":
          viewDepartments();
          return;

        case "View exhisting roles":
          viewRoles();
          return;

        case "View all employees":
          viewEmployees();
          return;

        case "Change the role for an existing employee":
          changeRole();
          return;

        default:
          quit();
      }
    });
}

//Individual Functions

function addDepartment() {
    figlet("Add a Department", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "dName",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (dName) VALUES (?)",
        [answer.dName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function addRole() {
    figlet("Add a Role", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new role?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for the new role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id for the new role?",
        name: "dName",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO role (title, salary, dName) VALUES (?, ?, ?)",
        [answer.title, answer.salary, answer.dName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function addEmployee() {
    figlet("Add an Employee", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the role id for the new employee?",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the manager ID number?",
        name: "manager_id",
      },
      {
        type: "input",
        message: "What is the department ID number?",
        name: "dName",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function changeRole() {
    figlet("Change Role", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to make changes to?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What should the employees new role be changed to?",
        name: "title",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        [answer.title, answer.first_name],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function viewDepartments() {
    figlet("View Departments", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  let query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}

function viewRoles() {
    figlet("View Roles", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  let query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}

function viewEmployees() {
    figlet("View Employees", function(err, res) {
        if(err) {
            console.log(err)
            return
        }
        console.log(res)
    })
  let query = "SELECT * FROM employee";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}


function quit() {
  db.end();
  process.exit();
}
