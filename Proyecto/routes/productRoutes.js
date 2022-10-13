const express = require('express')
// const multer = require('multer')
const Container = require('../services/products.js')

const {Router} = express
const router = Router()

const products = new Container('./container/products.txt')
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
    const {title, description, code, price, thumbnail, stock} = req.body
    const newProduct = products.save({title, description, code, price, thumbnail, stock})
    res.status(200).json(newProduct)
})

/// update item
router.put('/:id',(req, res) => {
    const {id} = req.params
    const {title, description, code, price, thumbnail, stock} = req.body
    const updateProduct = {title, description, code, price, thumbnail, stock}
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