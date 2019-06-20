import React, { Component } from 'react';
// import './App.css';
import {
  Route,
  withRouter,
  Switch,
  BrowserRouter,
  Link
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
import Content from './Content';
import NotificationSystem from "react-notification-system";
import SignUpForm from '../Forms/SignUpForm';
import NavLinks from './NavLinks';
import Logout from "./Logout";
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

  //Header method
       handleMenuClick({ key }) {
       if(key === "logout") {
         this.props.onLogout();
      }
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
    console.log("c khasgckasvcaskcgasclasclgo");
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

    this.props.history.push({
    pathname: '/',
    state: { detail: 'login'}
  });
  }
render() {
  if(this.state.isLoading) {
    return <LoadingIndicator />
  }
  return (

<div className="wrapperFront">
{/* 
<SideBar/> */}

<div id="contentFront">

    <nav className="navbar navbar-default">
        <div className="container-fluid">

            <div className="navbar-header">
                          {/* <button type="button" id="sidebarCollapseFront" className="navbar-btn" onClick={this.toggleSideBar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button> */}
            </div>
            <NavLinks isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></NavLinks>
        </div>
        
    </nav>
    
    <Switch>

<Route exact path="/login"
  render={(props) => <LoginForm onLogin={this.handleLogin} {...props} />}></Route>
<Route exact path="/signup" component={SignUpForm}></Route>

<Route path="/logout"  render={(props) => <Logout  onLogout={this.handleLogout}  />}></Route>
<Route exact path="/users/:username"
  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
</Route>
{/* <Route  exact path="/about"  component={AboutPage}></Route> */}
<Route  path="/" render={(props) => <Content isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}></Route>
{/* <Route component={NotFound}></Route> */}
</Switch>
   </div>
   
</div>
  );
}
}

export default withRouter(FrontDashBoard);
