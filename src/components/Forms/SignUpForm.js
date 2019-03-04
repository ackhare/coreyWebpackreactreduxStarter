
import React, { Component } from "react";
import { Formik } from 'formik';
import API from '../../utils/api';
class SignUpForm extends Component {

  render() {
    return (

<Formik  enableReinitialize={true}
        //initialValues={this.state.valuesField}
      validate={values => {
        let errors = {};
        if (!values.contactEmail) {
          errors.contactEmail = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.contactEmail)
        ) {
          errors.contactEmail = 'Invalid email address';
        }
        if (!values.username) {
          errors.siteTitle = 'Required';
        }
        if (!values.name) {
          errors.authorName = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.rePassword) {
          errors.rePassword = 'Required';


        return errors;
      }}}
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
          <label>User Name</label>
          <input className="form-control"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {errors.username}
          </div>
          <div className="form-group">
          <label>Name</label>
          <input className="form-control"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name}
          </div>
          <div className="form-group">
          <label>Password</label>
          <input className="form-control"
            type="text"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password}
          </div>
          <div className="form-group">
          <label>Re Enter Password</label>
          <textArea className="form-control"
            rows="5"
            id="rePassword"
            name="rePassword"
            onChange={handleChange}
            onBlur={handleBlur}
          >{values.rePassword}</textArea>
          {errors.rePassword}
          </div>

          <button  className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

      )}

    </Formik>
)};
      }
export default SignUpForm;
