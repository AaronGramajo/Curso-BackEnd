const jwt = require('jsonwebtoken')
const customLogger = require('../utils/log4js.js')

const auth = (req, res , next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/auth/login')
    }

    return next()
}

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (!token) {
            return res.status(403).send('Access denied')
        }

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = verified;
        next()
    } catch (error) {
        customLogger.error(error)
    }
}


module.exports = {auth, verifyToken}