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
            filename: './mydb.sqlite'
        },
        useNullAsDefault: true
    }
}

module.exports = { options }