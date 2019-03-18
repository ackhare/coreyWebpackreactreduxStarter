
import React, { Component } from "react";
import { Formik } from 'formik';
import API from '../../utils/api';
import { login } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
import './Login.css'
class LoginForm extends Component {

  render() {
    return (
      <div className="container conatiner-login-form container-full-width">
      <div className="row" >
       <h3>Login Arunya Admin Panel</h3>
       <div className="meesaage sub-header-message"></div>
<Formik  enableReinitialize={true}
        //initialValues={this.state.valuesField}
      validate={values => {
        let errors = {};
        if (!values.usernameOrEmail) {
          errors.usernameOrEmail = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        console.log("mmmmmmmmmmmmmmmm");


        return errors;
      }}
      onSubmit={(values) => {
        console.log("wwwwwwwwwwwwwwwwwwwww");
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

          <input className="form-control  col-md-offset-4 login-form-username"
            type="text"
            name="usernameOrEmail"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Username Or Email"
            value={values.usernameOrEmail}
          />
          {errors.usernameOrEmail}
          </div>

          <div className="form-group">
          <input className=" form-control col-md-offset-4 login-form-password"
            type="text"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Password"
            value={values.password}
          />
          {errors.password}
          </div>


          <button  className="btn btn-primary login-form-submit">
            Login
          </button>
        </form>

        )}

    </Formik>
  </div>  </div>
)};
      }
export default LoginForm;
