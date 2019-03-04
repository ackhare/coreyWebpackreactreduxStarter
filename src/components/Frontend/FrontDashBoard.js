import React, { Component } from 'react';
// import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import "./Front.css";
import { getCurrentUser, signup } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
import Header from './Header';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';;
import NotFound from './NotFound';
import LoadingIndicator from './LoadingIndicator';
import PrivateRoute from './PrivateRoute';
import LoginForm from '../../components/Forms/LoginForm'
import Footer from './Footer';
import SideBar from './SideBar';
// http://tszekely.github.io/react-learning-module/step-02
class FrontDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSideBar=this.toggleSideBar.bind(this);
    // notification.config({
    //   placement: 'topRight',
    //   top: 70,
    //   duration: 3,
    // });
  }
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    // notification[notificationType]({
    //   message: 'Polling App',
    //   description: description,
    // });
  }
  toggleSideBar(event)
  {

      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
  }
  handleLogin() {

    this.loadCurrentUser();
    console.log("You are login");
    this.props.history.push("/");
  }

render() {
  if(this.state.isLoading) {
    return <LoadingIndicator />
  }
  return (

<div className="wrapper">

<nav id="sidebar">
    <div className="sidebar-header">
        <h3>Bootstrap Sidebar</h3>
    </div>

    <ul className="list-unstyled components">
        <p>Dummy Heading</p>
        <li className="active">
            <a className="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
                <li><a href="#">Home 1</a></li>
                <li><a href="#">Home 2</a></li>
                <li><a href="#">Home 3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">About</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
                <li><a href="#">Page 1</a></li>
                <li><a href="#">Page 2</a></li>
                <li><a href="#">Page 3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">Portfolio</a>
        </li>
        <li>
            <a href="#">Contact</a>
        </li>
    </ul>

</nav>

<div id="content">

    <nav className="navbar navbar-default">
        <div className="container-fluid">

            <div className="navbar-header">
                          <button type="button" id="sidebarCollapse" className="navbar-btn" onClick={this.toggleSideBar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Page</a></li>
                    <li><a href="#">Page</a></li>
                    <li><a href="#">Page</a></li>
                    <li><a href="#">Page</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <h2>Collapsible Sidebar Using Bootstrap 3</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <div className="line"></div>

    <h2>Lorem Ipsum Dolor</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

   </div>
</div>
  );
}
}

export default withRouter(FrontDashBoard);
