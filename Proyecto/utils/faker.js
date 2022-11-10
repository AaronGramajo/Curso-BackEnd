const {faker} = require('@faker-js/faker');
faker.locale = 'es'

const { commerce, image } = faker

class FakerMock {
    static generateProducts() {
        return {
            title: commerce.product(),
            price: commerce.price(100, 5000, 0, '$'),
            thumbnail: image.image()
        }
    }
}

module.exports = FakerMock