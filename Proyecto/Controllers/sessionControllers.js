const UsersDaoMongoDb = require('../data_Persistence/Daos/users/usersDaoMongoDb.js')
const {createHash, isValidPassword} = require('../utils/bCrypt.js')

const Users = new UsersDaoMongoDb()

const postLogin = async (req, res) => {
    const { username, password } = req.body
    req.session.user = username
    req.session.admin = true
    const user = await Users.getUsername(username)
    if(!user) {
        return res.status(401).render('pages/failLogin.ejs')
    }
    if(!isValidPassword(user, password)) {
        return res.status(401).render('pages/failLogin.ejs')
    }
    res.redirect('/api/auth/')
}

const postRegister = async (req, res) => {
    const {username, password} = req.body
    const user = await Users.getUsername(username)
    if(user) {
        return res.status(400).render('pages/failRegister.ejs')
    } else {
        await Users.save({ id: Users.length + 1, username, password: createHash(password), admin: true})
        res.send('User registered!')
    }
}

module.exports = {postLogin, postRegister}