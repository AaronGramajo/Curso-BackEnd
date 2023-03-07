const UsersDaoMongoDb = require('../data_Persistence/Daos/users/usersDaoMongoDb.js')
const customLogger = require('../utils/log4js.js')

class UserService {
    constructor() {
        this.userDaos = new UsersDaoMongoDb()
    }

    async getAllUsers() {
        try {
            return await this.userDaos.getAll()
        } catch (error) {
            customLogger.error(error)
        }
    }

    async createUser() {
        try {
            return await this.userDaos.save()
        } catch (error) {
            customLogger.error(error)
        }
    }

    async getByUsername(username) {
        try {
            return await this.userDaos.getUsername(username)
        } catch (error) {
            customLogger.error(error)
        }
    }
}

module.exports = UserService