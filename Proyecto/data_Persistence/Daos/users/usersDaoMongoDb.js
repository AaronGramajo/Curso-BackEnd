const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const Users = require('../../models/userModel.js')

class UsersDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Users)
    }

    async getUsername(username) {
        try {
            const user = await this.model.findOne({username: username})
            return user
        } catch (error) {
            loggerCustom.error(`username not found, ${error}`)
        }
    }
}

module.exports = UsersDaoMongoDb