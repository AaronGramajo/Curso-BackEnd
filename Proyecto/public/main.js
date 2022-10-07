const socket = io()

const addMessage = (e) => {
    const message = {
        user: document.querySelector('#email').value,
        message: document.querySelector('#textMessage').value,
        date: Date()}
    socket.emit('new-message', message)
    return false
}

const addProduct = (e) => {
    const product = {
        title: document.querySelector('#title').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
    }
    socket.emit('newProductList', product)
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

const renderProduct = (data) => {
    const html = data.map((item) => {
        if(data.length !== 0) {
            return (`
            <table>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Photo URL</th>
                </tr>
                ${item.forEach((el) => {`
                    <tr>
                        <th>${el.title}</th>
                        <th>${el.price}</th>
                        <th><img src=${el.thumbnail} alt="" border=1 height=48 width=48></th></th>
                    </tr>`
                })}
            </table>`)
        } else {
            return (`<h2>no products found</h2>`)
        }
    }).join('')
    document.querySelector('#tableProducts').innerHTML = html
}

socket.on('message', (data) => {
    console.log('se recibieron los mensajes')
    renderMessage(data)
})

socket.on('productList', (data) => {
    console.log('se recibieron los products')
    renderProduct(data)
})