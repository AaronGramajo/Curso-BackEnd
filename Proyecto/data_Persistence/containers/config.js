const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const loggerCustom = require('../../utils/log4js')
require('dotenv').config()

class Connect {
    constructor(model) {
        this.connect()
        this.model = model
    }

    connect() {
        try {
            const URL = process.env.MONGO_CLOUD
            mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            loggerCustom.info('Database connected')
        } catch (error) {
            loggerCustom.error(`error conecting to database, ${error}`)
            }
        }

    async disconnect() {
        try {
            await mongoose.connection.close()
            loggerCustom.info('Database disconnected')
        } catch (error) {
            loggerCustom.error(`error disconnecting database, ${error}`)
        }
    }
}

const mongoAtlas = {
    mongoUrl: process.env.MONGO_CLOUD,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
}

const configMongo = {
    secret: process.env.SECRET_KEY_SESSION,
    store: MongoStore.create(mongoAtlas),
    resave: true,
    saveUninitialized: true
}

    module.exports = {Connect, configMongo}