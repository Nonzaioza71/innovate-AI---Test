const { BookService } = require("../services/index")
const book_service = new BookService()

module.exports = class BookController {
    async insertBook(req, res) {
        try {
            const result = await book_service.insertBook(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).json({ message: '[book-insert] Error fetching' })
        }
    }
    async updateBookById(req, res) {
        try {
            const result = await book_service.updateBookById(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).json({ message: '[book-update] Error fetching' })
        }
    }
    async deleteBookById(req, res) {
        try {
            const result = await book_service.deleteBookById(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).json({ message: '[book-delete] Error fetching' })
        }
    }
    async getAllBooks(req, res) {
        try {
            const result = await book_service.getAllBooks(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).json({ message: '[book-get-all] Error fetching' })
        }
    }
    async getBookById(req, res) {
        try {
            const result = await book_service.getBookById(req.body)
            console.log(result);
            
            res.json(result)
        } catch (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).json({ message: '[book-get] Error fetching' })
        }
    }
}