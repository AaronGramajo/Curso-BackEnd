// las cookies son middleware

// seria la ruta mas el middleware cookies
const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()

const app = express()
const {static, json, urlencoded} = express

app.use(cookieParser())
app.use(static('public'))
app.use(json())
app.use(urlencoded({extended: true}))


app.get("/set", (req, res) => {
    const {cookies} = req
    res.cookie('nombre', 'aaron'),
    res.status.json({
        message: 'cookies seteada', 
        sucess: true
    })
})

app.get('/clearCookie', (req, res) => {
    const { cookies } = req
    res.clearCookie('nombre'),
    res.status().json({
        message: 'cookies borradas'
    })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})