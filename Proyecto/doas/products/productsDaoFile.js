const ContainerFile = require('../../containers/containerFiles.js')

class ProductsDaoFile extends ContainerFile {
    constructor() {
        super('container/products.txt')
    }
}

module.exports = ProductsDaoFile