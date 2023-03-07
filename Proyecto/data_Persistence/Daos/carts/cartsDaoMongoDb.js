const ContainerMongoDb = require('../../containers/containerMongoDb.js')
const loggerCustom = require('../../../utils/log4js.js')

const Carts = require('../../models/cartModel.js')

class CartsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Carts)
    }

    async save(cart) {
        try {
            const newCart = new this.model(cart)
            await newCart.save()
            loggerCustom.info(`new cart added ${newCart}`)
        } catch (error) {
            loggerCustom.error(`error creating cart, ${error}`)
        }
    }

    async getById(id) {
        try {
            return await this.model.find({_id: id})
        } catch (error) {
            loggerCustom.error(`could not find cart, ${error}`)
        }
    }

    async deleteCart(id) {
        try {
            await this.model.deleteOne({_id: id})
            loggerCustom.info('cart deleted')
        } catch (error) {
            loggerCustom.error(`could not delete cart, ${error}`)
        }
    }

    async update(product, id) {
        try {
            await this.model.updateOne({_id: id}, {$set: {product: {_id: product._id, title: product.title, price: product.price, thumbnail: product.thumbnail}}})
            loggerCustom.info('cart updated')
        } catch (error) {
            loggerCustom.error(`could not update product, ${error}`)
        }
    }

    async deleteById(id, prod_id) {
        try {
            let cart = await this.model.get({_id: id})
            await cart.deleteOne({prod_id})
            loggerCustom.info('product deleted')
        } catch (error) {
            loggerCustom.error(`could not delete product, ${error}`)
        }
    }
}

module.exports = CartsDaoMongoDb