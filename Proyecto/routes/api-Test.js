const FakerProductDaoMem = require('../doas/faker/fakerProductsDaoMem')
const fakerProducts = new FakerProductDaoMem()
const {Router} = require('express')
const apiTestRoute = Router()

///get all items
apiTestRoute.get('/', async (req, res) => {
    try {
        res.status(200).json(await fakerProducts.getAll())
    } catch (error) {
        res.status(404).json({
            message: `Products not found ${error}`
        })
    }
})

///search item
apiTestRoute.get('/:id', async (req, res) => {
    try {
        const product = await fakerProducts.getById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({
            message: `Product not found ${error}`
        })
    }
})

///add item
apiTestRoute.post('/', async (req, res) => {
    try {
        await fakerProducts.save(req.body)
        res.status(201).json({
            message: 'Product added'
        })
    } catch (error) {
        res.status(400).json({
            message: `Problem adding product ${error}`
        })
    }
})

///add multiple items
apiTestRoute.post('/addMultiple', async (req, res) => {
    try {
        await fakerProducts.addProducts()
        res.status(201).json({
            message: 'Products added'
        })
    } catch (error) {
        res.status(400).json({
            message: `Problem adding product ${error}`
        })
    }
})

/// update item
apiTestRoute.put('/:id', async (req, res) => {
    try {
        res.status(201).json(await fakerProducts.update({ ...req.body, id: req.params.id }))
    } catch (error) {
        res.status(400).json({
            message: `Problem updating product ${error}`
        })
    }
})

/// delete item
apiTestRoute.delete('/:id', async (req, res) => {
    try {
        res.status(200).json(await fakerProducts.deleteById(req.params.id))
    } catch (error) {
        res.status(400).json({
            message: `Problem deleting product ${error}`
        })
    }
})

/// delete all
apiTestRoute.delete('/', async (req, res) => {
    try {
        res.status(200).json(await fakerProducts.deleteAll())
    } catch (error) {
        res.status(400).json({
            message: `Problem deleting product ${error}`
        })
    }
})

module.exports = apiTestRoute