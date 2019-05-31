/* eslint-disable import/no-named-as-default */




import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';



import MainRoutes from "./MainRoutes";
class App extends React.Component {

  render() {
    //toast.configure();
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

