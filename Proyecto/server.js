const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {normalizedMessages} = require('./utils/normalizr.js')
//////////////// Io server socket ////////////////
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {json, urlencoded, static} = express

//////////////// products and messages SQL////////////////
const Products = require('./containerDB/productsMDB.js')
const Messages = require('./containerDB/chatSQL3.js')
const { options } = require('./config.js')
const knexProducts = require('knex') (options.mysql)
const knexMessages = require('knex') (options.sqlite)
// const messages = new Messages(knexMessages, 'messages')
// const productList = new Products(knexProducts, 'products')

////////////////  messages Mongo ////////////////
const MessagesDaoMongoDB = require('./doas/messages/messagesDaoMongoDB.js')
const messages = new MessagesDaoMongoDB()
const listNormalizedMessages = async() => {
    const message = await messages.getAll()
    const normalizarMensajes = normalizedMessages({id:'message', message})
    return normalizarMensajes
}

//////////////// routes ////////////////
const routeProducts = require('./routes/productRoutes.js')
const routeCart = require('./routes/cartRoutes.js')

//////////////// route mock ////////////////
const apiTestRoute = require('./routes/api-Test.js')
const FakerProductDaoMem = require('./doas/faker/fakerProductsDaoMem.js')
const productList = new FakerProductDaoMem()

//////////////// template engine ////////////////
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(json())
app.use(urlencoded({extended:true}))
app.use(static(__dirname + '/public'))
app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)
app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'path not found'
    })
})

////////////////  mock ////////////////
app.use('/api/productos-test', apiTestRoute)

//////////////// webSocket ////////////////
io.on('connection', async (socket) => {
    console.log('se conecto un usuario')
    socket.emit('message', await listNormalizedMessages())
    socket.emit('productList', await productList.getAll())
    
    socket.on('new-message', async (data) => {
        await messages.save(data)
        io.sockets.emit('message', await listNormalizedMessages())
    })

    socket.on('newProductList', async data => {
        await productList.save(data)
        io.sockets.emit('productList', await productList.getAll())
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})


const port = 8080
const server = httpServer.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})
server.on('error', (err)=> console.log(`Error en el servidor ${err}`))