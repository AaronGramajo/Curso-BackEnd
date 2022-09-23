const cookieParser = require('cookie-parser')
const express = require('express')
const cookie = cookieParser()
const Container = require('./container.js')

const app = express()

const {json,urlencoded,Router,static} = express
const router = Router()

app.use(json())
app.use(urlencoded({extended:true}))
app.use('/static',static(__dirname + 'public'))


// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const port = 4000

app.listen(port, () => {
    console.log(`el server esta corriendo en el puerto ${port}`)
} )

const frase = 'hola mundo como estan'

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

app.get('/', (request, resp) => {
    resp.status(200).json({mensaje:'holis'})
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
    const { id } = request.params
    if (id) {
        arraymsg.find(mensaje => mensaje.id === parseInt(id))
        resp.status(200).json({
            mensaje:'holis',
            nombre,
            apellido
        })
    }else{
        resp.status(400).json({
            mensaje:'no hay usuario'
        })
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


//////////////// rutas //////////////

router.get('/', (req, res) => {
    res.json('get usuarios con ruta')
})

router.post('/', (req, res) => {
    res.json('post usuarios')
})

//////////////// Usuarios //////////////

// app.get('/api/usuarios', (req,res) => {
//     res.json('get usuarios sin ruta')
// })

// app.use('/api/usuarios', router)

//////////////// funciones middle ware //////////////

const middle = (req, res, next) => {
    console.log(req.params)
    req.id = 1
    console.log('soy un middleware de ruta')
    next()
}

//////////////// modular por archivos las rutas //////////////


app.use('/api/usuarios',middle,router)

app.use('/api/carrito',router)

////////////////////// probando container ////////////////////

const products = new Container('./products.txt')

app.get('/products', (req, res) => {
    res.json(products.getall())
})

app.get('/productRandom', (req, res) => {
    res.status(200).json(products.getById(1659501927530))
})