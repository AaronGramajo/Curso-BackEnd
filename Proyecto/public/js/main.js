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
        description: document.querySelector('#description').value,
        code: document.querySelector('#code').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value,
        stock: document.querySelector('#stock').value
    }
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    }
    Fetch('/api/products', options)
}

const renderProduct = (data) => {
    let table = '<table class="table table-striped table-dark">'
    table += '<thead><tr><th>Id</th><th>Timestamp</th><th>Title</th><th>Description</th><th>Serial Code</th><th>Price</th><th>Photo URL</th><th>Stock</th></tr></thead>'
    table += '<tbody>'
    data.forEach(item => {
        table += `<tr>
            <th>${item.id}</th>
            <th>${item.timestamp}</th>
            <th>${item.title}</th>
            <th>${item.description}</th>
            <th>${item.code}</th>
            <th>${item.price}</th>
            <th><img src=${item.thumbnail} alt="" border=1 height=48 width=48></th>
            <th>${item.stock}</th>
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