const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file
const urlDB = `mysql://root:a12BGbgDd-fABA1-2eeaAdfB51CHg3Fb@roundhouse.proxy.rlwy.net:15581/railway`;
const pool = mysql.createPool(urlDB);

module.exports = pool;
