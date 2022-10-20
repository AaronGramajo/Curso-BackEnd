const { options } = require('./config')

const knex = require('knex') (options.sqlite)

// crear una tabla nueva

// knex.schema.createTable('users', table => {
//     table.increments('id')
//     table.string('name')
//     table.string('lastName')
//     table.integer('age')
// })
// .then(() => console.log('table created'))
// .catch((err) => {console.log(err); throw err})
// .finally(() => knex.destroy())

// insertar registros

// const users = [
//     {name: 'Aaron', lastName: 'Gramajo', age: 27},
//     {name: 'Abraham', lastName: 'Gramajo', age: 25},
//     {name: 'Nahuel', lastName: 'Ergueta', age: 24},
//     {name: 'Micaela', lastName: 'Ergueta', age: 27}
// ]

// knex('users').insert(users)
//     .then(() => console.log('Registros insertados'))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// select 
// gets all

// knex('users').select('*')
//     .then((data) => console.log(data))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// selects 1

// knex('users').select('*')
//     .then((data) => console.log(data[1]))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// returns users by age higher than 26
// its a search/filter

// knex.from('users').select('name', 'age').where('age', '>', '26')
//     .then((data) => console.log(data))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

//     // can change to get list by descending or ascending
//     knex.from('users').select('name', 'age').where('age', '>', '26').orderBy('age', 'desc')
//     .then((data) => console.log(data))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// update 
// table, catagory, what to change
// knex('users').where('id', 3).update({lastName: 'Ergueta Gramajo'})
//     .then(() => console.log('registro actualizado'))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// delete all
// knex.from('users').del()
//     .then(() => console.log('registro actualizado'))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// delete by group
// knex('users').where('age', 27).del()
//     .then(() => console.log('registro actualizado'))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => knex.destroy())

// const arrayproducts = [
//     {name: 'PlayStation 5', code: 1623, price: 300000, stock: 15},
//     {name: 'Xbox Series X', code: 7241, price: 250000, stock: 10},
//     {name: 'Nintendo Switch', code: 9236, price: 230000, stock: 6},
//     {name: 'Meta Quest 2', code: 1048, price: 280000, stock: 10}
// ]

// (async() => {
//     try {
//         if (knex('products' != null)) {
//             knex.from('products').del()
//         } else {
//             await knex.schema.createTable('products', table => {
//                     table.increments('id')
//                     table.string('name')
//                     table.integer('code')
//                     table.float('price')
//                     table.integer('stock')
//                 })
//                 console.log('tabla creada')
    
//                 await knex('products').insert(arrayproducts)
//                 console.log('Registros insertados')
    
//                 console.log('list of products -->')
//                 rows = await knex.from('products').select('*')
//                 for (row of rows) console.log(`${row['id']} ${row['name']} ${row['code']} ${row['price']} ${row['stock']}`);
    
//                 console.log('borrando id 3')
//                 await knex('products').where('id', 3).del()
    
//                 console.log('actualizando stock de id 2 a 0')
//                 await knex('products').where('id', 2).update({stock: 0})
    
//                 console.log('new list of products -->')
//                 rows = await knex.from('products').select('*')
//                 for (row of rows) console.log(`${row['id']} ${row['name']} ${row['code']} ${row['price']} ${row['stock']}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
//     finally {
//         knex.destroy();
//     }
// })()

