const auth = (req, res , next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/auth/login')
    }

    return next()
}

module.exports = {auth}