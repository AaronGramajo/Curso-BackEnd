const ContainerMemory = require('../../containers/containerMemory')

let products = []

class CartsDaoMem extends ContainerMemory {
    constructor() {
        super(products)
    }

    save(cart) {
        try {
            let objs = this.getAll();
            if (objs.length == 0) {
                cart = {
                    id: 1,
                    timestamp: Date.now().toLocaleString(),
                    products: [...cart]
                }
            } else {
                cart = {
                    id: objs.length + 1,
                    timestamp: Date.now().toLocaleString(),
                    products: [...cart]
                }
            }
            let datos = [...objs, cart]
            console.log(datos)
            return cart
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
    }

    deleteCart(id) {
        try {
            let objs = this.getAll();
            let obj = objs.find(el => el.id === parseInt(id))
            obj = []
            let filteredList = objs.filter((item => item.id !== parseInt(id)))
            console.log(`cart emptied successfully, ${filteredList}`)
        } catch (error) {
            return `No se pudo borrar el carrito`
        }
    }

    update(obj) {
        try {
            let objs = this.getAll();
            const product = objs.find(prod => prod.id === parseInt(obj.id))
            const updatedcart = {
                ...product,
                ...obj
            }
            let index = objs.findIndex((el, ind) => {
                if (el.id == updatedcart.id) {
                    return true
                }
            })
            objs[index] = updatedcart
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteById(id) {
        try {
            let objs = this.getAll();
            let index = objs.findIndex((el, ind) => {
                if (el.id == id) {
                    return true
                }
            })
            let obj = objs.splice(index, 1)
            return obj
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }
}

module.exports = CartsDaoMem