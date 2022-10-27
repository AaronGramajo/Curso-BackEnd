const { Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        max: 100,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true, 
        max: 100
    }
})

module.exports = model('Usuarios', userSchema)