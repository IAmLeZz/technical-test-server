const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

exports.query = async (sql, values = []) => {
    const [rows] = await connection.query(sql, values);
    return rows;
};
