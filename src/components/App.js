/* eslint-disable import/no-named-as-default */



import FuelSavingsPage from "./containers/FuelSavingsPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";



import MainRoutes from "./MainRoutes";
class App extends React.Component {

  render() {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
    return (
      <div>
<MainRoutes></MainRoutes>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);

