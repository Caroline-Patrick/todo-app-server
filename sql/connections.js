const mysql = require('mysql2');

require("dotenv").config()

const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE} =process.env
// console.log(process.env)

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    port: DB_PORT,
    password: DB_PASSWORD
    
  });

  module.exports = pool;