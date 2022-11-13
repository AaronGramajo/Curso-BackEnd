const mongoose = require('mongoose')

class Connect {
    constructor(model) {
        this.connect()
        this.model = model
    }

    connect() {
        try {
            const URL = 'mongodb+srv://AmadeusSenpai:46428251239A@cluster0.8uu2d77.mongodb.net/ecommerce?retryWrites=true&w=majority'
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

    const options = {
        mysql: {
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'test'
            }
        },
        sqlite: {
            client: 'sqlite3',
            connection: {
                filename: './database/mydb.sqlite'
            },
            useNullAsDefault: true
        }
    }

let admin = require("firebase-admin");
let serviceAccount = require("../utils/ecommerce-backend-coderh-c0001-firebase-adminsdk-8izyy-bbb7ca5e0c.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

    module.exports = { options, Connect}