const socket = io()
//escuchando el saludo del lado del servidor
const button = document.querySelector('#send')
const input = document.querySelector('#mensajes')
const campo = document.querySelector('#campoMensajes')

button.addeventlistener('click', ()=> {
    socket.emit('respuesta', input.value)
})
socket.on('saludo', (data) => {
    console.log(data)
    // mandando una respuesta al servidor
    socket.emit('respuesta', 'hola desde el lado del cliente')

    const mensajes = Arraymensajes.map(el => `<li>${el.socket.id, el.mensaje}</li>` )
    campo.appendChild(mensajes)
})

