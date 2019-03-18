import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getCurrentUser,getUserDescriptionFromServer } from '../../util/APIUtils';
import {getUserDescription,setUserDescriptionForm } from '../../pojo/UserDescription';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import axios from 'axios';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import API from '../../utils/api';
import avatar from "../../assets/img/faces/face-3.jpg";
import { FileUploader } from "../../components/FileUploader/FileUploader";
import LoadingIndicator from '../../components/Frontend/LoadingIndicator';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        pic: null,
        email:null,
        countrty:null,
        city:null,
        postalCode:null,
        company:null,
        address:null,
        username:null
    }
  
  this.updateAvatar = this.updateAvatar.bind(this);
  this.fetchIntialAvatar = this.fetchIntialAvatar.bind(this);
}
fetchIntialAvatar()
 {

 }
 fetchUserDescription()
 {
  getCurrentUser()
  .then(response => {
    console.log(response); 
    var currentUser=response.username;
    getUserDescriptionFromServer(currentUser).then(response1 => {

    var userDescription =getUserDescription(response1); 
    console.log(userDescription);
    
    this.setState({
      company: userDescription.company
    });
    this.setState({
      username: userDescription.username
    });
    this.setState({
      email: userDescription.email
    });

  this.setState({
    fullname: userDescription.fullname
  });

this.setState({
  address: userDescription.address
});

this.setState({
  city: userDescription.city
});
this.setState({
  postalCode: userDescription.postalCode
});


    }).catch(error1 => {
      this.setState({
        isLoading: false
      });
    });

  }).catch(error => {
    this.setState({
      isLoading: false
    });
  });
 }
 saveUserDescription()
 {
  var company = document.getElementsByClassName("company")[0].value;
 }
updateAvatar(fileLocation) {
    this.setState({
      pic: fileLocation
  });
}

componentDidMount() {
  this.fetchUserDescription();
}



  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    else
    return (
      <div className="wrapper">
      <Sidebar {...this.props} />
      <div id="main-panel" className="main-panel" ref="mainPanel">
        <Header {...this.props} />
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs 
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      proprieties={[
                        {
                          label: "Company",
                          type: "text",
                          bsClass: "form-control company",
                          placeholder: "Company",
                          value: this.state.company,
                        
                        },
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control username",
                          placeholder: "Username",
                          value: this.state.username,
                          disabled:true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control email",
                          placeholder: "Email",
                          value: this.state.email,
                          disabled:true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Full name",
                          type: "text",
                          bsClass: "form-control fullname",
                          placeholder: "Full name",
                          value: this.state.fullName
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Adress",
                          type: "text",
                          bsClass: "form-control address",
                          placeholder: "Home Adress",
                          value:
                          this.state.address
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      proprieties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control city",
                          placeholder: "City",
                          value: this.state.city
                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control country",
                          placeholder: "Country",
                          value: this.state.country
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control postalCode",
                          placeholder: "ZIP Code",
                          value: this.state.postalCode
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            value="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                       
                      </Col>
                    </Row>
                    <Button onClick={this.saveUserDescription} bsStyle="info" pullRight fill>
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage={"https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"}
                avatar={this.state.pic}
                name="Mike Andrew"
                userName="michael24"
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
               <FileUploader  updateAvatar={(e) => this.updateAvatar(e)}/>
            </Col>
          </Row>
        </Grid>
        <div className="text-center mt-5">

      </div>
        <Footer />
      </div>
      </div>
      </div>
    );
  }
}

export default UserProfile;
