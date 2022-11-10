const ContainerMemory = require('../../containers/containerMemory.js')
const FakerMock = require('../../utils/faker.js')

let products = []

class FakerProductDaoMem extends ContainerMemory {
    constructor() {
        super(products)
    }

    addProducts() {
        for (let i = 0; i < 5; i++) {
            const newProducts = FakerMock.generateProducts()
            const newProductList = this.save(newProducts)
        }
        return products
    }
}

module.exports = FakerProductDaoMem