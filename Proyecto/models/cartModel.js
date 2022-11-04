const { Schema, model} = require('mongoose')

const cartSchema = new Schema({
    product: {
        type: Array
    }
})
module.exports = model('Carts', cartSchema)