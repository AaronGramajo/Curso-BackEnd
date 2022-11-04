const mongoose = require('mongoose')

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

class Connect {
    constructor() {
        this.connect()
    }

    connect() {
        try {
            const URL = 'mongodb://localhost:27017/ecommerce'
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

module.exports = { options, Connect }