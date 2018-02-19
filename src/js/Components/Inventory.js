import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'css/Inventory.css';

export default class Inventory extends Component {
  constructor () {
    super();
    this.state = {
      bears : []
    };
  }

  componentDidMount(){
    let self = this;
    axios.get('/api/bears')
      .then(function (response) {
        self.setState(
          {
            bears : response.data
          }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        Inventory Bear!
        {this.state.bears.map(bear =>
          <div>
            <h4>{bear.name}</h4>
            <br/>
            <br/>
          </div>
        )}
      </div>
    );
  }
}
