const ProductsDaoMongoDb = require('../data_Persistence/Daos/products/productsDaoMongoDb.js')
const customLogger = require('../utils/log4js.js')

class ProductService {
    constructor() {
        this.productDaos = new ProductsDaoMongoDb()
    }

    async getAllProducts() {
        try {
            return await this.productDaos.getAll()
        } catch (error) {
            customLogger.error(error)
        }
    }

    async getProductById(id) {
        try {
            const product = await this.productDaos.getById(id)
            return product
        } catch (error) {
            customLogger.error(error)
        }
    }

    async createProduct(product) {
        try {
            const productWithDate = {
                ...product, dateCreated: Date.now()
            }
            const newProduct = await this.productDaos.save(productWithDate)
            return newProduct
        } catch (error) {
            customLogger.error(error)
        }
    }

    async updateProduct(product, id) {
        try {
            const updateProduct = await this.productDaos.update(product, id)
            return updateProduct
        } catch (error) {
            customLogger.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            await this.productDaos.deleteById(id)
        } catch (error) {
            customLogger.error(error)
        }
    }
}

module.exports = ProductService