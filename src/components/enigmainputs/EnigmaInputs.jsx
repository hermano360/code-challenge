import React from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'
import Avatar from 'react-toolbox/lib/avatar'
import Input from 'react-toolbox/lib/input'
import { List, ListItem } from 'react-toolbox/lib/list'

class EnigmaInputs extends React.Component {
  handleInputChange (e) {
    this.setState({ input: e.target.value })
  }

  handleToggle () {
    this.setState({active: !this.state.active})
  }

  render () {
    return (
      <div>
        <List ripple={false}>
          <ListItem ripple={false} avatar={<Avatar title={this.props.avatarTitle} />}>
            <Input type='text' label='Name*'
              name='name' style={{paddingTop: '20px'}}
              value={this.props.name} onChange={this.props.handleNameChange} />
          </ListItem>
        </List>
        <div style={{width: '90%', marginLeft: '5%'}}>
          <Input type='text'
            multiline label='Message'
            value={this.props.message}
            maxLength={120}
            onChange={this.props.handleMessageChange} />
          <DatePicker minDate={this.props.minDate} label='Expiration Date*' value={this.props.expirationDate} onChange={this.props.handleDateChange} />
        </div>
      </div>
    )
  }
}
export default EnigmaInputs
