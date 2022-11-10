const server = io()

const Fetch = async (url, options) => {
    try {
        const resJson = await fetch(url, options)
        const data = await resJson.json()
        server.emit('newProductList', data)
    } catch (error) {
        console.log(error)
    } finally {
        document.querySelector('form').reset()
    }
}

const addProduct = (e) => {
    const product = {
        title: document.querySelector('#title').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
    }
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    }
    Fetch('/api/productos-test', options)
}

const renderProduct = (data) => {
    let table = '<table class="table table-striped table-dark">'
    table += '<thead><tr><th>Id</th><th>Title</th><th>Price</th><th>Photo URL</th></tr></thead>'
    table += '<tbody>'
    data.forEach(item => {
        table += `<tr>
            <th>${item.id}</th>
            <th>${item.title}</th>
            <th>${item.price}</th>
            <th><img src=${item.thumbnail} alt="" border=1 height=48 width=48></th>
        </tr>`
    })
    table += '</tbody></table>'
    return document.querySelector('#tableProducts').innerHTML = table
}

server.on('productList', (data) => {
    console.log('se recibieron los products')
    if(!data.length) {
        document.querySelector('#tableProducts').innerHTML = `<h2>No products found</h2>`
    } else {
        renderProduct(data)
    }
})