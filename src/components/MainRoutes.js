import AboutPage from "./AboutPage";
import indexRoutes from "../routes/index.jsx";
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
import React, { Component } from 'react';
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import DashboardView from "../views/Dashboard/DashboardView";
import UserProfile from "../views/UserProfile/UserProfile";
import Upgrade from "../views/Upgrade/Upgrade";
import FrontDashBoard from "../components/Frontend/FrontDashBoard";
import PrivateRoute from "../components/Frontend/PrivateRoute";
import { NavLink, Route, Switch,withRouter } from "react-router-dom";
import { getCurrentUser, signup } from '../util/APIUtils';
import LoadingIndicator from '../components/Frontend/LoadingIndicator';
import { ACCESS_TOKEN } from '../constants';
class MainRoutes extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: null,
      isLoading: false
    }

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
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      console.log(response);
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      console.log("error");
      this.setState({
        isLoading: false,
        isAuthenticated: false
      });
    });
  }

  componentDidMount() {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    this.loadCurrentUser();
  }
render()
{
  if(this.state.isAuthenticated==null) {
    return <LoadingIndicator />
  }
  else
  {
  return(
<div>
    <Switch>
    <PrivateRoute exact path='/admin' authenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}  name="Home" component={Dashboard}/>

    <PrivateRoute exact path="/admin/user"   authenticated={this.state.isAuthenticated}  component={UserProfile} />
    <PrivateRoute exact path="/admin/dashboard"  authenticated={this.state.isAuthenticated}  component={DashboardView} />
    <PrivateRoute exact path="/admin/blogArunya"   authenticated={this.state.isAuthenticated}  component={Upgrade} />
    <Route   path='/'  isAuthenticated={this.state.isAuthenticated} component={FrontDashBoard}/>

    </Switch>
    </div>
  );
}
}
}
export default withRouter(MainRoutes);
