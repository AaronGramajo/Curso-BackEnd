const fs = require('fs')

class Cart {
    constructor(route) {
        this.route = route;
    }

    getAll() {
        try {
            const objs = fs.readFileSync(this.route, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    save(cart) {
        let objs = this.getAll();
        if (objs.length == 0) {
            cart = {
                id: 1,
                timestamp: Date.now(),
                products: [...cart]
            }
        } else {
            cart = {
                id: objs.length + 1,
                timestamp: Date.now(),
                products: [...cart]
            }
        }
        let datos = [...objs, cart]
        console.log(datos)
        try {
            fs.promises.writeFile(this.route, JSON.stringify(datos, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
        return cart
    }

    deleteCart(id) {
        let objs = this.getAll();
        let obj = objs.find(el => el.id === parseInt(id))
        obj = []
        let filteredList = objs.filter((item => item.id !== parseInt(id)))
        try {
            fs.writeFileSync(this.route, JSON.stringify(filteredList, null, 2))
        } catch (error) {
            return `No se pudo borrar el carrito`
        }
    }

    getById(id) {
        let objs = this.getAll();
        let obj = objs.find(el => el.id === parseInt(id))
        if (obj.length == 0) {
            return `Producto no encontrado ${id}`
        } else {
            return obj
        }
    }

    update(obj) {
        let objs = this.getAll();
        try {
            const product = objs.find(prod => prod.id === parseInt(obj.id))
            const updatedcart = {
                ...product,
                ...obj
            }
            let index = objs.findIndex((el,ind) => {
                if(el.id == updatedcart.id) {
                    return true
                }
            })
            objs[index] = updatedcart
            fs.promises.writeFile(this.route, JSON.stringify(objs, null, 2))
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteById(id) {
        let objs = this.getAll();
        let index = objs.findIndex((el,ind) => {
            if(el.id == id) {
                return true
            }
        })
        console.log(index)
        let obj = objs.splice(index, 1)
        try {
            fs.writeFileSync(this.route, JSON.stringify(filteredList, null, 2))
            return obj
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }
}

module.exports = Cart