const { options } = require('../database/config.js')

const knex = require('knex') (options.sqlite)

knex.schema.createTable('Messages', table => {
        table.string('user')
        table.string('message')
        table.varchar('date')
    })
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => knex.destroy())