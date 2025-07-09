const { UserModel } = require("../models/index")
const { hashSHA256 } = require("../utils/hash")
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const user_model = new UserModel()

module.exports = class UserService {
    async registerUser(data) {
        const password = hashSHA256(data.password)
        const is_already = await user_model.getUserByData({ email: data.email, username: data.username })
        if (is_already.success) return { success: false, message: 'Username or email already exists.' };
        const result = await user_model.registerUser({ ...data, password })
        return result
    }

    async updateUserByCode(data) {
        const password = hashSHA256(data.password)
        const is_already = await user_model.updateUserByCode({ email: data.email, username: data.username })
        if (is_already.success) return { success: false, message: 'Username or email already exists.' };
        const result = await user_model.registerUser({
            username: data.username,
            email: data.email,
            password: data.password != "" ? password : data.user.password,
            id: data.user.id,
        })
        return result
    }

    async getUserByLogin(data) {
        const password = hashSHA256(data.password)
        const result = await user_model.getUserByLogin({ ...data, password })
        if (result.success == false) return result
        const user = result.data;
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
        return { ...result, data: token }
    }

    async getUserByToken(data) {
        const decoded = jwt.verify(data.token, JWT_SECRET)
        const result = await user_model.getUserByCode(decoded)
        return result
    }
}