const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const initSocket = require('./webSocket/webSocket.js')

//////////////// session ////////////////
const session = require('express-session')
const { configMongo } = require('./data_Persistence/containers/config.js')
const passport = require('passport')
const { initPassport } = require('./middlewares/passportAuth.js')

//////////////// Io server socket ////////////////
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {json, urlencoded, static} = express
initSocket(io)


//////////////// routes ////////////////
const routeProducts = require('./routes/productRoutes.js')
const routeCart = require('./routes/cartRoutes.js')
const loginRoute = require('./routes/sessionRoutes.js')
const infoRouter = require('./routes/infoRoutes.js')
const apiRandomRouter = require('./routes/api-Random.js')
const bodyParser = require('body-parser')

//////////////// template engine ////////////////
app.set('views', './views')
app.set('view engine', 'ejs')

// middlewares
app.use(json())
app.use(bodyParser.json())
app.use(urlencoded({extended:true}))
app.use(session(configMongo))
app.use(static(__dirname + '/public'))
app.use(passport.initialize())
app.use(passport.session())
initPassport()
app.use('/api/products', routeProducts)
app.use('/api/cart', routeCart)
app.use('/api/auth', loginRoute)
app.use('/info', infoRouter)
app.use('/api/random', apiRandomRouter)
app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'path not found'
    })
})

const PORT = process.argv[2] || process.env.PORT || 8080
const server = httpServer.listen(PORT,()=>{
    console.log(`listening on port ${server.address().port}`)
})
server.on('error', (err)=> console.log(`Error en el servidor ${err}`))