const UserService = require('../service/user_service.js')
const ProductService = require('../service/products_service.js')
const { generateToken } = require('../utils/generateJWT.js')
const {createHash, isValidPassword} = require('../utils/bCrypt.js')

const Users = new UserService()
const product = new ProductService()

const getLogin = (req, res) => {
    res.render('pages/login.ejs')
}

const postLogin = async (req, res) => {
    const { username, password } = req.body
    req.session.user = username
    req.session.admin = true
    const user = await Users.getByUsername(username)
    if(!user) {
        return res.status(401).render('pages/failLogin.ejs')
    }
    if(!isValidPassword(user, password)) {
        return res.status(401).render('pages/failLogin.ejs')
    }

    generateToken(user);
    delete user.password;

    res.redirect('/api/auth/')
}

const getRegister = (req, res) => {
    res.render('pages/register.ejs')
}

const postRegister = async (req, res) => {
    const {username, password} = req.body
    const userExists = await Users.getByUsername(username)
    if(userExists) {
        return res.status(400).render('pages/failRegister.ejs')
    }
    const newUser = { username, admin: true}
    await Users.createUser({ id: Users.length + 1, username, password: createHash(password), admin: true})
    generateToken(newUser)
    res.status(201).redirect('/login')
}

const LoggedIn = async (req, res) => {
    const products = await product.getAllProducts()
    let productsExist = false
    if (products) {
        productsExist = true
    }
    res.render('pages/index.ejs', {nombreDeUsuario: req.session.user, products, productsExist})
}

const logOut = (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        res.render('pages/logout.ejs', {nombreDeUsuario: req.session.user})
        req.session.destroy(err => {
            if(err) return res.send(err)
        })
    }
}

const registerFailed = (req, res) => {
    res.send('Please try to register again')
}

const loginFailed = (req, res) => {
    res.send('Please try to login again')
}

module.exports = {getLogin, postLogin, getRegister, postRegister, LoggedIn, logOut, registerFailed, loginFailed}