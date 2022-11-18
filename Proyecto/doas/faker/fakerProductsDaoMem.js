const ContainerFile = require('../../containers/containerFiles.js')
const FakerMock = require('../../utils/faker.js')

class FakerProductDaoMem extends ContainerFile {
    constructor() {
        super('container/faker.txt')
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