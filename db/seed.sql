INSERT INTO department (name)
VALUES 
('Engineering'),
('Sales'),
('Legal'),
('Marketing'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 4), 
('Sales Rep', 85000, 4), 
('Mechanical Engineer', 80000, 1), 
('Engineering Manager', 100000, 1), 
('Accountant', 90000, 2), 
('Accountant Manager', 110000, 2), 
('Lawyer', 120000, 3),
('Legal Team Lead', 140000, 3),
('Web Developer', 1000000, 5),
('Tech Support', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Alice', 'Johnson', 1, NULL),
('David', 'Jones', 4, NULL),
('Frank', 'Miller', 6, NULL),
('Henry', 'Taylor', 8, NULL),
('Ivy', 'Martinez', 9, NULL),
('Jack', 'Anderson', 10, NULL),
('Ben', 'Williams', 2, 1),
('Charlie', 'Brown', 3, 2),
('Emma', 'Davis', 5, 3),
('Grace', 'Wilson', 7, 4);

