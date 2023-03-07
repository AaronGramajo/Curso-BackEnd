const { Schema, model} = require('mongoose')

const orderSchema = new Schema({
    buyer: { type: String },
    nested: {
        firstName: { type: String },
        lastName: { type: String },
        Email: { type: String }
    },
    products: { type: Array },
    totalPrice: { type: Number }
})
module.exports = model('Orders', orderSchema)