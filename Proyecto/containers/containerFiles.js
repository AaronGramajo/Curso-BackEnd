const {promises:fs} = require('fs')

class ContainerFile {
    constructor(route){
        this.route = route;
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.route)
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        console.log(id)
        let objs = await this.getAll();
        let obj = objs.find(el=>el.id == parseInt(id))
        if(obj.length == 0) {
            return `Producto no encontrado ${id}`
        }else {
            return obj
        }
    }

    async save(obj) {
        let objs = await this.getAll();
        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }
        const newObj = {id: newId, timestamp: Date.now().toLocaleString(), ...obj}
        let datos = [...objs, newObj]
        try {
            await fs.writeFile(this.route, JSON.stringify(datos, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
    }
    
    async update(obj, id) {
        let objs = await this.getAll();
        try {
            const {title, description, code, price, thumbnail, stock} = obj;
            const product = objs.find(prod => prod.id === parseInt(id))
            if (product) {
                product.title = title;
                product.description = description;
                product.code = code;
                product.price = price;
                product.thumbnail = thumbnail;
                product.stock = stock;
                await fs.writeFile(this.route, JSON.stringify(objs, null, 2))
                return product;
            } else {
                return `pruducto no encontrado ${id}`;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async deleteById(id) {
        let objs = await this.getAll();
        let filteredList = objs.filter((item => item.id !== parseInt(id)))
        try {
            await fs.writeFile(this.route, JSON.stringify(filteredList, null, 2))
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.route, JSON.stringify([], null, 2))
        } catch (error) {
            return `No se pudo borrar los datos`
        }
    }
}

module.exports = ContainerFile