

import React, { Component } from "react";
import './Header.css';
import {   Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem } from 'react-bootstrap';
//https://react-bootstrap.github.io/components/navbar/
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
}

handleMenuClick({ key }) {
  if(key === "logout") {
    //this.props.onLogout();
  }
}
  render() {
    return (
      <div className="app-header">
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">React-Bootstrap</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
    </div>
    );
  }
}



