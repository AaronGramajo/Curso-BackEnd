const ContainerFirebase = require("../../containers/containerFirebase")

class ProductsDaoFirebase extends ContainerFirebase {
    async save(product) {
        try {
            let doc = this.collection.doc()
            await doc.create(product)
        } catch (error) {
            console.log(`no se pudo guardar el producto`, error)
        }
    }

    async update(id, newProduct) {
        try {
            let doc = this.collection.doc(`${id}`)
            const item = await doc.update(newProduct)
            console.log('El usuario ha sido actualizado', item)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            const doc = this.collection.doc(`${id}`)
            const item = await doc.delete()
            console.log('El usuario ha sido borrado exitosamente', item)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsDaoFirebase