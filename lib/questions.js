const inquirer = require('inquirer');
const db = require('./db')

//Gets all the titles of the roles and stores it in array
async function getRoles() {
    return new Promise((resolve, reject) => {
        db.query('SELECT title FROM role', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                const roles = result.map(row => row.title);
                resolve(roles);
            }
        })
    })

}

//Gets all the names of the employees and stores them in an array in the format (last_name, first_name)
async function getEmployees() {
    return new Promise((resolve, reject) => {
        db.query('SELECT first_name, last_name FROM employee', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                const employees = result.map(row => `${row.last_name}, ${row.first_name}`)
                resolve(employees);
            }
        })
    })

}

//Gets all the names of the departments and stores it in array
async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT name FROM department', (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                const departments = result.map(row => row.name);
                resolve(departments);
            }
        })
    })

}

//Prompts the user for details about the new role and returns the input data
async function addRolePrompt() {
    //This array is used as a list of choices for the user to choose from
    const departments = await getDepartments();
    const addRoleQuestions = [
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department does the role belong to?',
            choices: departments
        }
    ];

    return inquirer.prompt(addRoleQuestions);
}

//Prompts the user for details about the new employee and returns the input data
async function addEmployeePrompt() {
    //These arrays are used as a list of choices for the user to choose from
    const roles = await getRoles();
    const employees = await getEmployees();
    const managerChoices = employees.concat('None')

    const addEmployeeQuestions = [
        {
            type: 'input',
            name: 'employeeFname',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'employeeLname',
            message: 'What is the employees last name?',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employees role?',
            choices: roles,
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the employees manager?',
            choices: managerChoices,
        }
    ]

    return inquirer.prompt(addEmployeeQuestions)
}

//Prompts the user for details about the new role and returns the input data
async function updateEmployeeRolePrompt() {
    //These arrays are used as a list of choices for the user to choose from
    const roles = await getRoles();
    const employees = await getEmployees();
    const managerChoices = employees.concat('None')
    const updateEmployeeQuestions = [
        {
            type: 'list',
            name: 'employeeUpdatedRole',
            message: "Which employee's role do you want to update?",
            choices: employees
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: 'Which role do you want to assign the selected employee?',
            choices: roles
        },
        {
            type: 'list',
            name: 'newManager',
            message: 'Who is the new manager of the selected employee?',
            choices: managerChoices
        },
    ]

    return inquirer.prompt(updateEmployeeQuestions);
}

//Prompts the user for details about the new department and returns the input data
async function addDepartmentPrompt() {
    const addDepartmentQuestions = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        }
    ]

    return inquirer.prompt(addDepartmentQuestions);
}

module.exports = { addEmployeePrompt, updateEmployeeRolePrompt, addDepartmentPrompt, addRolePrompt };