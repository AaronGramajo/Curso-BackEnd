const OrdersDao = require('../data_Persistence/Daos/orders/ordersDaosMongoDB.js')

class OrderService {
    constructor() {
        this.orderDaos = new OrdersDao()
    }

    async createOrder(order) {
        try {
            return await this.orderDaos.save(order)
        } catch (error) {
            customLogger.error(error)
        }
    }

    async getOrderById(id) {
        try {
            return await this.orderDaos.getById(id)
        } catch (error) {
            customLogger.error(error)
        }
    }
}

module.exports = OrderService