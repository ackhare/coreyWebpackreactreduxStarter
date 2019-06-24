import React, { Component } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getTags,saveTags,updateTags,getCurrentUser, getUserDescriptionFromServer, saveUserDescription,deleteTags } from '../util/APIUtils';
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
            filterText:"",
            tagsCollection:[],
            editItem:null,
            editItemValue:null //for handleChangeForUpdate 



        }
        this.toggleAddFeature = this.toggleAddFeature.bind(this);
        this.addTags = this.addTags.bind(this);
        this.deleteTags = this.deleteTags.bind(this);
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
    editTags(tagName,e)
    {
      this.setState({
          editItem:tagName,
          editItemValue:tagName
    }); 
   
    }
    handleChangeForUpdate(e)
    {
      this.setState({
        editItemValue: e.target.value
    });
    }
    handleChange(e)
    {
        console.log(e.target.value);
        // this.setState({
        //     unMutatedtagsCollection: this.state.tagsCollection
        // });
        this.setState({
            filterText: e.target.value
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
    updateTags(itemNameOrignal,e)
    {
        let self=this;
        let tag = document.getElementsByClassName("editTagsForSave")[0].value;
        updateTags(tag,itemNameOrignal).then(response => {
         
          self.state.tagsCollection=self.state.tagsCollection.filter(element=> element.name!==itemNameOrignal)
          self.state.tagsCollection.push(response);
            
            self.cancelUpdate();
            self.setState({
              isLoading: false
            });
            toast.success('You have succefully updated tags', {
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
    cancelUpdate(e)
    {
      this.setState({
        editItem:-1
  }); 
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
                            <div className="row">
                            <div className="col-md-6">
                            <div className="col-md-3 shift-up">
                            <button type="button" onClick={this.toggleAddFeature} className="btn btn-primary proceedToAdminBtn"><i className="fa fa-plus" aria-hidden="true"></i>New</button>
                            </div> </div>
                            <div className="col-md-6">
                            <div className="col-md-offset-6">Search : <input type="text" placeholder="Case Senstive Search" value={this.state.filterText} onChange={this.handleChange.bind(this)}/> </div>                        
                            </div>
                                                     
                            </div>
                            <div className="container-fluid">
                            <table id="example" className="table table-striped table-bordered dataTable" role="grid" aria-describedby="example_info">
                                <thead>
                                    <tr role="row">
                                    <th className="sorting_asc" aria-controls="example" aria-sort="ascending"><span className="thTitle">Tags</span></th>
                                    <th className="sorting" aria-controls="example"><span className="thTitle">Action</span></th>
                                   
                                </tr>
                                </thead>
                                <tbody>

                                    <tr role="row" className="odd">
                                    {/* {this.state.addEnable ? ( <td className="sorting_1"><input type="text" className="addTags"></input></td>
                                        ) :(<td className="noDisplay"></td>)} */}
                                           {this.state.addEnable ? ( <td className="sorting_1"><input type="text" className="addTags"></input></td>
                                        ) :(<td className="noDisplay"></td>)} 
  {this.state.addEnable ? ( <td className="sorting_1"><i onClick={this.addTags} className="addPlusBtn fa fa-plus-circle"></i> <i  onClick={this.toggleAddFeature}  className="cancelMinusBtn col-md-offset-1 fa fa-times" aria-hidden="true"></i></td>
                                        ) :(<td className="noDisplay"></td>)}

                                        
                                    </tr>
                                    {this.state.filterText.length==0 ?this.state.tagsCollection.map((item, i) => {
    return [
        <tr key={i}>
          <td>
          {this.state.editItem===item.name ? (<input type="text"  onChange={this.handleChangeForUpdate.bind(this)} value={this.state.editItemValue} className="editTagsForSave"></input>) : <span className="trText">{item.name}</span>}
          </td>
          <td>
          {this.state.editItem===item.name ? (<i onClick={this.updateTags.bind(this,item.name)} className="fa fa-save editPencilBtn" aria-hidden="true"></i>) : (<i onClick={this.editTags.bind(this,item.name)} className="fa fa-pencil editPencilBtn" aria-hidden="true"></i>)}
          {this.state.editItem===item.name ? (<i onClick={this.cancelUpdate.bind(this,item.name)} className="fa fa-times cancelMinusBtn col-md-offset-1" aria-hidden="true"></i>):(<i onClick={this.deleteTags.bind(this,item.name)} className="fa fa-times deleteTrash col-md-offset-1" aria-hidden="true"></i>)}
          </td>
        </tr>

    ];
  }) :
  
  this.state.tagsCollection.filter(element=> element.name.includes(this.state.filterText)).map((item, i) => {
    return [
        <tr key={i}>
          <td>
          {this.state.editItem===item.name ? (<input type="text"  onChange={this.handleChangeForUpdate.bind(this)} value={this.state.editItemValue} className="editTagsForSave"></input>) : (<span className="trText">{item.name}</span>)}
          </td>
          <td>
          {this.state.editItem===item.name ? (<i onClick={this.updateTags.bind(this,item.name)} className="fa fa-save editPencilBtn" aria-hidden="true"></i>) : (<i onClick={this.editTags.bind(this,item.name)} className="fa fa-pencil editPencilBtn" aria-hidden="true"></i>)}
          {this.state.editItem===item.name ? (<i onClick={this.cancelUpdate.bind(this,item.name)} className="fa fa-times cancelMinusBtn col-md-offset-1" aria-hidden="true"></i>):(<i onClick={this.deleteTags.bind(this,item.name)} className="fa fa-times deleteTrash col-md-offset-1" aria-hidden="true"></i>)}
          </td>
        </tr>

    ];
  }) 
  
  }
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
