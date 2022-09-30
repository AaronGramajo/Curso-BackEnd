const express = require('express')
const app = express()
const Container = require('../container')

// app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')

const products = new Container('../productos.txt')

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})

app.get('/products', (req, res) => {
    res.render('pages/products.ejs', {products: products.getAll(), productsExist: true})
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