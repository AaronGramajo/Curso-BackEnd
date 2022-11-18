const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const initSocket = require('./webSocket/webSocket.js')
const auth = require('./middlewares/auth.js')
//////////////// session ////////////////
const session = require('express-session')
const { configMongo } = require('./config.js')

//////////////// Io server socket ////////////////
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
initSocket(io)

const {json, urlencoded, static} = express

//////////////// routes ////////////////
const routeProducts = require('./routes/productRoutes.js')
const routeCart = require('./routes/cartRoutes.js')
const loginRoute = require('./routes/sessionRoutes.js')
const apiTestRoute = require('./routes/api-Test.js')

//////////////// template engine ////////////////
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(json())
app.use(urlencoded({extended:true}))
app.use(session(configMongo))
app.use(static(__dirname + '/public'))
app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)
app.use('/session', loginRoute)
app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'path not found'
    })
})

////////////////  mock ////////////////
// const FakerProductDaoMem = require('./doas/faker/fakerProductsDaoMem.js')
// const productList = new FakerProductDaoMem()
app.use('/api/productos-test', apiTestRoute)

const port = 8080
const server = httpServer.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})
server.on('error', (err)=> console.log(`Error en el servidor ${err}`))