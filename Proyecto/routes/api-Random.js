const {Router} = require('express')
const {fork} = require('child_process')
const apiRandomRouter = Router()

apiRandomRouter.get('/', (req, res) => {
    try {
        let cant = req.query.cant
        if(!cant) {
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

//forever

//commands
//forever start filename
//forever stopall filename

//pm2

//commands

//pm2 start filename --name="Serverx" --watch --port
//pm2 start filename --name="Server1" --watch --3000
//pm2 start filename --name="Server2" --watch --3030

//pm2 start filename --name="Server3" --watch -i max --4030


module.exports = apiRandomRouter