const { BookModel } = require("../models/index")

const book_model = new BookModel()

module.exports = class BookService {
    async insertBook(data){
        const result = await book_model.insertBook(data)
        return result
    }

    async updateBookById(data){
        const result = await book_model.updateBookById(data)
        return result
    }

    async deleteBookById(data){
        const result = await book_model.deleteBookById(data)
        return result
    }

    async getAllBooks(data){
        const result = await book_model.getAllBooks(data)
        return result
    }

    async getBookById(data){
        const result = await book_model.getBookById(data)
        return result
    }
}