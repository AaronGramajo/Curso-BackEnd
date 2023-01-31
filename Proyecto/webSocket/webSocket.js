////////////////  products Mongo ////////////////
const ProductsDaoMongoDb = require('../data_Persistence/Daos/products/productsDaoMongoDb.js')
const productList = new ProductsDaoMongoDb()

////////////////  messages Mongo ////////////////
const MessagesDaoMongoDB = require('../data_Persistence/Daos/messages/messagesDaoMongoDB.js')
const messages = new MessagesDaoMongoDB()

//////////////// webSocket ////////////////
const initSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log('se conecto un usuario')
        socket.emit('message', await messages.getAll())
        socket.emit('productList', await productList.getAll())
        
        socket.on('new-message', async (data) => {
            await messages.save(data)
            io.sockets.emit('message', await messages.getAll())
        })
    
        socket.on('newProductList', async data => {
            await productList.save(data)
            io.sockets.emit('productList', await productList.getAll())
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

module.exports = initSocket