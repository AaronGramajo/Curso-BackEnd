const {Router} = require('express')
const compression = require('compression')
const logger = require('../utils/log4js.js')

const infoRouter = Router()

infoRouter.get('/', async (req, res) => {
    try {
        res.status(200).render('pages/info.ejs')
    } catch (error) {
        res.status(404).send(logger.error(`${error}`))
    }
})

infoRouter.get('/zip', compression(), async (req, res) => {
    try {
        res.status(200).render('pages/info.ejs')
    } catch (error) {
        res.status(404).send(logger.error(`${error}`))
    }
})

module.exports = infoRouter