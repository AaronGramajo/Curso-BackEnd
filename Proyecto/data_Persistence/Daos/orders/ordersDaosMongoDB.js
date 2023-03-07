const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const orders = require('../../models/orderModel.js')

class OrdersDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(orders)
    }
}

module.exports = OrdersDaoMongoDb