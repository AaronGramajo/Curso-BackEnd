const ContainerFile = require('../../containers/containerFiles.js')

class MessagesDaoFile extends ContainerFile {
    constructor() {
        super('container/messages.txt')
    }
}

module.exports = MessagesDaoFile