const {promises:fs} = require('fs')

class Container {
    constructor(route){
        this.route = route;
    }

    async save(obj) {
        let objs = await this.getAll();
        obj = {id:Date.now(),...obj}
        let datos = [...objs,obj]
        try {
            await fs.writeFile(this.route, JSON.stringify(datos,null,2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
    }

    async getById(id) {
        let objs = await this.getAll();
        let obj = objs.find(el=>el.id === id)
        if(obj.length == 0) {
            return `Producto no encontrado ${id}`
        }else {
            return obj
        }
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.route)
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async deleteById(id) {
        let objs = await this.getAll();
        let filteredList = objs.filter((item => item.id !== id))
        try {
            await fs.writeFile(this.route,JSON.stringify(filteredList,null,2))
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.route,JSON.stringify([],null,2))
        } catch (error) {
            return `No se pudo borrar los datos`
        }
    }

    async getRandom() {
        let objs = await this.getAll();
        let objRandom = this.getById(Math.ceil(Math.random() * objs.length))
        if(objRandom.length == 0) {
            return `no hay ningun producto`
        } else {
            return objRandom
        }
    }
}

module.exports = Container