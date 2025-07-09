const { UserController } = require("../controllers/index");
const { jwtAuth } = require("../middleware/jwt");
const user_controller = new UserController()

module.exports = (app) => {
    app.post('/api/user-register', user_controller.registerUser);
    app.post('/api/user-login', user_controller.getUserByLogin);
    app.post('/api/user-get-self-data', jwtAuth, user_controller.getUserByToken)
    app.post('/api/user-update', jwtAuth, user_controller.updateUserByCode)
}