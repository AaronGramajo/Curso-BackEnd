const ProductsDaoMongoDb = require('../data_Persistence/Daos/products/productsDaoMongoDb.js')
const loggerCustom = require('../utils/log4js.js')
const products = new ProductsDaoMongoDb()

const productGET_All = async (req, res) => {
    try {
        res.status(200).json(await products.getAll())
    } catch (error) {
        res.status(404).send(loggerCustom.error(`Products not found ${error}`))
    }
}

const productGET_By_Id = async (req, res) => {
    try {
        const product = await products.getById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).send(loggerCustom.error(`Product not found ${error}`))
    }
}

const productPost = async (req, res) => {
    const {title, price, thumbnail} = req.body
    try {
        if (title && price && thumbnail) {
            await products.save({title, price, thumbnail})
            res.status(201).json({message: 'Product added'})
        } 
    } catch (error) {
        res.status(400).send(loggerCustom.error(`Problem adding product ${error}`))
    }
}

const productUpdate = async (req, res) => {
    const {title, price, thumbnail} = req.body
    const updateProduct = {title, price, thumbnail}
    try {
        res.status(201).json(await products.update(updateProduct, req.params.id))
    } catch (error) {
        res.status(400).send(loggerCustom.error(`Problem updating product ${error}`))
    }
}

const productDelete = async (req, res) => {
    try {
        res.status(200).json(await products.deleteById(req.params.id))
    } catch (error) {
        res.status(400).send(loggerCustom.error(`Problem deleting product ${error}`))
    }
}

module.exports = { productGET_All, productGET_By_Id, productPost, productUpdate, productDelete }