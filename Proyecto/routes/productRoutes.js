const ProductsDaoMongoDb = require('../doas/products/productsDaoMongoDb.js')
const {Router} = require('express')
const logger = require('../utils/log4js.js')

const router = Router()
const products = new ProductsDaoMongoDb()

//////////////// rutas ////////////////

///get all items
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await products.getAll())
    } catch (error) {
        res.status(404).send(logger.error(`Products not found ${error}`))
    }
})

///search item
router.get('/:id', async (req, res) => {
    try {
        const product = await products.getById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: `Product not found ${error}`})
    }
})

///add item
router.post('/', async (req, res) => {
    const {title, price, thumbnail} = req.body
    try {
        if (title && price && thumbnail) {
            await products.save({title, price, thumbnail})
            res.status(201).json({message: 'Product added'})
        } 
    } catch (error) {
        res.status(400).json({message: `Problem adding product ${error}`})
    }
})

/// update item
router.put('/:id', async (req, res) => {
    const {title, price, thumbnail} = req.body
    const updateProduct = {title, price, thumbnail}
    try {
        res.status(201).json(await products.update(updateProduct, req.params.id))
    } catch (error) {
        res.status(400).json({message: `Problem updating product ${error}`})
    }
})

/// delete item
router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json(await products.deleteById(req.params.id))
    } catch (error) {
        res.status(400).json({message: `Problem deleting product ${error}`})
    }
})

module.exports = router