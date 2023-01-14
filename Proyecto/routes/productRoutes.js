const {Router} = require('express')
const router = Router()

const { productGET_All, productGET_By_Id, productPost, productUpdate, productDelete } = require('../Controllers/productController.js')

//////////////// rutas ////////////////

///get all items
router.get('/', productGET_All)

///search item
router.get('/:id', productGET_By_Id) 

///add item
router.post('/', productPost)

/// update item
router.put('/:id', productUpdate)

/// delete item
router.delete('/:id', productDelete)

module.exports = router