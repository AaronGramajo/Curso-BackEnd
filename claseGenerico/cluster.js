const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const express = require('express')

const app = express()

const {json,urlencoded} = express

app.use(json())
app.use(urlencoded({extended:true}))

const port = process.argv[2] || 4000
console.log(numCPUs)

app.get('/',(req,res) => {
    res.send(`Servidor express en ${port} = PID ${process.pid} y ${process.argv[2]}`)
})

// if (cluster.isPrimary) {
//     console.log(`Master ${process.pid}`)
//     for(let i = 0; i<numCPUs; i++) {
//         cluster.fork()
//     }
//     cluster.on('exit', (worker, coder, signal) => {
//         console.log(`Worker ${worker.process.pid} died`)
//     })
// } else {
//     try {
//         app.listen(port)
//         console.log(`el server esta corriendo en el puerto ${port}`)
//         console.log(`Worker ${process.pid} started`)
//     } catch (error) {
//         console.log(error)
//     }
// }

app.listen(port, () => {
    console.log(`el server esta corriendo en el puerto ${port}`)
    console.log(`${process.argv[2]}`)
} )

//forever

//commands
//forever start filename
//forever stopall filename

//pm2

//commands

//pm2 start filename --name="Serverx" --watch --port
//pm2 start filename --name="Server1" --watch --3000
//pm2 start filename --name="Server2" --watch --3030

//pm2 start filename --name="Server3" --watch -i max --4030
