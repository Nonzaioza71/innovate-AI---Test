const { BookController } = require("../controllers/index");
const { jwtAuth } = require("../middleware/jwt");
const book_controller = new BookController()

module.exports = (app) => {
    app.post('/api/book-insert', jwtAuth, book_controller.insertBook)
    app.post('/api/book-delete', jwtAuth, book_controller.deleteBookById)
    app.post('/api/book-update', jwtAuth, book_controller.updateBookById)
    app.post('/api/book-get-all', jwtAuth, book_controller.getAllBooks)
    app.post('/api/book-get', jwtAuth, book_controller.getBookById)
}