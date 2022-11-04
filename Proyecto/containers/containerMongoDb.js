const {Connect} = require('../config')

class ContainerMongoDb extends Connect {
    constructor(model) {
        this.model = model
    }

    async getAll() {
        try {
            const models = await this.model.find()
            console.log(models)
        } catch (error) {
            console.log(error)
        }
    }

    async save(item) {
        try {
            const newitem = new this.model(item)
            await newitem.save()
            console.log(`new product added ${newitem}`)
        } catch (error) {
            console.log(error)
        }
    }

    async update() {
        await this.model.updateOne()
        console.log('product updated')
    }

    async deleteById(id) {
        await this.model.deleteOne(id)
        console.log('product deleted')
    }
}

module.exports = ContainerMongoDb