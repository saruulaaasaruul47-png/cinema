const mysql = require("mysql2/promise");

const db = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Srulma2429!",
        database: "cinema_booking"
    });
    return connection;
}

module.exports = db;