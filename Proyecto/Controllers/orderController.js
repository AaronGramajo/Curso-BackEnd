const OrderService = require('../service/orders_service.js')
const CartDaos = require('../data_Persistence/Daos/carts/cartsDaoMongoDb.js')
const customLogger = require('../utils/log4js.js')

const order = new OrderService()
const carts = new CartDaos()

const orderPost = async (req, res) => {
    try {
        const {id} = req.params
        let cart = await carts.getById(id)
        return await order.createOrder()
    } catch (error) {
        customLogger.error(error)
    }
}

const getOrder = async (req, res) => {
    try {
        const {id} = req.params
        let cart = await carts.getById(id)
        if(cart[0].product.length != 0 ) {
            return res.status(200).json({id: cart.id, products: cart.product})
        }
        return res.status(400).send('no products found')
    } catch (error) {
        customLogger.error(error)
    }
}

module.exports = { orderPost, getOrder}