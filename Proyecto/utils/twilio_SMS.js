const twilio = require('twilio')

require('dotenv').config()

const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN

const cliente = twilio(TWILIO_SID, TWILIO_TOKEN)

const options = {
    body: req.body,
    from: process.env.TWILIO_PHONE,
    to: process.env.MY_PHONE
}

;(async () => {
    try {
        const message = await cliente.messages.create(options)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
})()