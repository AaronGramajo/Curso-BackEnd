const socket = io()

const addMessage = (e) => {
    let email = document.querySelector('#email')
    let firstName = document.querySelector('#firstName')
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
    const html = data.map((elem) => {
        return (`<div>
        <strong style='color: blue;'>${elem.author.email}</strong>
        <img width="30" style="border-radius: 50%;" src=${elem.author.avatar} />
        [
            <span style='color: brown;'>${elem.date}</span>
        ]:
        <em style='color: green;'>${elem.text}</em>
        </div>`)
    }).join('')
    document.querySelector('#messages').innerHTML = html
}

socket.on('message', (data) => {
    renderMessage(data)
    console.log('se recibieron los mensajes')
})