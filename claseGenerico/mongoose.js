const mongoose = require('mongoose')

const usuarios = require('./models/usuariosModel')

class Users {
    constructor(model){
        this.connect()
        this.model = model
    }

    connect() {
        try {
            const URL = 'mongodb+srv://AmadeusSenpai:46428251239A@cluster0.8uu2d77.mongodb.net/ecommerce?retryWrites=true&w=majority'
            mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Database connected')
            } catch (error) {
                console.log(error)
            }
    }

    async creatUser(user) {
        try {
            const newUser = new this.model(user)
            await newUser.save()
            console.log(`nuevo usuario creado ${newUser}`)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers() {
        try {
            const users = await usuarios.find()
            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser() {
        await usuarios.updateOne()
        console.log('usuario actualizado')
    }

    async deleteUser() {
        await usuarios.deleteOne()
        console.log('usuario borrado')
    }
}

const users = new Users(usuarios)
// users.creatUser({name: 'Nahuel', email: 'nahuelgramajo@gmail.com', password: 'TuAbuela'})
users.getUsers()

// CRUD()

// function CRUD() {
//     try {
//         const URL = 'mongodb://localhost:27017/ecommerce'
//         mongoose.connect(URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         console.log('Database connected')
//     } catch (error) {
//         console.log(error)
//     }
// }