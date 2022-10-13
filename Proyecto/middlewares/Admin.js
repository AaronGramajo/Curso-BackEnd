module.exports = (req, res, next) => {
    req.admin = req.get('admin')
    console.log(req.get('admin'))
    next()
}