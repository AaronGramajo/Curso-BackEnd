const jwt = require('jsonwebtoken')
require('dotenv').config()
const customLogger = require('../utils/log4js.js')

const auth = (req, res , next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/auth/login')
    }

    return next()
}

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                error: "not authenticated"
            })
        }
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
            if(err) {
                return res.status(403).json({
                    error: "Access denied"
                })
            }
            req.user = decoded.data
        })
        next()
    } catch (error) {
        customLogger.error(error)
    }
}


module.exports = {auth, verifyToken}