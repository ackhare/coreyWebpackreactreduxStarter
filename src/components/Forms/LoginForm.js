
import React, { Component } from "react";
import { Formik } from 'formik';
import API from '../../utils/api';
import { login } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
class LoginForm extends Component {

  render() {
    return (
      <div className="container">
      <div className="rowDown" >
       <h3>Login Arunya Admin Panel</h3>
       <div className="meesaage sub-header-message"></div>
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
        login(values)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();

        }).catch(error => {
            if(error.status === 401) {
                window.scrollTo(0, 0)
                 const node=document.getElementsByClassName("meesaage")[0]
                node.innerHTML = "<div class='label label-danger'>Your Username or Password is incorrect. Please try again!</div>";

            } else {
              window.scrollTo(0, 0)
              const node=document.getElementsByClassName("meesaage")[0]
             node.innerHTML = "<div class='label label-danger'>Something went wrong . Please contact Admin</div>";

            }
        });
      //   var headers = {
      //     'Content-Type': 'application/json'
      // }
      // console.log(values);
      // let authorDescription=document.getElementById("authorDescription")
      // values.authorDescription=authorDescription.innerHTML;
      //   API.post("blogMetaData/getBlogMetaDataFieldsAndUpdate", values,{headers: headers})
      //   .then(res => {
      //     window.scrollTo(0, 0)
      //     console.log(res);
      //     console.log(res.data);
      //     const node=document.getElementsByClassName("meesaage")[0]
      //     node.innerHTML = "<div class='label label-success'>The form has been successully updated</div>";
      //   }) .catch(error => {
      //     window.scrollTo(0, 0)
      //     const node=document.getElementsByClassName("meesaage")[0]
      //   node.innerHTML = "<div class='label label-danger'>There has been some error posting the form</div>";
      //   })

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
          <label>User Name Or Email</label>
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


          <button  className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

        )}

    </Formik>
  </div>  </div>
)};
      }
export default LoginForm;
