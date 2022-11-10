const socket = io()
const {denormalizeMessages} = require('../../utils/normalizr.js')

const addMessage = (e) => {
    let email = document.querySelector('#email')
    let firstName = document.querySelector('#name')
    let lastName = document.querySelector('#lastName')
    let age = document.querySelector('#age')
    let alias = document.querySelector('#alias')
    let avatar = document.querySelector('#avatar')
    let textMessage = document.querySelector('#textMessage')

    if (email.value === '' || firstName.value === '' || lastName.value === '' || age.value === '' || alias.value === '' || avatar.value === '' || textMessage.value === '') {
        alert('please enter email and a message')
    }
    const message = {
        author: {
            email: email.value,
            name: firstName.value,
            lastName: lastName.value,
            age: age.value,
            alias: alias.value,
            avatar: avatar.value
        },
        text: textMessage.value,
        date: new Date().toLocaleString()
    }
    socket.emit('new-message', message)
    textMessage.value = ''
    return false
}

const renderMessage = (data) => {
    console.log(data)
    const html = data.map((elem) => {
        return (`<div>
        <strong style='color: blue;'>${elem.author.email}</strong>[
            <span style='color: brown;'>${elem.date}</span>
        ]:
        <em style='color: green;'>${elem.text}</em>
        <img width="50" style="border-radius: 50%;" src=${elem.avatar} />
        </div>`)
    }).join('')
    document.querySelector('#messages').innerHTML = html
}

socket.on('message', (data) => {
    let originalMessageSize = Json.stringify(data).length
    let denormalizedMessage = denormalizeMessages(data)
    let denormalizedMessagesSize = Json.stringify(denormalizeMessages).length
    let compressedPorcentage = parseInt((originalMessageSize * 100) / denormalizedMessagesSize)
    document.getElementById('compressed-info').innerText = compressedPorcentage

    renderMessage(denormalizedMessage)
    console.log('se recibieron los mensajes')
})