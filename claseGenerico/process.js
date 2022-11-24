const express = require('express')
const config = require('./configs.js')
const app = express()

console.log(process.env.NONDE_ENV)

app.get('/', (req,res) => {
    res.send('hello')
})

app.listen(config.PORT, config.HOST, () => {
    console.log(`escuchando en el puerto ${config.PORT}`)
})