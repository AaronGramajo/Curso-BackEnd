// const auth = (req, res , next) => {
//     if (!req.session?.user || !req.session?.admin) {
//         return res.status(401).send('<h1>Error de autorizacion</h1>')
//     }
//     return next()
// }

const auth = (req, res , next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/auth/login')
    }

    return next()
}

module.exports = {auth}