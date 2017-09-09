const express = require('express')
const encrypter = require('simple-encryptor')
const bodyParser = require('body-parser')

// Create out app

var app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/encryption', function (req, res, next) {
  let message = req.body.message
  let passphrase = req.body.passphrase + req.body.passphrase + req.body.passphrase + req.body.passphrase
  let encrypt = req.body.encrypt

  let newMessage = ''

  // if message is going for encryption
  if (encrypt) {
    newMessage = encrypter(passphrase).encrypt(message)
  } else {
    // message being decrypted
    let messageTime = message.replace(/(^.*)#(.*$)/g, '$2')
    // has message expired?
    if (new Date(messageTime).getTime() < new Date().getTime()) {
      newMessage = 'Message Expired'
    } else {
      newMessage = encrypter(passphrase).decrypt(message)
      // Is message valid?
      if (newMessage === null) newMessage = 'Invalid Crypt#'
    }
  }
  res.json({'newMessage': newMessage})
})

app.listen(PORT, () => console.log('Express server is listening on ' + PORT))
