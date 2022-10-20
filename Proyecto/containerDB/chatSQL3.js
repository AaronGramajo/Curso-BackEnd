class Messages {
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

    async save(message) {
        try {
            return await this.knex(this.table).insert(message)
        }
        catch(error) {
            console.log(`Error cannot save message, ${error}`)
        }
    }
}
module.exports = Messages
