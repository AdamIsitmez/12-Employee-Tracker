const mysql = require('mysql2');

//creation of the db connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Terran0p100121!!',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
);

module.exports = db;