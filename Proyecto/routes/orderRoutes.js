const {Router} = require('express')
const { orderPost, getOrder } = require('../Controllers/orderController')
const orderRouter = Router()

///create new order
orderRouter.post('/', orderPost)

///get order
orderRouter.get('/', getOrder)

module.exports = orderRouter