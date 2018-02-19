import React, { Component } from 'react';
import Hello from 'comp/Hello';
import Form from 'comp/Form';
import Inventory from 'comp/Inventory';
import NavBarComp from 'comp/NavBarComp';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { render } from 'react-dom';
import 'css/App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBarComp/>
          <Switch>
            <Route exact path="/" component={Hello}/>
            <Route path="/form" component={Form}/>
            <Route path="/inventory" component={Inventory}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
