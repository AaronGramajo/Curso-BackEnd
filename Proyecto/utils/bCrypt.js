const bCrypt = require('bcrypt')

const createHash = (password) => {
    return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null)
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
}

module.exports = {createHash, isValidPassword}