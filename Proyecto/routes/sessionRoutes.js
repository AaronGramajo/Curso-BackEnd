const {Router} = require('express')
const passport = require('passport')
const { postLogin, postRegister } = require('../Controllers/sessionControllers.js')
const {auth} = require("../middlewares/auth")

const loginRoute = Router()

//register
loginRoute.get('/register', (req, res) => {
    res.render('pages/register.ejs')
})

loginRoute.post('/register', postRegister)

// loginRoute.post('/register', passport.authenticate('register', { successRedirect: '/api/auth/login', failureRedirect: 'api/auth/failRegister'}))

// login
loginRoute.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})

loginRoute.post('/login', postLogin)

// loginRoute.post('/login', passport.authenticate('login', { successRedirect: '/api/auth/' , failureRedirect: 'api/auth/failLogin'}))

// logged in
loginRoute.get('/', auth, (req, res) => {
    res.render('pages/index.ejs', {nombreDeUsuario: req.session.passport.user})
})

loginRoute.get('/visitas', auth, (req, res) => {
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1
    res.send(
        `bienvenido ${req.session.passport.user}
        visitas: ${req.session.visitas}`
    )
})

// logout
loginRoute.get('/logout', (req, res) => {
    if (!req.session.user) {
        res.redirect('login')
    } else {
        res.render('pages/logout.ejs', {nombreDeUsuario: req.session.user})
        req.session.destroy(err => {
            if(err) return res.send(err)
        })
    }
})

// failed register
loginRoute.get('/failRegister', (req, res) => {
    res.send('Please try to register again')
})

// failed login
loginRoute.get('/failLogin', (req, res) => {
    res.send('Please try to login again')
})

// github
loginRoute.get('/github', passport.authenticate('login', {scope: ['users: email']}))

loginRoute.get('/githubcallback', passport.authenticate('login', { successRedirect: '/api/auth/', failureRedirect: '/api/auth/login'}))

module.exports = loginRoute