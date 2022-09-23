const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.json())

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({storage: storage})

app.post('./uploadfile', upload.single('myfile'), (req, res) => {
    const file = req.file
    if(!file) {
        const error = new Error('please upload a file')
        error.httpStatusCode(400)
        return next(error)
    }
    res.send(file)
})

app.post('./uploadmultiple', upload.array('myfiles',10), (req, res) => {
    const files = req.files
    if(!files) {
        const error = new Error('please upload a file')
        error.httpStatusCode(400)
        return next(error)
    }
    res.send(files)
})

app.get('./', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})