const auth = require("../middlewares/auth")
const {Router} = require('express')
const loginRoute = Router()

// login
loginRoute.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})

loginRoute.post('/login', (req, res) => {
    const { username, password } = req.body
    if(username !== 'Aaron' || password !== 'admin') {
        return res.send('incorrect user/password')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

// logged in
loginRoute.get('/', auth, (req, res) => {
    res.render('pages/index.ejs', {nombreDeUsuario: req.session.user})
})

loginRoute.get('/visitas', auth, (req, res) => {
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1
    res.send(
        `bienvenido ${req.session.user}
        visitas: ${req.session.visitas}`
    )
})

// logout
loginRoute.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send(err)
        res.send(`<h1>See you soon Aaron!</h1>`)
    })
})

module.exports = loginRoute