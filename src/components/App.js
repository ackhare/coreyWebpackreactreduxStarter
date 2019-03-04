/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";


import FuelSavingsPage from "./containers/FuelSavingsPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import AboutPage from "./AboutPage";
import indexRoutes from "../routes/index.jsx";
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import DashboardView from "../views/Dashboard/DashboardView";
import UserProfile from "../views/UserProfile/UserProfile";

class App extends React.Component {
  render() {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
    return (
      <div>
        <Switch>
        <Route  exact path='/admin' name="Home" component={Dashboard}/>
        <Route  path='/about' name="About" component={AboutPage}/>
        <Route path="/admin/user"  name= "User Profile" component={UserProfile} />
        <Route path="/admin/dashboard"  name= "User Profile" component={DashboardView} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);

