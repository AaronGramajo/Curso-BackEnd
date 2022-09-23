// const express = require('express')
// const Container = require('./container.js')

// const app = express()
// const {Router} = express
// const router = Router()

// // app.use(json())
// // app.use(urlencoded({extended:true}))

// const products = new Container('./productos.txt')

// //////////////// rutas //////////////
// class Routes {
//     constructor(router) {
//         this.router = router
//     }

//     ///get all items
//     router.get('/api/products', (req, res) => {
//         res.json(products.getAll())
//     })
    
//     ///search item
//     router.get('/api/products/:id', (req, res) =>{
//         const { id } = req.params 
//         res.status(200).json(products.getById(id))
//     })
    
//     ///add item
//     router.post('/api/products', (req, res) => {
//         const {title, price} = req.body
//         const newproduct = products.save({title, price})
//         res.json({
//             message :'POST recibido',
//             producto: newproduct})
//     })
    
//     /// update item
//     router.put('/api/products/:id', (req, res) => {
//         const { id } = req.params
//         const {title, price} = req.body
//         const updateProduct = {title, price}
//         const updatedporduct = products.update(updateProduct, id)
//         res.json({
//             mensaje: 'PUT recibido',
//             id: id,
//             nuevo: updatedporduct
//         })
//     })
    
//     /// delete item
//     router.delete('/api/products/:id', (req, res) => {
//         const { id } = req.params
//         products.deleteById(id)
//         res.json('delete recibido, producto borrado')
//     })
// }

// module.exports = Routes