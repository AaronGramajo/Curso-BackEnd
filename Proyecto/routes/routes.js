const express = require('express')
const Container = require('../services/container.js')

const {Router} = express
const router = Router()

const products = new Container('./productos.txt')

//////////////// rutas //////////////
///get all items
router.get('/', (req, res) => {
    res.json(products.getAll())
})

///search item
router.get('/:id',(req, res) => {
    const {id} = req.params
    res.status(200).json(products.getById(id))
})

///add item
router.post('/',(req, res) => {
    const {title,price} = req.body
    const newproduct = products.save({title,price})
    res.json({
        message: 'POST recibido',
        producto: newproduct
    })
})

/// update item
router.put('/:id',(req, res) => {
    const {id} = req.params
    const {title,price} = req.body
    const updateProduct = {title,price}
    const updatedporduct = products.update(updateProduct, id)
    res.json({
        mensaje: 'PUT recibido',
        id: id,
        nuevo: updatedporduct
    })
})

/// delete item
router.delete('/:id',(req, res) => {
    const {id} = req.params
    products.deleteById(id)
    res.json('delete recibido, producto borrado')
})

module.exports = router