const socket = io()
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const sendButton = document.querySelector('#send')
const messageField = document.querySelector('#campoMensajes')

sendButton.addEventListener('click', () => {
    socket.emit('mensaje', { user: email.value, message: message.value})
})

socket.on('respuesta-server', (data) => {
    const mensajes = data.map(item=>`<p>${item.mensajes}</p>`)
    messageField.innerHTML = mensajes.join('')
})