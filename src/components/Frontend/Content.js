

import React, { Component } from "react";
import Button from "../../components/CustomButton/CustomButton.jsx";
import UserCard from "../UserCard/UserCard";
import avatar from "../../assets/img/faces/unknown.png";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
import {
  Route,
  withRouter,
  Switch,
  BrowserRouter,
  Link
} from 'react-router-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
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
<div className ="container">

<div className="col-md-offset-2">
Welcome To Arunya Frontend
</div>

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



</div>
<div className="col-md-4">
<Link to="/admin"><i className="fa fa-arrow-right arrow"></i></Link>
</div>

</div>
      );
    }
  }
}
