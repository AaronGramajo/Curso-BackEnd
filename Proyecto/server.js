const express = require('express')
const Container = require('./container.js')
// const Routes = require('./routes.js')

const app = express()
const {json,urlencoded, Router, static} = express
const router = Router()
const port = 8080

app.use(json())
app.use(urlencoded({extended:true}))
app.use('/static', static(__dirname + 'public'))

const server = app.listen(port,()=>{
    console.log(`listening on port ${server.address().port}`)
})

server.on('error', (err)=> console.log(`Error en el servidor ${err}`))


// //////////////// variables //////////////
const products = new Container('./productos.txt')


//////////////// rutas //////////////

///get all items
router.get('/api/products', (req, res) => {
    res.json(products.getAll())
})

///search item
router.get('/api/products/:id', (req, res) =>{
    const { id } = req.params 
    res.status(200).json(products.getById(id))
})

///add item
router.post('/api/products', (req, res) => {
    const {title, price} = req.body
    const newproduct = products.save({title, price})
    res.json({
        message :'POST recibido',
        producto: newproduct})
})

/// update item
router.put('/api/products/:id', (req, res) => {
    const { id } = req.params
    const {title, price} = req.body
    const updateProduct = {title, price}
    const updatedporduct = products.update(updateProduct, id)
    res.json({
        mensaje: 'PUT recibido',
        id: id,
        nuevo: updatedporduct
    })
})

/// delete item
router.delete('/api/products/:id', (req, res) => {
    const { id } = req.params
    products.deleteById(id)
    res.json('delete recibido, producto borrado')
})

//////////////// productos //////////////

app.get('/', (request, response) => {
    response.send('<h1 style="color:Blue">Bienvenido al servidor Express</h1>')
})

app.use('/', router)