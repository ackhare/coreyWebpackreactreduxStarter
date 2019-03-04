import React, { Component } from 'react';
// import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
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

  handleLogin() {

    this.loadCurrentUser();
    console.log("You are login")
    this.props.history.push("/");
  }

render() {
  if(this.state.isLoading) {
    return <LoadingIndicator />
  }
  return (
      <div className="app-container">
         <Header/>
<SideBar/>
            <div className="container">
              <Switch>

                <Route path="/login"
                  render={(props) => <LoginForm onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username"
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                {/* <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute> */}
                {/* <Route component={NotFound}></Route> */}
              </Switch>
            </div>


<Footer/>
      </div>
  );
}
}

export default withRouter(FrontDashBoard);
