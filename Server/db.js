const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file
const urlDB =process.env.DB_URL
const pool = mysql.createPool(urlDB);

module.exports = pool;
