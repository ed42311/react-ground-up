import React, { Component } from 'react';
import { render } from 'react-dom';
import { FormGroup, Button, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import 'css/Form.css';

export default class Form extends Component {
  constructor(){
    super();
    this.state = {
      name : ''
    };
  }

  handleChange(e) {

    this.setState({ name: e.target.value });
      console.log(this.state.name);
  }

  getValidationState() {
    const length = this.state.name.length;
    let warning = '';
    if (length > 10){
      warning = 'success';
    } else if (length > 5) {
      warning = 'warning';
    } else if (length > 0) {
      warning = 'error';
    } else {
      warning = null;
    }
    return warning;
  }

  submitBearName(event) {
    let self = this;
    console.log(this.state.name);
    axios.post('/api/bears', {
        name: this.state.name
    })
      .then(function (response) {
        console.log("hey");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        Form!
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Enter a Bear Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={(e) => this.handleChange(e)}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          <Button onClick={() => this.submitBearName()} >Submit</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
