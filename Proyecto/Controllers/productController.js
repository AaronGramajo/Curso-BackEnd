const ProductService = require('../service/products_service.js')
const loggerCustom = require('../utils/log4js.js')

class ProductController {

    constructor() {
        this.product = new ProductService()
    }

    productGET_All = async (req, res) => {
        try {
            const products = await this.product.getAllProducts() 
            res.status(200).json(products)
        } catch (error) {
            res.status(404).send(loggerCustom.error(`Products not found ${error}`))
        }
    }

    productGET_By_Id = async (req, res) => {
        try {
            const product = await this.product.getProductById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(404).send(loggerCustom.error(`Product not found ${error}`))
        }
    }

    productPost = async (req, res) => {
        const {title, price, thumbnail} = req.body
        try {
            if (title && price && thumbnail) {
                await this.product.createProduct({title, price, thumbnail})
                res.status(201).json({message: 'Product added'})
            } 
        } catch (error) {
            res.status(400).send(loggerCustom.error(`Problem adding product ${error}`))
        }
    }

    
    productUpdate = async (req, res) => {
        const {title, price, thumbnail} = req.body
        const updateProduct = {title, price, thumbnail}
        try {
            res.status(201).json(await this.product.updateProduct(updateProduct, req.params.id))
        } catch (error) {
            res.status(400).send(loggerCustom.error(`Problem updating product ${error}`))
        }
    }
    
    productDelete = async (req, res) => {
        try {
            res.status(200).json(await this.product.deleteProduct(req.params.id))
        } catch (error) {
            res.status(400).send(loggerCustom.error(`Problem deleting product ${error}`))
        }
    }
}


module.exports = { ProductController }