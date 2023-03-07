////////////////  products Mongo ////////////////
const ProductService = require('../service/products_service.js')
const productList = new ProductService()

////////////////  messages Mongo ////////////////
const MessageService = require('../service/messages_service.js')
const messages = new MessageService()

//////////////// webSocket ////////////////
const initSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log('se conecto un usuario')
        socket.emit('message', await messages.getAllMessages())
        socket.emit('productList', await productList.getAllProducts())
        
        socket.on('new-message', async (data) => {
            await messages.createMessage(data)
            io.sockets.emit('message', await messages.getAllMessages())
        })
    
        socket.on('newProductList', async data => {
            await productList.createProduct(data)
            io.sockets.emit('productList', await productList.getAllProducts())
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

module.exports = initSocket