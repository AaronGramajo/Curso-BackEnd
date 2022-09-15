const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 4000

let arraymsg = [
    {
        id:1,
        msg:'hola'
    },
    {
        id:2,
        msg:'chau'
    },
    {
        id:3,
        msg:'novemo'
    }
]

const frase = 'hola mundo como estan'

app.get('/', (request, resp) => {
    resp.status(200).json({mensaje:'holis'})
})

app.get('/api/mensajes/', (request, resp) => {
    const {nombre,apellido} = request.query
    if (nombre && apellido) {
        resp.status(200).json({
            mensaje:'mensaje encontrado',
            msg
        })
    }
    
    resp.status(400).json({
        mensaje:'no hay usuario'
    })
})

app.get('/api/mensajes/:id', (request, resp) => {
    const {nombre,apellido} = request.query
    if (id) {
        arraymsg.find(mensaje => mensaje.id === parseInt(id))
        resp.status(200).json({
            mensaje:'holis',
            nombre,
            apellido
        })
    }
    const { id } = request.params

    resp.status(400).json({
        mensaje:'no hay usuario'
    })
})

app.get('/api/frase', (req,res) => {
    res.status(200).json({
        frase:frase
    })

    res.status(400).json({
        mensaje:'frase no encontrado'
    })
})

app.get('/api/letras/:num', () => {
    const {num} = req.params
    if(num) {
        for (const letras of frase) {
            letras.indexOf(frase)
        }
        resp.status(200).json
    }
})

app.post('/api/mensajes',(req,res) => {
    const {nombre, email,pass} = req.body
    res.json({
        mensaje:'mensaje recibido',
        nombre,
        email,
        pass
    })
})

app.put('/api/mensajes/:id',(req,res) => {
    const {nombre} = req.body
    res.json({
        mensaje: 'mensaje PUT recibido',

    })
})

app.delete('/api/mensajes/:id',(req,res) => {
    const {id} = req.params.id
    res.json({
        mensaje: 'mensaje delete recibido'
    })
})

// app.listen(port, () => {
//     console.log(`el server esta corriendo en el puerto ${port}`)
// } )