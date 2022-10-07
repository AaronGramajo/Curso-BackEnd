const socket = io()
let email = document.querySelector('#email')
let textMessage = document.querySelector('#textMessage')

const addMessage = (e) => {
    if (email.value === '' || textMessage.value === '') {
        alert('please enter email and a message')
    }
    const message = {
        user: email.value,
        message: textMessage.value,
        date: Date()
    }
    socket.emit('new-message', message)
    textMessage.value = ''
    return false
}

const renderMessage = (data) => {
    const html = data.map((elem) => {
        return (`<div>
        <strong style='color: blue;'>${elem.user}</strong>[
            <span style='color: brown;'>${elem.date}</span>
        ]:
        <em style='color: green;'>${elem.message}</em>
        </div>`)
    }).join('')
    document.querySelector('#messages').innerHTML = html
}

socket.on('message', (data) => {
    console.log('se recibieron los mensajes')
    renderMessage(data)
})