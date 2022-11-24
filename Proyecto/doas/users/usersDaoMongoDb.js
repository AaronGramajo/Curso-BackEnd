const ContainerMongoDb = require('../../containers/containerMongoDb.js')

const Users = require('../../models/userModel.js')

class UsersDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Users)
    }
}

module.exports = UsersDaoMongoDb