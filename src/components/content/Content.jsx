// Dependencies
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import DatePicker from 'react-toolbox/lib/date_picker';

// Styles
import './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      input: 'Word up Dude',
    };
  }
  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    return (
      <div className="content">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
        />
        <Button label="Hello World!" />
        <DatePicker label='Birthdate'/>
        <span>Hello Herminio {this.state.input}</span>
      </div>
    );
  }
}

export default Content;
