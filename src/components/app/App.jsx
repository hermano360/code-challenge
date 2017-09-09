// Dependencies
import React from 'react'
import { Button } from 'react-toolbox/lib/button'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Input from 'react-toolbox/lib/input'
import Dialog from 'react-toolbox/lib/dialog'
import newPassphrase from '../../api/passphraseGenerator.js'
import Tooltip from 'react-toolbox/lib/tooltip'
import CopyToClipboard from 'react-copy-to-clipboard'
import EnigmaInputs from '../enigmainputs/EnigmaInputs.jsx'
const axios = require('axios')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.generateNewPassphrase = this.generateNewPassphrase.bind(this)
    this.encryptMessage = this.encryptMessage.bind(this)
    this.decryptMessage = this.decryptMessage.bind(this)
    let secretCode = window.location.href.match(/([a-zA-Z0-9]{5})$/g)

    let passphrase
    if (secretCode) {
      passphrase = secretCode[0]
    } else {
      passphrase = newPassphrase.new()
    }

    this.state = {
      message: '',
      name: '',
      active: false,
      expirationDate: '',
      passphrase,
      secretMessage: ''
    }
  }

  handleToggle () {
    this.setState({active: !this.state.active})
  }

  generateNewPassphrase () {
    let passphrase = newPassphrase.new()
    this.setState({passphrase: passphrase})
  }

  encryptMessage () {
    let requestUrl = `/encryption`
    axios({
      method: 'post',
      url: requestUrl,
      data: {
        message: `${this.state.message}#${this.state.expirationDate}`,
        passphrase: this.state.passphrase,
        encrypt: true
      }
    })
    .then((res) => {
      this.setState({
        active: true,
        secretMessage: res.data.newMessage
      })
    }).catch((error) => {
      console.log('not successful')
      console.log(error)
    })
  }

  decryptMessage () {
    let requestUrl = `/encryption`
    axios({
      method: 'post',
      url: requestUrl,
      data: {
        message: this.state.secretMessage,
        passphrase: this.state.passphrase,
        encrypt: false
      }
    })
    .then((res) => {
      let expirationDate
      console.log(res.data.newMessage.replace(/(^.*)#(.*$)/g, '$2'))
      if (res.data.newMessage.replace(/(^.*)#(.*$)/g, '$2') === '') {
        expirationDate = ''
      } else {
        expirationDate = new Date(res.data.newMessage.replace(/(^.*)#(.*$)/g, '$2'))
      }
      this.setState({
        active: !this.state.active,
        message: res.data.newMessage.replace(/(^.*)#(.*$)/g, '$1'),
        expirationDate
      })
    }).catch((error) => {
      console.log('not successful')
      console.log(error)
    })
  }

  render () {
    const TooltipButton = Tooltip('span')

    let minDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    return (
      <div>
        <Card style={{width: '35%', marginLeft: '32.5%'}}>
          <CardTitle
            title="Tovia's Enigma"
          />
          <EnigmaInputs avatarTitle={this.state.name} name={this.state.name}
            handleNameChange={(e) => { this.setState({name: e}) }} message={this.state.message}
            handleMessageChange={(e) => { this.setState({message: e}) }} minDate={minDate}
            expirationDate={this.state.expirationDate} handleDateChange={(e) => {
              this.setState({expirationDate: e})
            }} />
          <CardActions>
            <Button label='Encrypt'
              onClick={() => {
                this.encryptMessage()
              }}
            />
            <Button label='Decrypt' onClick={() => { this.setState({active: true}) }} />
          </CardActions>
          <Dialog
            actions={[
              { label: 'Close', onClick: this.handleToggle },
              { label: 'Decrypt', onClick: this.decryptMessage }
            ]}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='De/Encrypt'
            >
            <Input type='text'
              multiline label='Message'
              value={this.state.secretMessage}
              onChange={(e) => { this.setState({secretMessage: e}) }} />
          </Dialog>
        </Card>
        <div style={{textAlign: 'center', marginTop: '30px'}}>Your Passphrase -
          <CopyToClipboard text={`${window.location.href.replace(/(^.*)([#]+)([a-zA-Z0-9]{5})/g, '$1')}#${this.state.passphrase}`}>
            <TooltipButton tooltip='Click to copy to clipboard'
              style={{cursor: 'pointer', color: 'blue'}}
              > {this.state.passphrase}</TooltipButton>
          </CopyToClipboard>
        </div>
        <div style={{textAlign: 'center', marginTop: '30px', cursor: 'pointer', color: 'blue'}} onClick={this.generateNewPassphrase}>Generate New Passphrase</div>
      </div>
    )
  }
}

export default App
