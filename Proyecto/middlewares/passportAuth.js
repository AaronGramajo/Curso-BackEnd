const passport = require('passport')
const UsersDaoMongoDb = require('../doas/users/usersDaoMongoDb')
const GithubStrategy = require('passport-github2').Strategy
const Users = new UsersDaoMongoDb()

const initPassport = () => {
    passport.use('login', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        let username = profile.username
    
        let user = await Users.getUsername(username)
    
        if(!user) {
            console.log('Invalid username')
            return done(null, false)
        }
    
        // if(!isValidPassword(user,password)) {
        //     console.log('Invalid password')
        //     return done(null, false)
        // }
    
        return done(null, user)
    }))
    
    // guarda el id del usuario en la session
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })
    
    // busca al usuario por su id para autorizar
    passport.deserializeUser((username, done) => {
        let user = Users.getUsername(username)
        done(null, user)
    })
}

module.exports = {initPassport}