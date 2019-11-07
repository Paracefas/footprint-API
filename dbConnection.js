const mysql = require('mysql')

module.exports = () =>
{
    return mysql.createConnection
    ({
        host: 'remotemysql.com',
        user: 'DaL7Gnd5hM',
        password: 'ANkYo7fzvI',
        database: 'DaL7Gnd5hM'
    })
}