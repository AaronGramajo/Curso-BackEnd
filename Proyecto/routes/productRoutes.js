const express = require('express')
const Products = require('../containerDB/productsMDB.js')
const ProductsDaoFile = require('../doas/products/productsDaoFile.js')
const ProductsDaoFirebase = require('../doas/products/productsDaoFirebase.js')
const ProductsDaoMem = require('../doas/products/productsDaoMem.js')
const ProductsDaoMongoDb = require('../doas/products/productsDaoMongoDb.js')

const { options } = require('../config.js')
const knex = require('knex') (options.mysql)

const {Router} = express
const router = Router()

// const products = new Products(knex, 'products')
// const products = new ProductsDaoFile()
// const prodcuts = new ProductsDaoFirebase()
// const products = new ProductsDaoMem()
const products = new ProductsDaoMongoDb()

//////////////// rutas ////////////////

///get all items
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await products.getAll())
    } catch (error) {
        res.status(404).json({message: `Products not found ${error}`})
    }
})

///search item
router.get('/:id', async (req, res) => {
    try {
        const product = await products.getById(parseInt(req.params.id))
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: `Product not found ${error}`})
    }
})

///add item
router.post('/', async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body
    try {
        if (title && description && code && price && thumbnail && stock) {
            await products.save({title, description, code, price, thumbnail, stock})
            res.status(201).json({message: 'Product added'})
        } 
    } catch (error) {
        res.status(400).json({message: `Problem adding product ${error}`})
    }
})

/// update item
router.put('/:id', async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body
    const updateProduct = {title, description, code, price, thumbnail, stock}
    try {
        res.status(201).json(await products.update(updateProduct, parseInt(req.params.id)))
    } catch (error) {
        res.status(400).json({message: `Problem updating product ${error}`})
    }
})

/// delete item
router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json(await products.deleteById(parseInt(req.params.id)))
    } catch (error) {
        res.status(400).json({message: `Problem deleting product ${error}`})
    }
})

module.exports = router