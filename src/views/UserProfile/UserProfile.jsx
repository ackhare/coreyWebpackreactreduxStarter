import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser,getUserDescriptionFromServer,saveUserDescription } from '../../util/APIUtils';
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
import './UserProfile.css';
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import API from '../../util/api';
import avatar from "../../assets/img/faces/face-3.jpg";
import { FileUploader } from "../../components/FileUploader/FileUploader";
import LoadingIndicator from '../../components/Frontend/LoadingIndicator';
import ToolTip from '../../components/ToolTip/ToolTip';
class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
        pic: null,
        email:null,
        countrty:null,
        city:null,
        postalCode:null,
        fullname:null,
        company:null,
        address:null,
        username:null,
        infodDescription:null,
        usernameCard:null,
        companyCard:null,
        infoDescriptionCard:null,
        fullnameCard:null


        
    }
  
  this.updateAvatar = this.updateAvatar.bind(this);
   this.saveUserDescription = this.saveUserDescription.bind(this);
  //this.fetchIntialAvatar = this.fetchIntialAvatar.bind(this);
  this.handleChangeCompany = this.handleChangeCompany.bind(this);
  this.handleChangeFullName=this.handleChangeFullName.bind(this);
  this.handleChangeCity=this.handleChangeCity.bind(this);
  this.handleChangePostalCode=this.handleChangePostalCode.bind(this);
  this.handleChangeCountry=this.handleChangeCountry.bind(this);
  this.handleChangeAddress=this.handleChangeAddress.bind(this);
}
notify = () => toast("Wow so easy !");
handleChangeInfoDescription(e)
{
  this.setState({
    infoDescription: e.target.value
  });
}
handleChangeCompany(e)
{
  this.setState({
    company: e.target.value
  });
}
handleChangeFullName(e)
{
  this.setState({
    fullname: e.target.value
  });
}
handleChangeCity(e)
{
  this.setState({
    city: e.target.value
  });
}
handleChangePostalCode(e)
{
  this.setState({
    postalCode: e.target.value
  });
}
handleChangeCountry(e)
{
  this.setState({
    country: e.target.value
  });
}
handleChangeAddress(e)
{
  this.setState({
    address: e.target.value
  });
}

 fetchUserDescription()
 {
  getCurrentUser()
  .then(response => {
    console.log(response); 
    var currentUser=response.username;
    this.setState({
      username: currentUser
    });
    getUserDescriptionFromServer(currentUser).then(response1 => {

    var userDescription =getUserDescription(response1); 
    console.log(userDescription);
    
    this.setState({
      company: userDescription.company
    });
    this.setState({
      country: userDescription.country
    });
    this.setState({
      username: currentUser
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
  pic: userDescription.imageUrl
});
this.setState({
  city: userDescription.city
});
this.setState({
  postalCode: userDescription.postalCode
});
this.setState({
  infoDescription: userDescription.infoDescription
});
this.setState({
  isLoading: false
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
   let self=this;
   self.setState({
    isLoading: true
  });
  var company = document.getElementsByClassName("company")[0].value;
  var fullName = document.getElementsByClassName("fullname")[0].value;
  var address = document.getElementsByClassName("address")[0].value;
  var country = document.getElementsByClassName("country")[0].value;
  var city = document.getElementsByClassName("city")[0].value;
  var postalCode = document.getElementsByClassName("postalCode")[0].value;
  var infoDescription = document.getElementsByClassName("infoDescription")[0].value;
  var userDetail={};
  userDetail.fullname=fullName;
  userDetail.address=address;
  userDetail.city=city;
  userDetail.postalCode=postalCode;
  userDetail.companyName=company;
  userDetail.country=country;
  userDetail.infoDescription=infoDescription;
  userDetail.username="chetan";
  console.log(userDetail);
  saveUserDescription(userDetail).then(response => {
    console.log(response);
    self.setState({
      isLoading: false
    });
    toast.success('You have succefully updated your details', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  }).catch(error=> {
    console.log(error);
    self.setState({
      isLoading: false
    });
    toast.error('There was some error, Please contact Administrator', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  }).finally(function () {
    self.setState({
      isLoading: false
    });
  });

  
 }
updateAvatar(fileLocation) {
    this.setState({
      pic: fileLocation
  });
}

componentDidMount() {
  //console.log("userDescription");
  this.notify;
  this.fetchUserDescription();
}




  render() {

    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    else
    return (

      
      
      <div className="wrapper">
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
      <Sidebar {...this.props} />
      <div id="main-panel" className="main-panel" ref="mainPanel">
        <Header {...this.props} />

      <div className="content">
      <span className="shiftBit"><ToolTip toolTipText="This form will update the user profile"/></span>

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
                          onChange: this.handleChangeCompany
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
                          value: this.state.fullname,
                          onChange: this.handleChangeFullName
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
                          value:this.state.address,
                          onChange: this.handleChangeAddress
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
                          value: this.state.city,
                          onChange: this.handleChangeCity
                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control country",
                          placeholder: "Country",
                          value: this.state.country,
                          onChange: this.handleChangeCountry
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control postalCode",
                          placeholder: "ZIP Code",
                          value: this.state.postalCode,
                          onChange: this.handleChangePostalCode
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
                            bsClass="form-control infoDescription"
                            placeholder="Here can be your description"
                            value={this.state.infoDescription || ""}
                            onChange={this.handleChangeInfoDescription.bind(this)}
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
                name={this.state.fullname}
                userName={this.state.username}
                company={this.state.company}
                description={
                  <span className="infoDescription">
                  {this.state.infoDescription}
                  </span>
                }
                // socials={
                //   <div>
                //     <Button simple>
                //       <i className="fa fa-facebook-square" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-twitter" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-google-plus-square" />
                //     </Button>
                //   </div>
                // }
              />
               <FileUploader  currentUser={this.state.username} updateAvatar={(e) => this.updateAvatar(e)}/>
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
