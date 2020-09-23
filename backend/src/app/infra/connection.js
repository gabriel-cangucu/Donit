const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123',
    insecureAuth: true,
    dateStrings: true
})

module.exports = connection;