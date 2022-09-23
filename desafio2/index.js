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
        let obj = objs.find(el=>el.id == id)
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
        return this.getById(Math.ceil(Math.random() * objs.length))
    }
}

let productos = new Container('./productos.txt')
// productos.save({title:'Nintendo Switch', price:148.000, thumbnail:'./fotoDeProductos/fotoDeSwitch.png'})
// productos.save({title:'PlayStation 5', price:280.000, thumbnail:'./fotoDeProductos/fotoDePlayStation5.png'})
// productos.save({title:'Xbox Series X', price:220.000, thumbnail:'./fotoDeProductos/fotoDeXboxSeriesX.png'})

// setTimeout(()=> {
//     productos.getById(1659501939434)
//     .then((resp)=>{
//         console.log(resp)
//     })
//     .catch((err=>console.log(err)))
// },2000)

// setTimeout(()=> {
//     productos.getAll()
//     .then((resp)=>{
//         console.log(resp)
//     })
//     .catch((err=>console.log(err)))
// },3000)

// setTimeout(()=> {
//     productos.deleteById(1659501810912)
//     .then((resp)=>{
//         console.log(`se borro con exito`)
//     })
//     .catch((err=>console.log(err)))
// },4000)

// setTimeout(()=> {
//     productos.deleteAll()
//     .then((resp)=>{
//         console.log(`se borro con exito`)
//     })
//     .catch((err=>console.log(err)))
// },5000)