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
            const product = await this.model.find({_id: id})
            console.log(product)
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

    async update(product, id) {
        console.log(id)
        console.log(product)
        await this.model.updateOne({_id: id}, {$set: {title: product.title, description: product.description, code: product.code, price: product.price, thumbnail: product.thumbnail, stock: product.stock}})
        console.log('product updated')
    }

    async deleteById(id) {
        await this.model.deleteOne({_id: id})
        console.log('product deleted')
    }
}

module.exports = ContainerMongoDb