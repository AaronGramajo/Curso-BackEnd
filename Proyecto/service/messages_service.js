const messagesDaoMongoDb = require('../data_Persistence/Daos/messages/messagesDaoMongoDB.js')

class MessageService {
    constructor() {
        this.messageDaos = new messagesDaoMongoDb()
    }

    async getAllMessages() {
        try {
            return await this.messageDaos.getAll()
        } catch (error) {
            customLogger.error(error)
        }
    }

    async createMessage(message) {
        try {
            const newMessage = await this.messageDaos.save(message)
            return newMessage
        } catch (error) {
            customLogger.error(error)
        }
    }
}

module.exports = MessageService