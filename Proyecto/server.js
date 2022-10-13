const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const Container = require('./services/products.js')
const Messages = require('./services/messages.js')

const routeProducts = require('./routes/productRoutes.js')
const routeCart = require('./routes/cartRoutes.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {json, urlencoded, static} = express

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(json())
app.use(urlencoded({extended:true}))
app.use(static(__dirname + '/public'))
app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)

const messages = new Messages('./container/messages.txt')
const productList = new Container('./container/products.txt')

io.on('connection', async (socket) => {
    console.log('se conecto un usuario')
    socket.emit('message', await messages.getAll())
    socket.emit('productList', productList.getAll())
    
    socket.on('new-message', async (data) => {
        await messages.save(data)
        io.sockets.emit('message', await messages.getAll())
    })

    socket.on('newProductList', data => {
        productList.save(data)
        io.sockets.emit('productList', productList.getAll())
    })
})


const port = 8080
const server = httpServer.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})
server.on('error', (err)=> console.log(`Error en el servidor ${err}`))