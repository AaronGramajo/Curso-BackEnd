const {Router} = require('express')
const router = Router()

const { ProductController } = require('../Controllers/productController.js')

const productController = new ProductController()

//////////////// rutas ////////////////

///get all items
router.get('/', productController.productGET_All)

///search item
router.get('/:id', productController.productGET_By_Id) 

///add item
router.post('/', productController.productPost)

/// update item
router.put('/:id', productController.productUpdate)

/// delete item
router.delete('/:id', productController.productDelete)

module.exports = router