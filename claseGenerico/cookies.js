// las cookies son middleware

// seria la ruta mas el middleware cookies
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
// const FileStore = require('session-file-store')(session)
require('dotenv').config()

const app = express()
const {static, json, urlencoded} = express

// modulas las configuraciones

// const redis = require('redis')
// const client = redis.createClient()
// const RedisStore = require('connect-redis')(session)

// mongo cloud
const config2 = {
    mongoUrl: process.env.MONGO_CLOUD,
    mongoOptions: advancedOptions
}

// mongo local
// const config2 = {
//     mongoUrl: process.env.MONGO_URL
// }

// cloud redis
// const config2 = {
//     host:process.env.REDIS_HOST,
//     port:process.env.REDIS_PORT,
//     client: client,
//     ttl: 60*60*24*7
// }

// local redis

// const config2 = {
//     host:'localhost',
//     port: 6379,
//     client: client,
//     ttl: 60*60*24*7
// }

// file session

// const config2 = {
//     path:'./sessions',
//     ttl: 60*60*24*7 ,
//     retires: 0
// }
const config = {
    secret: process.env.SECRET_KEY_SESSION,
    store: MongoStore.create(config2),
    // store: MongoStore.create(config2),
    // store: new RedisStore(config2),
    // store: new FileStore(config2),
    resave: true,
    saveUninitialized: true
}
// asi quedaria todo modularizado
app.use(session(config))
app.use(cookieParser(process.env.SECRET_KEY_COOKIE))
app.use(static('public'))
app.use(json())
app.use(urlencoded({extended: true}))

// ver todas las cookies
app.get("/", (req, res) => {
    const {cookies, signedCookies} = req
    res.status(200).json({cookies, signedCookies})
})

// setear las cookies
app.get("/set", (req, res) => {
    const {cookies} = req
    res.cookie('nombre', 'aaron', {signed: true}),
    res.status(200).json({
        message: 'cookies seteada', 
        success: true
    })
})

// 
app.get("/setEX", (req, res) => {
    const {cookies} = req
    res.cookie('nombre', 'aaron', {maxAge: 3000}),
    res.status(200).json({
        message: 'cookies seteada', 
        success: true
    })
})

// borrar las cookies
app.get('/clearCookie', (req, res) => {
    const { cookies } = req
    res.clearCookie('nombre'),
    res.status(200).json({
        message: 'cookies borradas'
    })
})

// login session

// middleware for authentication
function auth(req, res , next) {
    if (req.session?.user === 'Aaron' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('<h1>Error de autorizacion</h1>')
}

function auth2(req, res , next) {
    if(req.session.user !== 'Aaron' || password !== 'admin') {
        return res.redirect('/')
    }
    return next()
}

// login
app.post('/session/login', (req, res) => {
    const { username, password } = req.body
    if(username !== 'Aaron' || password !== 'admin') {
        return res.send('incorrect user/password')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

// logged in
app.get('/session', auth, (req, res) => {
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1
    res.send(
        `bienvenido ${req.session.user}
        visitas: ${req.session.visitas}`
    )
})

// logout
app.get('/session/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send(err)
        res.send('<h1>Session cerrada</h1>')
    })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})