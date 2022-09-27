const express = require('express')
const app = express()

// app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')

let usuarios = []

app.get('/', (req, res) => {
    res.render('pages/index.ejs', {nombreDeUsuario: 'Aaron', usuarios})
})

app.post('/personas', (req, res) => {
    usuarios.push(req.body)
    res.redirect('/')
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`)
})