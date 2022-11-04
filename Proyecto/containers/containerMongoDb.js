const {Connect} = require('../config')

class ContainerMongoDb extends Connect {

    async getAll() {
        try {
            const models = await this.model.find()
            console.log(models)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const product = await this.model.find(id)
            console.log(product)
            return product
        } catch (error) {
            console.log(`product not found, ${error}`)
        }
    }

    async save(item) {
        try {
            console.log(this.model)
            const newitem = new this.model(item)
            await newitem.save()
            console.log(`new product added ${newitem}`)
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, product) {
        await this.model.updateOne(id, {$set: product})
        console.log('product updated')
    }

    async deleteById(id) {
        await this.model.deleteOne(id)
        console.log('product deleted')
    }
}

module.exports = ContainerMongoDb