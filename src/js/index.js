import foo from './foo';
import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

export default class NameBear extends Component {
  constructor() {
    super();
    this.state = {
      bearList: []
    };
  }

  componentDidMount() {
    axios.get("/api/bears")
      .then((response) => {
        this.setState({
          bearList: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        NameBear from react!
        {this.state.bearList.map(bear => bear.name)}
      </div>
    );
  }
}

render(<NameBear />, document.getElementById('bears'));
foo();
