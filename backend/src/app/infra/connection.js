const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'canto1411',
    insecureAuth: true
})

module.exports = connection;