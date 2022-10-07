const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let mensajes = []

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile('index.html', { root:__dirname})
})

const port = 4000
const server = httpServer.listen(port, () => {
    console.log(`listen on port ${server.address().port}`)
})

io.on('connection', (socket) => {
    console.log('a user is connected')
    socket.on('mensaje', (data) => {
        mensajes.push({socketId: socket.id, mensajes: data})
        io.sockets.emit('respuesta-server', mensajes)
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})