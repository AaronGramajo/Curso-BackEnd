class Products {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }
    
    async getAll() {
        try {
            return await this.knex(this.table).select('*')
        } catch {
            return []
        }
    }

    async save(product) {
        try {
            product.timestamp = new Date().toLocaleString()
            return await this.knex(this.table).insert(product)
        } catch (error) {
            return new Error(`Error al guardar los datos ${error}`)
        } finally {
            console.log(`Registro insertado`)
        }
    }

    async update(product, id) {
        try {
            return await this.knex(this.table).where('id', '=', parseInt(id)).update(product)
        } catch (error) {
            return new Error(`Error al actualizar los datos ${error}`);
        }
    }
    
    async getById(id) {
        try {
            return await this.knex(this.table).where('id', '=', parseInt(id))
        } catch (error) {
            return new Error(`no se encontro el id ${id}, ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await this.knex(this.table).where('id', '=', parseInt(id)).del()
        } catch (error) {
            return new Error(`No se puede borrar ese registro ${error}`)
        } finally {
            console.log(`Registro borrado`)
        }
    }

    async deleteAll() {
        try {
            await this.knex.from(this.table).del()
        } catch (error) {
            return `No se pudo borrar los datos ${error}`
        } finally {
            console.log(`Registros borrado`)
        }
    }
}

module.exports = Products