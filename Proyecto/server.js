const express = require('express')
const routeProducts = require('./Routes.js')

const app = express()
const {json,urlencoded, static} = express
const port = 8080

app.use(json())
app.use(urlencoded({extended:true}))
app.use('/static', static(__dirname + 'public'))
app.use('/api/products', routeProducts)

const server = app.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})

server.on('error', (err)=> console.log(`Error en el servidor ${err}`))

//////////////// productos //////////////

app.get('/', (request, response) => {
    response.send('<h1 style="color:Blue">Bienvenido al servidor Express</h1>')
})