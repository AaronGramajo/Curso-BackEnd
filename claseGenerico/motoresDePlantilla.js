const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static(__dirname + '/public'))

//Plantilla

app.engine('fjs', function(filePath, options, callback) {
    fs.readFile(filePath, (err, contenido) => {
        if(err) throw new Error(err)
        const contenidoModificado = contenido
        .toString()
        .replace('{{titulo1}}', options.titulo1)
        .replace('{{titulo2}}', options.titulo2)
        .replace('{{nombre}}', options.nombre)
        .replace('{{apellido}}', options.apellido)

        return callback(null,contenidoModificado)
    })
})

app.set('views', './views')
app.set('view engine', 'fjs')

app.get('/plantilla', (req, res) => {
    const options = {
        titulo1: 'Primera planitlla personalizada',
        titulo2: 'Fjs',
        nombre: 'Aaron',
        apellido: 'Gramajo'
    }
    res.render('index.fjs', options)
})

PORT = 8080

app.listen(PORT, () => {
    console.log(`el servidor esta en port ${PORT}`)
})