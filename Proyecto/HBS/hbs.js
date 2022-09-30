const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const Container = require('../container')

// app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + './views/partials',
    layoutsDir: __dirname + './views/layouts',
    defaultLayout: __dirname + '/views/layouts/defaultLayout.hbs'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

const products = new Container('../productos.txt')

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/products', (req, res) => {
    res.render('products.hbs', {products: products.getAll(), listExist: true})
})

app.post('/products', (req, res) => {
    const {title,price,thumbnail} = req.body
    const newproduct = products.save({title,price,thumbnail})
    console.log(newproduct)
    res.redirect('/')
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`)
})