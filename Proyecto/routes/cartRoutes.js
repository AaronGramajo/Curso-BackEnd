const {Router} = require('express')
const { deleteCartItem, creatCart, deleteCart, getCartItems, addCartItem } = require('../Controllers/cartController')
const Admin = require('../middlewares/Admin')
const cartRouter = Router()

///create new cart
cartRouter.post('/', creatCart)

/// delete cart
cartRouter.delete('/:id', deleteCart)

///get cart items
cartRouter.get('/:id/products', Admin, getCartItems)

///add item to cart
cartRouter.post('/:id/products', addCartItem)

/// delete cart item
cartRouter.delete('/:id/products/:id_prod', deleteCartItem)

module.exports = cartRouter