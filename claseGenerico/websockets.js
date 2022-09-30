const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile('index.html', { root:__dirname})
})

const port = 3000
const server = httpServer.listen(port, () => {
    console.log(`escuchando en el port ${server.address().port}`) 
})

const arrayMensajes = []

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado')
    console.log(socket.id)
    // para mandar un mensaje
    //emit tiene dos parametro (nombre del mensaje, el mensaje)
    socket.emit('saludo', 'hola desde el lado del servidor')
    //escuchando la respuesta del lado del cliente
    socket.on('respuesta', (data) => {
        console.log(data)
        // mete nuestro mensajes en el array y lo guarda con el id y mensaje
        arrayMensajes.push({socketId: socket.id, mensaje: data})
        //manda el mensaje global a todos los usuarios
        io.sockets.emit('respuesta-server', arrayMensajes)
    })

    // detecta cuando se desconecta el usuario
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})