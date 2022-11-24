require('dotenv').config()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({
    path: process.env.MODO == 'server2' ? path.resolve(__dirname, 'server2.env') : path.resolve(__dirname, 'server.env')
})
module.exports = {
    NONDE_ENV: process.env.NONDE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT
}