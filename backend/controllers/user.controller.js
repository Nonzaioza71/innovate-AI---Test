const { UserService } = require("../services/index")
const user_service = new UserService()

module.exports = class UserController {
    async registerUser(req, res) {
        try {
            const result = await user_service.registerUser(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ message: '[user-register] Error fetching' })
        }
    }
    async getUserByLogin(req, res) {
        try {
            const result = await user_service.getUserByLogin(req.body)
            res.json(result)
        } catch (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ message: '[user-login] Error fetching' })
        }
    }
    async getUserByToken(req, res) {
        try {
            const result = await user_service.getUserByToken(req)
            res.json(result)
        } catch (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ message: '[user-get-self-data] Error fetching' })
        }
    }
    async updateUserByCode(req, res) {
        try {
            const result = await user_service.updateUserByCode(req)
            res.json(result)
        } catch (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ message: '[user-register] Error fetching' })
        }
    }
}