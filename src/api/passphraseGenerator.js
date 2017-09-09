
module.exports = {
  new: () => {
    let passphrase = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 5; i++) {
      let randomNumber = Math.random()
      passphrase += possible.charAt(Math.floor(randomNumber * possible.length))
    }
    return passphrase
  }
}
