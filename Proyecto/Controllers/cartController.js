const CartsDaoMongoDb = require('../data_Persistence/Daos/carts/cartsDaoMongoDb')
const ProductsDaoMongoDb = require('../data_Persistence/Daos/products/productsDaoMongoDb.js')

const loggerCustom = require('../utils/log4js')

const carts = new CartsDaoMongoDb()
const products = new ProductsDaoMongoDb()

const creatCart = async (req, res) => {
    try {
        let newCart = []
        await carts.save(newCart)
        res.status(200).json(newCart)
    } catch (error) {
        res.status(400).send(loggerCustom.error(`problem creating cart ${error}`))
    }
}

const deleteCart = async (req, res) => {
    try {
        const {id} = req.params
        const deletedCart = await carts.deleteCart(id)
        res.status(200).json(deletedCart)
    } catch (error) {
        res.status(400).send(loggerCustom.error(`problem deleting cart ${error}`))
    }
}

const getCartItems = async (req, res) => {
    let admin = true

    try {
        if(admin == false) {
            res.send({error: 'unauthorized access to route'})
        } else {
            const {id} = req.params
            let cart = await carts.getById(id)
            console.log(cart)
            console.log(cart[0].product)
            if(cart[0].product.length != 0 ) {
                res.status(200).json({id: cart.id, products: cart.product})
            }
        }
        
    } catch (error) {
        res.status(400).send(loggerCustom.error(`product not found ${error}`))
    }
}

const addCartItem = async (req, res) => {
    // const {id} = req.params
    // let cart = carts.getById(id)
    // const body = req.body.id_prod
    // console.log(req.body)
    // body.forEach(id_prod => {
	// 	let prod = products.getById(id_prod)
	// 	cart.products.push(prod) })
    // carts.update(cart)
    // res.status(200).json({message: 'products added to cart', cart: cart})
    try {
        const {id} = req.params
        let cart = await carts.getById(id)
        cart = cart[0]
        console.log(cart)
        // console.log(cart.product)
        console.log(req.body)
        req.body.forEach(async (_id) => {
            let prod = await products.getById(_id)
            console.log(prod)
            cart.product.push(prod[0])
            console.log(cart.product)
            console.log(cart)
        })
        // carts.update(cart.product[0], id)
        // console.log(await carts.getById(id))
        // console.log(cart)
        // console.log(cart.product)
        res.status(200).json({message: 'products added to cart', cart: cart})
    } catch (error) {
        res.status(400).send(loggerCustom.error(`problem adding item to cart ${error}`))
    }
}

const deleteCartItem = async (req, res) => {
    const {id, id_prod} = req.params
    let cart = await carts.getById(id)
    cart = cart[0]
    let index = cart.products.findIndex((el,ind) => {
        if(el._id == id_prod) {return true}
    })
    let deletedProduct = cart.products.filter((prod, ind) => prod.id != id_prod)
    cart.products = deletedProduct
    let newCart = carts.update(cart)
    res.status(200).json({message: 'product deleted from cart', cart: cart})
}

module.exports = { creatCart, deleteCart, getCartItems, addCartItem, deleteCartItem }