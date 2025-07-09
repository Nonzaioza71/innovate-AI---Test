const crypto = require('crypto');

function hashSHA256(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

module.exports = {
    hashSHA256
}