const {Router} = require('express')
const compression = require('compression')

const infoRouter = Router()

infoRouter.get('/', async (req, res) => {
    try {
        res.status(200).render('pages/info.ejs')
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
})

infoRouter.get('/zip', compression(), async (req, res) => {
    try {
        res.status(200).render('pages/info.ejs')
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
})

module.exports = infoRouter