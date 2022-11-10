const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const messages = require('../../models/messagesModel.js')

class MessagesDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(messages)
    }
}

module.exports = MessagesDaoMongoDb