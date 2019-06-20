import React, { Component } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getTags,saveTags,getCurrentUser, getUserDescriptionFromServer, saveUserDescription,deleteTags } from '../util/APIUtils';
import { getUserDescription, setUserDescriptionForm } from '../pojo/UserDescription';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import axios from 'axios';
import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import API from '../util/api';
import avatar from "../assets/img/faces/face-3.jpg";
import { FileUploader } from "../components/FileUploader/FileUploader";
import LoadingIndicator from '../components/Frontend/LoadingIndicator';
import ToolTip from '../components/ToolTip/ToolTip';
import './Tags.css';
class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addEnable: false,
            pic: null,
            email: null,
            countrty: null,
            city: null,
            postalCode: null,
            fullname: null,
            company: null,
            address: null,
            username: null,
            infodDescription: null,
            usernameCard: null,
            companyCard: null,
            infoDescriptionCard: null,
            fullnameCard: null,
            tagsCollection:[]



        }
        this.toggleAddFeature = this.toggleAddFeature.bind(this);
        this.addTags = this.addTags.bind(this);
        this.deleteTags = this.deleteTags.bind(this);
        
        this.updateAvatar = this.updateAvatar.bind(this);
        this.saveUserDescription = this.saveUserDescription.bind(this);
        //this.fetchIntialAvatar = this.fetchIntialAvatar.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
    }
    notify = () => toast("Wow so easy !");
    toggleAddFeature(e)
    {
        if(!this.state.addEnable)
        {
        this.setState({
            addEnable: true
        });
    }
    else
    this.setState({
        addEnable: false
    });
    }
    addTags(e)
    {
        let self=this;
        let tag = document.getElementsByClassName("addTags")[0].value;
        console.log(tag.toString().trim());
        saveTags(tag.toString().trim()).then(response => {

            self.state.tagsCollection.push(response);
            self.toggleAddFeature();
            self.setState({
              isLoading: false
            });
            toast.success('You have added tags', {
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
            }); });
    }
    deleteTags(tagName,e)
    {
       
        // console.log(tag.toString().trim());
        deleteTags(tagName).then(response => {
            console.log(response);
            this.setState({
              isLoading: false
            });
            let coll=this.state.tagsCollection.filter(element => element.id!==response.id);
            console.log(coll);
            this.setState ({
                tagsCollection : coll
            });
            toast.success('You have deleted tags', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
              });
          }).catch(error=> {
            console.log(error);
            this.setState({
              isLoading: false
            }); });
    }
    handleChangeInfoDescription(e) {
        this.setState({
            infoDescription: e.target.value
        });
    }
    handleChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }
    handleChangeFullName(e) {
        this.setState({
            fullname: e.target.value
        });
    }
    handleChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }
    handleChangePostalCode(e) {
        this.setState({
            postalCode: e.target.value
        });
    }
    handleChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }
    handleChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    fetchUserDescription() {
        getCurrentUser()
            .then(response => {
                console.log(response);
                var currentUser = response.username;
                this.setState({
                    username: currentUser
                });
                getUserDescriptionFromServer(currentUser).then(response1 => {

                    var userDescription = getUserDescription(response1);
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
    saveUserDescription() {
        let self = this;
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
        var userDetail = {};
        userDetail.fullname = fullName;
        userDetail.address = address;
        userDetail.city = city;
        userDetail.postalCode = postalCode;
        userDetail.companyName = company;
        userDetail.country = country;
        userDetail.infoDescription = infoDescription;
        userDetail.username = "chetan";
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
        }).catch(error => {
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
        getTags().then(response => {
            console.log(response);
            this.setState({
              isLoading: false
            });

          this.setState({
            tagsCollection: response
          });
          }).catch(error=> {
            console.log(error);
            this.setState({
              isLoading: false
            }); });
    }




    render() {
        var arr = [];
         let json=this.state.tagsCollection;
        Object.keys(json).forEach(function(key) {
          arr.push(json[key]);
        });
        console.log(arr);
        if (this.state.isLoading) {
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
                            {/* <span className="shiftBit"><ToolTip toolTipText="This form will update the user profile" /></span> */}
                            <div className="col-md-2 shift-up">
                            <button type="button" onClick={this.toggleAddFeature} className="btn btn-primary proceedToAdminBtn"><i className="fa fa-plus" aria-hidden="true"></i>New</button>
                            </div>
                            <div className="container-fluid">
                            <table id="example" className="table table-striped table-bordered dataTable" role="grid" aria-describedby="example_info">
                                <thead>
                                    <tr role="row">
                                    <th className="sorting_asc" aria-controls="example" aria-sort="ascending">Tags</th>
                                    <th className="sorting" aria-controls="example">Action</th>
                                   
                                </tr>
                                </thead>
                                <tbody>

                                    <tr role="row" className="odd">
                                    {/* {this.state.addEnable ? ( <td className="sorting_1"><input type="text" className="addTags"></input></td>
                                        ) :(<td className="noDisplay"></td>)} */}
                                           {this.state.addEnable ? ( <td className="sorting_1"><input type="text" className="addTags"></input></td>
                                        ) :(<td className="noDisplay"></td>)} 
  {this.state.addEnable ? ( <td className="sorting_1"><i onClick={this.addTags} className="addPlusBtn fa fa-plus-circle"></i> <i  onClick={this.toggleAddFeature}  className="cancelMinusBtn col-md-offset-2 fa fa-times" aria-hidden="true"></i></td>
                                        ) :(<td className="noDisplay"></td>)}

                                        
                                    </tr>
                                    {this.state.tagsCollection.map((item, i) => {
    return [
        <tr key={i}>
          <td>
            {item.name}
          </td>
          <td>
          <i className="fa fa-pencil editPencilBtn" aria-hidden="true"></i>
          <i onClick={this.deleteTags.bind(this,item.name)} className="fa fa-trash deleteTrash col-md-offset-1" aria-hidden="true"></i>
          </td>
        </tr>

    ];
  })}
                                </tbody>
                                <tfoot>
                                    {/* <tr><th rowspan="1" colspan="1">Name</th><th rowspan="1" colspan="1">Position</th><th rowspan="1" colspan="1">Office</th><th rowspan="1" colspan="1">Age</th><th rowspan="1" colspan="1">Start date</th><th rowspan="1" colspan="1">Salary</th></tr> */}
                                </tfoot>
                            </table>
                            </div>
                            <div className="text-center mt-5">

                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            );
    }
}

export default Tags;
