module.exports = (app) => {
    require("./user.route")(app),
    require("./book.route")(app)
} 