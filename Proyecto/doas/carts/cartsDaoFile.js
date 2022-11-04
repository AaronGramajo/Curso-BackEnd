const ContainerFile = require('../../containers/containerFiles.js')

class CartsDaoFile extends ContainerFile {
    constructor() {
        super('./container/carts.txt')
    }

    async save(cart) {
        let objs = await this.getAll();
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
        try {
            await fs.writeFile(this.route, JSON.stringify(datos, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
        return cart
    }

    async deleteCart(id) {
        let objs = await this.getAll();
        let obj = objs.find(el => el.id === parseInt(id))
        obj = []
        let filteredList = objs.filter((item => item.id !== parseInt(id)))
        try {
            await fs.writeFileSync(this.route, JSON.stringify(filteredList, null, 2))
        } catch (error) {
            return `No se pudo borrar el carrito`
        }
    }

    async update(obj) {
        let objs = await this.getAll();
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
            await fs.writeFile(this.route, JSON.stringify(objs, null, 2))
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        let objs = await this.getAll();
        let index = objs.findIndex((el,ind) => {
            if(el.id == id) {
                return true
            }
        })
        let obj = objs.splice(index, 1)
        try {
            await fs.writeFileSync(this.route, JSON.stringify(obj, null, 2))
            return obj
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }
}

module.exports = CartsDaoFile