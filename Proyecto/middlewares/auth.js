function auth(req, res , next) {
    if (req.session?.user === 'Aaron' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('<h1>Error de autorizacion</h1>')
}

module.exports = auth