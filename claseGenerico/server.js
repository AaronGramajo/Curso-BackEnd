const http = require ('http')

const server = http.createServer((petition, response)=> {
    response.end('<H1>hola, el abraham se la come</H1>')
})

const port = 4000

const connectServer = server.listen(port, ()=>{
    console.log(`el server esta corriendo en el puerto ${connectServer.address().port}`)
})