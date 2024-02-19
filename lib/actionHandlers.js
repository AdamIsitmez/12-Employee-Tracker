const inquirer = require('inquirer');
const db = require('./db');
const Table = require('easy-table');
const { addEmployeePrompt, updateEmployeeRolePrompt, addDepartmentPrompt, addRolePrompt } = require('./questions');
const { getEmployeeIdByTitle, getRoleIdByTitle, getDepartmentIdByName } = require('./util');

//An object that lists the possible actions a user can choose and links them to the corresponding function
const actionHandlers = {
    'View all employees': viewAllEmployees,
    'Add employee': addEmployee,
    'Update employee role': updateEmployeeRole,
    'View all roles': viewAllRoles,
    'Add role': addRole,
    'View all departments': viewAllDepartments,
    'Add department': addDepartment,
    'Quit': quit
};

//creates an array of actions taken from the actionHandlers object. These are used as the choices for the user
const mainChoices = Object.keys(actionHandlers);

//The main menu prompt
async function mainPrompt() {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: mainChoices
            }
        ])
}

//shows employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
async function viewAllEmployees() {
    db.query(`
        SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department_name,
            role.salary, 
            CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
        FROM 
            employee
        JOIN 
            role ON employee.role_id = role.id  
        JOIN 
            department ON role.department_id = department.id
        LEFT JOIN
            employee m ON employee.manager_id = m.id`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\n' + Table.print(results));
        }
    });
}

//uses the input data to add a new employee to the table
async function addEmployee() {
    const data = await addEmployeePrompt();
    const roleId = await getRoleIdByTitle(data.employeeRole)

    let managerId = '';

    if (data.employeeManager === 'None') {
        managerId = null;
    }
    else {
        managerId = await getEmployeeIdByTitle(data.employeeManager);
    }

    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
    const values = [data.employeeFname, data.employeeLname, roleId, managerId]

    db.query(query, values, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\x1b[32m%s\x1b[0m', 'Employee successfully added!');
        }
    });
}

//uses the input data to update an existing employees role
async function updateEmployeeRole() {
    const data = await updateEmployeeRolePrompt();
    const roleId = await getRoleIdByTitle(data.updatedRole)
    const employeeId = await getEmployeeIdByTitle(data.employeeUpdatedRole)
    let newManagerId = '';

    if (data.newManager === 'None') {
        newManagerId = null;
    }
    else {
        newManagerId = await getEmployeeIdByTitle(data.newManager);
    }

    const query = 'UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?'
    const values = [roleId, newManagerId, employeeId]

    db.query(query, values, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\x1b[32m%s\x1b[0m', 'Employee successfully updated!');
        }
    });
}

//shows the title and salary of the role and the department it belongs to
async function viewAllRoles() {
    db.query('SELECT role.title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(Table.print(results));
        }
    });
}

//uses the input data to add a new role to the table
async function addRole() {
    const data = await addRolePrompt();
    const departmentId = await getDepartmentIdByName(data.roleDepartment)

    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
    const values = [data.roleName, data.roleSalary, departmentId]

    db.query(query, values, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\x1b[32m%s\x1b[0m', 'Role successfully added!');
        }
    });
}

//shows a list of all the departments
async function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(Table.print(results));
        }
    });
}

//uses the input data to add a new department to the table
async function addDepartment() {
    const data = await addDepartmentPrompt();

    const query = 'INSERT INTO department (name) VALUES (?)'
    const values = [data.departmentName];

    db.query(query, values, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('\x1b[32m%s\x1b[0m', 'Department successfully added!');
        }
    });
}

//quits the program
async function quit() {
    console.log('Exiting the program...');
    process.exit(0);
}

module.exports = { mainPrompt, viewAllEmployees, actionHandlers }
