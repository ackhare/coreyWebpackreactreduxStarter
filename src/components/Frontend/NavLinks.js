import React, { Component } from "react";
import {Link} from "react-router-dom";
import {   Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem } from 'react-bootstrap';
export default class NavLinks extends Component{
  constructor(props) {
    super(props);

  }
  render(){
    let currentUserName="";
    console.log(this.props.isAuthenticated);
    if(this.props.isAuthenticated===true)
    {
    let currentUser=this.props.currentUser;
    currentUserName=currentUser.name;
    }
    if(this.props.isAuthenticated===true)
    {
    return (


<div id="navbar" className="navbar-collapse collapse">
<span className="col-md-offset-4 label label-success
             ">Welcome {currentUserName}</span>
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="#">Home</a></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/logout">Log Out</Link></li>
              {/* <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li className="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li> */}
            </ul>

          </div>

    );
    }
    else
    {
      return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
      </ul>
  </div>
      );
    }
  }
}
