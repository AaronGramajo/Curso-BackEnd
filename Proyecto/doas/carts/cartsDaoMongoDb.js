const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const Carts = require('../../models/cartModel.js')

class CartsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Carts)
    }

    async save(cart) {
        try {
            const newCart = new this.model(cart)
            await newCart.save()
            console.log(`new cart added ${newCart}`)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            return await this.model.find({_id: id})
        } catch (error) {
            console.log(`could not find cart, ${error}`)
        }
    }

    async deleteCart(id) {
        try {
            await this.model.deleteOne({_id: id})
            console.log('cart deleted')
        } catch (error) {
            console.log(`could not delete cart, ${error}`)
        }
    }

    async update(product, id) {
        try {
            await this.model.updateOne({_id: id}, {$set: {product: {_id: product._id, title: product.title, price: product.price, thumbnail: product.thumbnail}}})
            console.log('cart updated')
        } catch (error) {
            console.log(`could not update product, ${error}`)
        }
    }

    async deleteById(id, prod_id) {
        try {
            let cart = await this.model.get({_id: id})
            await cart.deleteOne({prod_id})
            console.log('product deleted')
        } catch (error) {
            console.log(`could not delete product, ${error}`)
        }
    }
}

module.exports = CartsDaoMongoDb