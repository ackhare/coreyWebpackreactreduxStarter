

import React, { Component } from "react";
import Button from "../../components/CustomButton/CustomButton.jsx";
import UserCard from "../UserCard/UserCard";
import avatar from "../../assets/img/faces/face-3.jpg";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
import {
  Route,
  withRouter,
  Switch,
  BrowserRouter,
  Link
} from 'react-router-dom';
//https://react-bootstrap.github.io/components/navbar/
export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
  }
  render() {
    let user="";
    console.log(this.props);
    console.log(this.props.isAuthenticated);
    if(this.props.isAuthenticated)
    {
user=this.props.currentUser;
console.log(user);
    }
    if(!this.props.isAuthenticated)
    {
    return (
<div>
<NotificationSystem ref="notificationSystem" style={style} />
<button onClick={this._addNotification}>Add notification</button>
<h2>Collapsible Sidebar Using Bootstrap 3</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <div className="line"></div>

      <h2>Lorem Ipsum Dolor</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


</div>
    );
    }
    else
    {
      // <Link to={`${match.url}/${user.id}`} className="column card">
      return(
        <div className="row">
        <div className="col-md-4 col-md-offset-4">
        <UserCard
        bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
        avatar={avatar}
        name={user.name}
        userName={user.username}
        description={
          <span>
            "Lamborghini Mercy
            <br />
            Your chick she so thirsty
            <br />
            I'm in that two seat Lambo"
          </span>
        }
        socials={
          <div>
            <Button simple>
              <i className="fa fa-facebook-square" />
            </Button>
            <Button simple>
              <i className="fa fa-twitter" />
            </Button>
            <Button simple>
              <i className="fa fa-google-plus-square" />
            </Button>
          </div>

        }

      />

<Link to="/admin"><i className="fa fa-arrow-right arrow"></i></Link>
</div></div>
      );
    }
  }
}
