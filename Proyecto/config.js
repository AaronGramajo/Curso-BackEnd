const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
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
            console.log('Database connected')
        } catch (error) {
                console.log(error)
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