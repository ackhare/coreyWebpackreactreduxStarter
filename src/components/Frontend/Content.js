

import React, { Component } from "react";
import Button from "../../components/CustomButton/CustomButton.jsx";
import UserCard from "../UserCard/UserCard";
import avatar from "../../assets/img/faces/unknown.png";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Route,
  withRouter,
  Switch,
  BrowserRouter,
  Link
} from 'react-router-dom';
import { FileUploader } from "../../components/FileUploader/FileUploader.js";

//https://react-bootstrap.github.io/components/navbar/
export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gallery: []
  }
  }

  render() {
    let user="";


   
    if(this.props.isAuthenticated)
    {
user=this.props.currentUser;
console.log(user);
    }
    if(!this.props.isAuthenticated)
    {
    return (
<div className ="container">

<div className="col-md-offset-2">
Welcome To Arunya Frontend
</div>

</div>
    );
    }
    else
    {

      //The below piece of code checks that if login for the first time from fronTdashboard
      //handleLogin and with any refreshing or redirection it should not be valled again and again
      if(this.props.location.state !==undefined)
      {

      if(this.props.location.state.detail==="login")
      { 
        
//https://stackoverflow.com/questions/45139189/remove-state-for-current-location
          this.props.history.replace({
              pathname: this.props.location.pathname,
              state: {}
          });
      
      toast.success('You are login into Arunya frontend panel', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
      }
      }
      
      return(

        <div className="row">
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnVisibilityChange
draggable
pauseOnHover
/>
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

<Link to="/admin"><div className="btn btn-primary proceedToAdminBtn">Proceed To Admin Panel</div></Link>

</div>
</div>
      );
    }
  }
}
