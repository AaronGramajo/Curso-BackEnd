const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/hello', (req, res) => {
    res.render('hello.pug', {mensaje: 'Usando PUG JS en Express'})
})

app.get('/datos', (req, res) => {
    const {min, nivel,  max, titulo} = req.query
    const medidor = {min, nivel, max}
    res.render('datos.pug', {
        max,min,nivel,titulo
    })
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`)
})