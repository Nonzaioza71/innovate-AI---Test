const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


pool.getConnection()
    .then(connection => {
        console.log('Database pool connected successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Failed to connect to database pool:', err.message);
        console.log("process.env.DB_PASSWORD = ", process.env.DB_PASSWORD)
        process.exit(1);
    });

module.exports = pool