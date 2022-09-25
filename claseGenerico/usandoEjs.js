const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = 4000
app.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`)
})