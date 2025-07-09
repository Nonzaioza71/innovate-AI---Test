const connection = require("../configs/connection");
const { formatSQL } = require("../utils/debug");

module.exports = class UserModel {

    async registerUser(data) {
        try {
            const sql = 'INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, current_timestamp(), current_timestamp())';
            const values = [data.username, data.password, data.email];
            const [insertResult] = await connection.execute(sql, values);
            if (insertResult.affectedRows === 1) {
                console.log("models/user.model.js>registerUser : ", `User registered successfully with ID: ${insertResult.insertId}`);
                return { success: true, data: insertResult.insertId, message: 'User registered successfully.' };
            } else {
                console.warn(`User registration affected ${insertResult.affectedRows} rows. Expected 1.`);
                return { success: false, message: 'No rows were inserted.' };
            }
        } catch (error) {
            console.error('Error during user registration:', error.message);
            return { success: false, message: 'Database error during registration.', errorDetails: error };
        } finally {
            if (connection) {
                connection.releaseConnection();
                console.log("models/user.model.js>registerUser : ", 'Database connection released.');
            }
        }
    }

    async getUserByData(data) {
        try {
            const conditions = Object.keys(data)
                .map(key => `AND ${key} = ?`)
                .join(' ');

            const sql = `
                SELECT id, username, email, created_at, updated_at FROM users 
                WHERE TRUE ${conditions}
            `;

            const values = Object.values(data);

            const [rows] = await connection.execute(sql, values);

            if (rows.length === 1) {
                console.log("models/user.model.js>getUserByLogin : ", `Get user with data : ${data.username}`);
                return { success: true, data: rows[0] };
            } else {
                console.warn(`Login failed for user: ${data.username}`);
                return { success: false, message: 'Invalid username or password.' };
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            return { success: false, message: 'Database error during login.', errorDetails: error };
        } finally {
            if (connection) {
                connection.releaseConnection();
                console.log("models/user.model.js>getUserByLogin : ", 'Database connection released.');
            }
        }
    }

    async getUserByLogin(data) {
        try {
            console.log(data);

            const sql = 'SELECT id, username, password, email, created_at, updated_at FROM users WHERE username = ? AND password = ?';
            const values = [data.username, data.password];
            const [rows] = await connection.execute(sql, values);

            console.log(formatSQL(sql, values));

            if (rows.length === 1) {
                console.log("models/user.model.js>getUserByLogin : ", `Login successful for user: ${data.username}`);
                return { success: true, data: rows[0] };
            } else {
                console.warn(`Login failed for user: ${data.username}`);
                return { success: false, message: 'Invalid username or password.' };
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            return { success: false, message: 'Database error during login.', errorDetails: error };
        } finally {
            if (connection) {
                connection.releaseConnection();
                console.log("models/user.model.js>getUserByLogin : ", 'Database connection released.');
            }
        }
    }

    async getUserByCode(data) {
        try {
            const sql = 'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?';
            const [rows] = await connection.execute(sql, [data.id]);

            if (rows.length === 1) {
                console.log("models/user.model.js>getUserByCode : ", `User found with ID: ${data.id}`);
                return { success: true, data: rows[0] };
            } else {
                console.warn(`No user found with ID: ${data.id}`);
                return { success: false, message: 'User not found.' };
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error.message);
            return { success: false, message: 'Database error during user fetch.', errorDetails: error };
        } finally {
            if (connection) {
                connection.releaseConnection();
                console.log("models/user.model.js>getUserByCode : ", 'Database connection released.');
            }
        }
    }

    async updateUserByCode(data) {
        try {

            const str_update = Object.keys(data)
                .map(key => `${key} = ?, `)
                .join(' ');

            const sql = `
                UPDATE users SET ${str_update} updated_at = current_timestamp() WHERE id = ?
            `;

            const values = Object.values(data);

            const [rows] = await connection.execute(sql, values);

            if (result.affectedRows === 1) {
                console.log("models/user.model.js>updateUserByCode : ", `User with ID ${data.id} updated successfully.`);
                return { success: true, message: 'User updated successfully.' };
            } else {
                console.warn(`Update affected ${result.affectedRows} rows. Expected 1.`);
                return { success: false, message: 'No rows were updated.' };
            }
        } catch (error) {
            console.error('Error during user update:', error.message);
            return { success: false, message: 'Database error during update.', errorDetails: error };
        } finally {
            if (connection) {
                connection.releaseConnection();
                console.log("models/user.model.js>updateUserByCode : ", 'Database connection released.');
            }
        }
    }

}