const express = require('express')
const moment = require('moment')
const Container = require('./container.js')

const app = express()

const port = 8080

const server = app.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})

server.on('error', (err)=> console.log(`Error en el servidor ${err}`))

let count = 0
const time = moment().format("MMM Do YY, h:mm:ss a")
const productos = new Container('./productos.txt')

app.get('/', (request, response) => {
    response.send('<h1 style="color:Blue">Bienvenido al servidor Express</h1>')
})

app.get('/visitas', (request, response) => {
    count++
    response.send({message: `la cantidad de visitas es ${count}`})
})

app.get('/fyh', (request, response) => {
    response.send({fyh: `${time}`})
})

app.get('/productos', (request, response) => {
    response.json(productos.getAll())
})

app.get('/productoRandom', (request, response) => {
    response.json(productos.getRandom())
})
