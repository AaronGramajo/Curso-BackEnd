class ContainerFirebase {
    constructor(collection){
        this.collection = collection;
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
}

module.exports = ContainerFirebase