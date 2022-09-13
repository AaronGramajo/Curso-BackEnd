const express = require('express')

const app = express()

let count = 0

app.get('/', (request, response) => {
    response.send('<h1 style="color:Blue">Bienvenido al servidor Express</h1>')
})

app.get('/visitas', (request, response) => {
    count++
    response.send({message:'hello', count})
})

app.get('/fyh', (request, response) => {
    response.send({message:'hello'})
})

app.get('/productos', (request, response) => {
    response.send({message:'hello'})
})

app.get('/productoRandom', (request, response) => {
    response.send({message:'hello'})
})

const port = 4000

const server = app.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})

server.on('error', (err)=> console.log(`Error en el servidor ${err}`))