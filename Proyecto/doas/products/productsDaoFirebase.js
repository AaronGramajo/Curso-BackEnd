const ContainerFirebase = require("../../containers/containerFirebase")

class ProductsDaoFirebase extends ContainerFirebase {
    constructor() {
        super('Products')
    }
}

module.exports = ProductsDaoFirebase