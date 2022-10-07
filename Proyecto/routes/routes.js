const express = require('express')
// const multer = require('multer')
const Container = require('../services/container.js')

const {Router} = express
const router = Router()

const products = new Container('./productos.txt')
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cd(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage: storage})

//////////////// rutas //////////////
///get all items
router.get('/', (req, res) => {
    if(products.error) res.status(404).json({message: 'Products not found'})
    res.status(200).json(products.getAll())
})

///search item
router.get('/:id',(req, res) => {
    const {id} = req.params
    if(products.error) res.status(404).json({message: 'Product not found'})
    res.status(200).json(products.getById(id))
})

///add item
router.post('/', (req, res, next) => {
    const {title, price, thumbnail} = req.body
    const newproduct = products.save({title, price, thumbnail})
    res.status(200).json(newproduct)
})

/// update item
router.put('/:id',(req, res) => {
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    const updateProduct = {title, price, thumbnail}
    const updatedporduct = products.update(updateProduct, id)
    res.status(201).json(updatedporduct)
})

/// delete item
router.delete('/:id',(req, res) => {
    const {id} = req.params
    const deletedProduct = products.deleteById(id)
    res.status(200).json(deletedProduct)
})

module.exports = router