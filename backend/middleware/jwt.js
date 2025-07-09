
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function jwtAuth(req, res, next) {
    const authHeader = req.headers['authentication'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        req.token = token
        next();
    });
};

module.exports = {
    jwtAuth
}