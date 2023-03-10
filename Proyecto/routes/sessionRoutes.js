const {Router} = require('express')
const passport = require('passport')
const { postLogin, postRegister, getRegister, getLogin, LoggedIn, logOut, registerFailed, loginFailed } = require('../Controllers/sessionControllers.js')
const {auth, verifyToken} = require("../middlewares/auth")

const loginRoute = Router()

//register
loginRoute.get('/register', getRegister)

loginRoute.post('/register', postRegister)

// failed register
loginRoute.get('/failRegister', registerFailed)

// login
loginRoute.get('/login', getLogin)

loginRoute.post('/login', postLogin)

// failed login
loginRoute.get('/failLogin', loginFailed)

// logged in
loginRoute.get('/', LoggedIn)

// visitas
loginRoute.get('/visitas', auth, (req, res) => {
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1
    res.send(
        `bienvenido ${req.session.passport.user}
        visitas: ${req.session.visitas}`
    )
})

// logout
loginRoute.get('/logout', logOut)

// github
loginRoute.get('/github', passport.authenticate('login', {scope: ['user: email']}))

loginRoute.get('/githubcallback', passport.authenticate('login', { successRedirect: '/api/auth/', failureRedirect: '/api/auth/login'}))

module.exports = loginRoute