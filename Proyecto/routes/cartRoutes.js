const {Router} = require('express')
const cartRouter = Router()

// const CartsDaoFile = require('../doas/carts/cartsDaoFile.js')
const CartsDaoMongoDb = require('../doas/carts/cartsDaoMongoDb')

// const ProductsDaoFile = require('../doas/products/productsDaoFile.js')
const ProductsDaoMongoDb = require('../doas/products/productsDaoMongoDb.js')

const admin = require('../middlewares/Admin.js')

// const carts = new CartsDaoFile()
const carts = new CartsDaoMongoDb()

// const products = new ProductsDaoFile()
const products = new ProductsDaoMongoDb()

///create new cart
cartRouter.post('/', (req, res) => {
    let newCart = []
    carts.save(newCart)
    res.status(200).json(newCart)
})

/// delete cart
cartRouter.delete('/:id',(req, res) => {
    const {id} = req.params
    const deletedCart = carts.deleteCart(id)
    res.status(200).json(deletedCart)
})

///get cart items
cartRouter.get('/:id/products', admin,(req, res) => {
    let admin = true
    if(admin == false) {
        res.json({error: 'unauthorized access to route'})
    } else {
        const {id} = req.params
        let cart = carts.getById(id)
        if(cart.products.length != 0 ) {
            res.status(200).json({id: cart.id, products: cart.products})
        } else {
            res.status(404).json({message: 'Product not found'})
        }
    }
    if(carts.error) res.status(404).json({message: 'Product not found'})
})

///add item to cart
cartRouter.post('/:id/products', (req, res) => {
    const {id} = req.params
    let cart = carts.getById(id)
    const body = req.body.id_prod
    body.forEach(id_prod => {
		let prod = products.getById(id_prod)
		cart.products.push(prod) })
    carts.update(cart)
    res.status(200).json({message: 'products added to cart', cart: cart})
})

/// delete cart item
cartRouter.delete('/:id/products/:id_prod',(req, res) => {
    const {id, id_prod} = req.params
    let cart = carts.getById(id)
    let index = cart.products.findIndex((el,ind) => {
        if(el.id == id_prod) {return true}
    })
    let deletedProduct = cart.products.filter((prod, ind) => prod.id != id_prod)
    cart.products = deletedProduct
    let newCart = carts.update(cart)
    res.status(200).json({message: 'product deleted from cart', cart: cart})
})

module.exports = cartRouter