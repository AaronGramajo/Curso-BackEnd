const fs = require('fs')

const guardarDartos = (ruta,info) => {
    fs.writeFileSync(ruta,info);
}

const mostrarDatos = (ruta,cod) => {
    let info = fs.readFileSync(ruta,cod)
    console.log(info)
}

const deleteInfo = (ruta) => {
    fs.unlinkSync(ruta)
    console.log(`se borro el archivo ${ruta}`)
}