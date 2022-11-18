const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    author: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            max: 100
        },
        lastName: {
            type: String,
            required: true,
            max: 100
        },
        age: {
            type: Number,
            required: true,
            max: 100
        },
        alias: {
            type: String,
            required: true,
            max: 100
        },
        avatar: {
            type: String,
            required: true
        }
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})
module.exports = model('messages', messageSchema)