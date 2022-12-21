const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const express = require('express')

const app = express()

const {json,urlencoded} = express

app.use(json())
app.use(urlencoded({extended:true}))

const port = process.argv[2] || 4000
const modoCluster = process.argv[3] == 'CLUSTER'

if (modoCluster && cluster.isPrimary) {
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {
    app.get('/', (req, res) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })

    app.listen(port, () => {
        console.log(`el server esta corriendo en el puerto ${port}`)
        console.log(`${process.argv[2]}`)
    } )
}

function isPrime(num) {
    if([2,3].includes(num)) return true;
    else if ([2,3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while((i ** 2) <= num) {
            if(num % 1 == 0) return false
            i += w 
            w = 6 - w
        }
    }
    return true
}
