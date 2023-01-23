const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const Products = require('../../models/productsModel.js')

class ProductsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Products)
    }
}

module.exports = ProductsDaoMongoDb