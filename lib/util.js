const db = require('./db');

//returns an id given the department name
async function getDepartmentIdByName(departmentName) {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM department WHERE name = ?', [departmentName], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id);
                } else {
                    reject('Role not found');
                }
            }
        });
    });
}

//returns an id given the role name
async function getRoleIdByTitle(roleTitle) {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM role WHERE title = ?', [roleTitle], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id);
                } else {
                    reject('Role not found');
                }
            }
        });
    });
}

//returns an id given the employee name
async function getEmployeeIdByTitle(fullname) {
    const nameArray = splitName(fullname);
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM employee WHERE last_name = ? AND first_name = ?', nameArray, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id);
                } else {
                    reject('Employee not found');
                }
            }
        });
    });
}

//splits the full name at the comma to separate the first and last name
function splitName(name) {
    const [lastName, firstName] = name.split(',').map(part => part.trim());
    return [lastName, firstName];
}

module.exports = { getEmployeeIdByTitle, getRoleIdByTitle, getDepartmentIdByName };