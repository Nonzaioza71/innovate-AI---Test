const connection = require("../configs/connection");

module.exports = class BookModel {

    async insertBook(data) {
        try {
            if (Array.isArray(data)) {
                const sql = `
                    INSERT INTO books (title, author, published_year, genre, created_at, updated_at)
                    VALUES ${data.map(() => '(?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)').join(',')}
                `;
                const values = data.flatMap(book => [
                    book.title,
                    book.author,
                    book.published_year,
                    book.genre
                ]);
                const [result] = await connection.execute(sql, values);
                return { success: true, affectedRows: result.affectedRows };
            } else {
                const sql = `
                    INSERT INTO books (title, author, published_year, genre, created_at, updated_at)
                    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `;
                const values = [data.title, data.author, data.published_year, data.genre];
                const [result] = await connection.execute(sql, values);
                return { success: true, bookId: result.insertId };
            }
        } catch (error) {
            console.error("InsertBook Error:", error.message);
            return { success: false, error };
        } finally {
            if (connection) connection.releaseConnection();
        }
    }

    async updateBookById(data) {
        try {
            const sql = `
            UPDATE books 
            SET title = ?, author = ?, published_year = ?, genre = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
            const values = [data.title, data.author, data.published_year, data.genre, data.id];
            const [result] = await connection.execute(sql, values);
            return { success: result.affectedRows === 1 };
        } catch (error) {
            console.error("UpdateBook Error:", error.message);
            return { success: false, error };
        } finally {
            if (connection) connection.releaseConnection();
        }
    }

    async deleteBookById(data) {
        try {
            const sql = 'DELETE FROM books WHERE id = ?';
            const [result] = await connection.execute(sql, [data.id]);
            return { success: result.affectedRows === 1 };
        } catch (error) {
            console.error("DeleteBook Error:", error.message);
            return { success: false, error };
        } finally {
            if (connection) connection.releaseConnection();
        }
    }

    async getAllBooks(data) {
        try {
            let result = {books: [], categories: []}
            const cond = data || {}
            const conditions = Object.keys(cond)
                .map(key => `AND ${key} LIKE '%?%'`)
                .join(' ');

            const sql = `SELECT * FROM books WHERE TRUE ${conditions}`;
            const values = Object.values(cond);
            const sql_get_categories = "SELECT genre FROM books WHERE TRUE"
            let [rows] = await connection.execute(sql, values);
            result.books = rows
            if (connection) connection.releaseConnection();
            [rows] = await connection.execute(sql_get_categories);
            result.categories = rows
            return { success: true, data: result };
        } catch (error) {
            console.error("GetAllBooks Error:", error.message);
            return { success: false, error };
        } finally {
            if (connection) connection.releaseConnection();
        }
    }

    async getBookById(data) {
        try {
            const sql = 'SELECT * FROM books WHERE id = ?';
            const [rows] = await connection.execute(sql, [data.id]);
            if (rows.length === 1) {
                return { success: true, data: rows[0] };
            } else {
                return { success: false, message: 'Book not found' };
            }
        } catch (error) {
            console.error("GetBookById Error:", error.message);
            return { success: false, error };
        } finally {
            if (connection) connection.releaseConnection();
        }
    }

}