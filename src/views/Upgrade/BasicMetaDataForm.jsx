import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import { Formik } from 'formik';
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButton/CustomButton";
import Tabs from "../../components/Tabs/Tabs";
import axios from 'axios';
import './Upgrade.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ToolTip from "../../components/Tooltip/ToolTip";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from '../../util/api';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
export class BasicMetaDataForm extends React.Component{
  constructor() {
    super();
    this.state = {
      valuesField: [],
      isLoading: false,
      hover:false
    };
    
}
fetchData() {
  this.setState({isLoading: true});
API.get('blogMetaData/getBlogMetaDataField')
  .then(res => {
    this.setState({isLoading: false});
    this.setState({valuesField: res.data});
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  })

}
componentDidMount() {
  this.fetchData();

}

handleMouseIn() {
  this.setState({ hover: true })
}

handleMouseOut() {
  this.setState({ hover: false })
}
render() {
  if (this.state.isLoading) {
    return <p>Loading…</p>;
}
console.log(this.state.valuesField.contactEmail)
return (

  <div className="container">
   <div className="row">
   <div className="nav panelBlock">
    <span className="textTitle">Arunya blog metadata</span> <ToolTip toolTipText="This form will update the DevArunya Blog"/>
    </div>

    <div className="meesaage sub-header-message"></div>
    <Formik  enableReinitialize={true}
        initialValues={this.state.valuesField}
      validate={values => {
        let errors = {};
        if (!values.contactEmail && this.state.valuesField.length>0) {
          errors.contactEmail = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.contactEmail)
        ) {
          errors.contactEmail = 'Invalid email address';
        }
        if (!values.siteTitle && this.state.valuesField.length>0) {
          errors.siteTitle = 'Required';
        }
        if (!values.authorName && this.state.valuesField.length>0) {
          errors.authorName = 'Required';
        }

            if (!values.pathPrefix&& this.state.valuesField.length>0) {
          errors.pathPrefix = 'Required';
        }
        if (!values.authorDescription && this.state.valuesField.length>0) {
          errors.authorDescription = 'Required';
        }
        if (!values.infoTitleNote && this.state.valuesField.length>0) {
          errors.infoTitleNote = 'Required';
        }
        if (!values.footerNote && this.state.valuesField.length>0) {
          errors.footerNote = 'Required';
        }
        if (!values.authorName && this.state.valuesField.length>0) {
          errors.authorName = 'Required';
        }
        console.log(values);
        console.log(errors);
        return errors;
      }}
      onSubmit={(values) => {
        var headers = {
          'Content-Type': 'application/json'
      }
      console.log(values);
      let authorDescription=document.getElementById("authorDescription")
      values.authorDescription=authorDescription.innerHTML;
        API.post("blogMetaData/getBlogMetaDataFieldsAndUpdate", values,{headers: headers})
        .then(res => {
          window.scrollTo(0, 0)
          console.log(res);
          console.log(res.data);
          const node=document.getElementsByClassName("meesaage")[0]
          node.innerHTML = "<div class='label label-success'>The form has been successully updated</div>";
        }) .catch(error => {
          window.scrollTo(0, 0)
          const node=document.getElementsByClassName("meesaage")[0]
        node.innerHTML = "<div class='label label-danger'>There has been some error posting the form</div>";
        })

      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (

        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Contact Email</label>
          <input className="form-control"
            type="email"
            name="contactEmail"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactEmail}
          />
          </div>
          {errors.email}
          <div className="form-group">
          <label>Site title</label>
          <input className="form-control"
            type="text"
            name="siteTitle"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.siteTitle}
          />
          {errors.siteTitle}
          </div>
          {/* <div className="form-group">
          <label>Author Name</label>
          <input className="form-control"
            type="text"
            name="authorName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.authorName}
          />
          {errors.authorName}
          </div>
          <div className="form-group">
          <label>Path Prefix</label>
          <input className="form-control"
            type="text"
            name="pathPrefix"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pathPrefix}
          />
          {errors.pathPrefix}
          </div> */}
          <div className="form-group">
          <label>Author Description</label>
          <textArea className="form-control"
            rows="5"
            id="authorDescription"
            name="authorDescription"
            onChange={handleChange}
            onBlur={handleBlur}
          >{values.authorDescription}</textArea>
          {errors.authorDescription}
          </div>
          <div className="form-group">
          <label>Author Name</label>
          <input className="form-control"
            type="text"
            name="authorName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.authorName}
          />
          {errors.authorName}
          </div>
          {/* <div className="form-group">
          <label>Footer Note</label>
          <input className="form-control"
            type="text"
            name="footerNote"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.footerNote}
          />
          {errors.footerNote}
          </div> */}
          <div className="form-group">
          <label>Info Title Note</label>
          <input className="form-control"
            type="text"
            name="infoTitleNote"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.infoTitleNote}
          />
          {errors.infoTitleNote}
          </div>
          <button  className="btn btn-primary proceedToAdminBtn" type="submit">
            Submit
          </button>
        </form>

      )}
    </Formik>
  </div>  </div>
);
      }
        }

export default BasicMetaDataForm;


