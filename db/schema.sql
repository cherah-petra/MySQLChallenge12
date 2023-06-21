DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dName VARCHAR(100) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  dName INT, 
  FOREIGN KEY (department) REFERENCES department (id)
  ON DELETE SET NULL
);

CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee INT, 
  FOREIGN KEY (employee) REFERENCES employee (id)
  
  ON DELETE SET NULL
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role INT, 
    managers INT,
    department INT,
    FOREIGN KEY (role) REFERENCES role (id),
    FOREIGN KEY (managers) REFERENCES managers (id),
    FOREIGN KEY (department) REFERENCES department (id)
  
    ON DELETE SET NULL
);