DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT, 
  FOREIGN KEY (department_id) REFERENCES department (department_id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
    FOREIGN KEY (role_id) REFERENCES role (salary)

    ON DELETE SET NULL
);