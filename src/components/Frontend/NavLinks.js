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

  <div className="row">
  <div className="col-md-6">
<div className="nav"><div className="header-simple">Welcome {currentUserName}</div>
             </div>   </div>
             <div className="col-md-6">
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="#">Home</a></li>
              {/* <li><Link to="/profile">Profile</Link></li> */}
              <li><Link to="/logout">Log Out</Link></li>

            </ul>

          </div>
          </div>   

    );
    }
    else
    {
      return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/signup">Signup</Link></li> */}
      </ul>
  </div>
      );
    }
  }
}
