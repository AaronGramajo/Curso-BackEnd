const ContainerFirebase = require("../../containers/containerFirebase")

class CartsDaoFirebase extends ContainerFirebase {
    constructor() {
        super('cart')
    }

    async save(cart) {
        let doc = this.collection.doc()
        if (doc.length == 0) {
            cart = {
                id: 1,
                timestamp: Date.now().toLocaleString(),
                products: [...cart]
            }
        } else {
            cart = {
                id: doc.length + 1,
                timestamp: Date.now().toLocaleString(),
                products: [...cart]
            }
        }
        try {
            await doc.create(cart)
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
        return cart
    }

    async deleteCart(id) {
        try {
            const doc = this.collection.doc(`${id}`)
            const deletedCart = await doc.delete()
            console.log('El usuario ha sido borrado exitosamente', deletedCart)
        } catch (error) {
            return `No se pudo borrar el carrito`
        }
    }

    async update(id,obj) {
        let doc = this.collection.doc(`${id}`)
        try {
            const product = await doc.get()
            const updatedcart = await doc.update(obj)
            console.log('El usuario ha sido actualizado', updatedcart)
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CartsDaoFirebase