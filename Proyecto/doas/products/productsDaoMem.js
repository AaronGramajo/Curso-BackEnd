const ContainerMemory = require('../../containers/containerMemory')

let products = []

class ProductsDaoMem extends ContainerMemory {
    constructor() {
        super(products)
    }
}

module.exports = ProductsDaoMem