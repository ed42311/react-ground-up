import React, { Component } from 'react';
import { render } from 'react-dom';
import { NavLink } from "react-router-dom";
import { Button, Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import 'css/NavBarComp.css';

export default class NavBarComp extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Bears</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavLink className="navCompItem" to="/">Hello</NavLink>
              <NavLink className="navCompItem" to="/form">Form</NavLink>
              <NavLink className="navCompItem" to="/inventory">Inventory</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
