const express = require('express')
const app = express()
const {faker} = require('@faker-js/faker') 
const { urlencoded, json} = express

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

faker.locale = 'es'
const { name, internet, random } = faker

let str = 'NOMBRE; APELLIDO; EMAIL; TRABAJO;LUGAR\n'

for(let i = 0; i<10; i++) {
    str += `${name.firstName()};${name.lastName()};${internet.email()};${name.jobTitle()};${random.locale()}\n`
}

app.use(json())
app.use(urlencoded({extended:true}))
// app.get('/', (req, res) => {
//     // let personas = []
//     // for( let i=0; i<10; i++) {
//     //     personas.push({
//     //         nombre: nombres[Math.floor(Math.random() * nombres.length)],
//     //         apellidos: apellidos[Math.floor(Math.random() * apellidos.length)],
//     //         color: colores[Math.floor(Math.random() * colores.length)]
//     //     })
//     //     console.log(personas)
//     // }
//     // res.json({
//     //     'personas': personas
//     // })

//     let personas = []
//     personas.push(str)
//     res.json({
//         'personas': personas
//     })
// })

app.get('/api/usuario', (req, res) => {
    res.json({
        'persona': personas
    })
})

app.get('/api/usuario/:id', (req, res) => {
    res.json({
        'persona': personas
    })
})

app.post('/api/usuario', (req, res) => {
    res.json({
        'persona': personas
    })
})

app.post('/popular/cant?', (req, res) => {
    res.json({
        'persona': personas
    })
})

app.put('/api/usuario/:id', (req, res) => {
    res.json({
        'persona': personas
    })
})

app.delete('/api/usuario/:id', (req, res) => {
    res.json({
        'persona': personas
    })
})

const port = 4000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})