const fs = require('fs')

class Container {
    constructor(route) {
        this.route = route;
    }

    getAll() {
        try {
            const objs = fs.readFileSync(this.route, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    save(obj) {
        let objs = this.getAll();
        obj = {
            id: Date.now(),
            timestamp: Date.now().toLocaleString(),
            ...obj
        }
        let datos = [...objs, obj]
        try {
            fs.promises.writeFile(this.route, JSON.stringify(datos, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
    }

    update(obj, id) {
        let objs = this.getAll();
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
                fs.promises.writeFile(this.route, JSON.stringify(objs, null, 2))
                return product;
            } else {
                return `pruducto no encontrado ${id}`;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getById(id) {
        let objs = this.getAll();
        let obj = objs.find(el => el.id === parseInt(id))
        if (obj.length == 0) {
            return `Producto no encontrado ${id}`
        } else {
            return obj
        }
    }
    
    getRandom() {
        let objs = this.getAll();
        return this.getById(Math.ceil(Math.random() * objs.length))
    }

    deleteById(id) {
        let objs = this.getAll();
        let filteredList = objs.filter((item => item.id !== parseInt(id)))
        try {
            fs.writeFileSync(this.route, JSON.stringify(filteredList, null, 2))
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }

    deleteAll() {
        try {
            fs.writeFileSync(this.route, JSON.stringify([], null, 2))
        } catch (error) {
            return `No se pudo borrar los datos`
        }
    }

}

module.exports = Container