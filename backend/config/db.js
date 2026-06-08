<<<<<<< HEAD
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "200757gn",
  database: process.env.DB_NAME || "cinema_booking",
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
  dateStrings: false,
});

module.exports = pool;
=======
require("dotenv").config();
const mysql = require("mysql2/promise");

const db = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return connection;
};

module.exports = db;
>>>>>>> c6e30be9c1fd962262ba33a28d426ed0e9f59516
