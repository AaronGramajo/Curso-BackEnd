class ContainerFirebase {
    constructor(collection){
        this.db = admin.firestore()
        this.collection = this.db.collection(collection);
    }

    async getAll() {
        try {
            const queryCollection = await this.collection.get()
            const response = queryCollection.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = this.collection.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
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

module.exports = ContainerFirebase