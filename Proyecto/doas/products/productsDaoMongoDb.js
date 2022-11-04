const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const Products = require('../../models/productsModel')

class ProductsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Products)
    }
}

module.exports = ProductsDaoMongoDb