const {Router} = require('express')
const {fork} = require('child_process')
const apiRandomRouter = Router()

apiRandomRouter.get('/', (req, res) => {
    try {
        let cant = req.query.cant
        if(!cant) {
            // for (let i = 0; i < 10000000; i++) {
            //     let ranNum = Math.floor(Math.random()*10000000)+1
            //     generatedNums.push(ranNum)
            // }
            const computing = fork('utils/randomNumbers.js')
            computing.send('start')
            computing.on('message', message => {
                // console.log(message)
                res.end({generatedNumbers: `${message}`})
            })
        } else {
            for(let i = 0; i < cant; i++) {
                let ranNum = Math.floor(Math.random() * cant) +1
                generatedNums.push(ranNum)
            }
        }
        res.status(200).json({generatedNumbers: `${generatedNums}`})
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
})


module.exports = apiRandomRouter