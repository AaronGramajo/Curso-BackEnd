const { options } = require('../DB/config.js')

const knex = require('knex') (options.mysql)

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('timestamp')
    table.string('title')
    table.integer('price')
    table.string('thumbnail')
    table.string('description')
    table.varchar('code')
    table.integer('stock')
    })
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => knex.destroy())