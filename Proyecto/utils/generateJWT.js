const jwt = require('jsonwebtoken')
require('dotenv').config()

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

function generateToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h'});
    return token
}

module.exports = { generateToken }