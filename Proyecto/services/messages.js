const fs = require('fs')

class messages {
    
    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile('messages.txt','utf-8'))
        } catch {
            return []
        }
    }

    async save(message) {
        try {
            let messages = await this.getAll()
            message.fyh = new Date().toLocaleString()
            messages.push(message)
            await fs.promises.writeFile('messages.txt', JSON.stringify(messages, null, 2) )
        }
        catch(error) {
            console.log('Error cannot save message', error)
        }
    }
}
module.exports = messages

