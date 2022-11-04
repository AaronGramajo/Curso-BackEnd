const { Schema, model} = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        max: 50,
        required: true
    },
    thumbnail: {
        type: String,
        required: true, 
        max: 100
    },
    description: {
        type: String,
        required: true, 
        max: 100
    },
    code: {
        type: Number,
        required: true, 
        max: 100
    },
    stock: {
        type: Number,
        required: true, 
        max: 100
    }
})
module.exports = model('Products', productSchema)