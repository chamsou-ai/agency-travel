const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const pool = mysql.createPool(urlDB);
module.exports = pool;
