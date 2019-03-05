
import React, { Component } from "react";
import { Formik } from 'formik';
import API from '../../utils/api';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';
export default class SignUpForm extends Component {

  render() {
    return (
      <div className="container conatiner-signup-form">
      <div className="row" >
       <h3>Sign Up For Arunya Admin Panel</h3>
       <div className="meesaage sub-header-message"></div>
<Formik  enableReinitialize={true}
        //initialValues={this.state.valuesField}
      validate={values => {

        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
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
        }
        if (values.password !== values.rePassword) {
          errors.rePassword = 'Password and RePassword needs to be same';
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
        signup(values)
        .then(response => {
    console.log("error Login")
            this.props.history.push("/login");
        }).catch(error => {
          console.log("error sign up")
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

        <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input className="form-control col-md-offset-4"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter Contact Email"
          />
          </div>
          {errors.email}
          <div className="form-group ">

          <input className="form-control col-md-offset-4"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            placeholder="Enter Username"
          />
          {errors.username}
          </div>
          <div className="form-group">

          <input className="form-control col-md-offset-4"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Enter Name"
          />
          {errors.name}
          </div>
          <div className="form-group">

          <input className="form-control col-md-offset-4"
            type="text"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Enter Password"
          />
          {errors.password}
          </div>
          <div className="form-group">
          <input className="form-control col-md-offset-4"
            rows="5"
            id="rePassword"
            name="rePassword"
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Re Enter Password"
          >{values.rePassword}</input>
          {errors.rePassword}
          </div>

          <button  className="btn btn-primary signup-form-submit">
            Sign Up
          </button>
        </form>

      )}

    </Formik>
    </div>
    </div>
)};
      }


// class Signup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: {
//                 value: ''
//             },
//             username: {
//                 value: ''
//             },
//             email: {
//                 value: ''
//             },
//             password: {
//                 value: ''
//             }
//         }
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
//         this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
//         this.isFormInvalid = this.isFormInvalid.bind(this);
//     }

//     handleInputChange(event, validationFun) {
//         const target = event.target;
//         const inputName = target.name;
//         const inputValue = target.value;

//         this.setState({
//             [inputName] : {
//                 value: inputValue,
//                 ...validationFun(inputValue)
//             }
//         });
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         const signupRequest = {
//             name: this.state.name.value,
//             email: this.state.email.value,
//             username: this.state.username.value,
//             password: this.state.password.value
//         };
//         signup(signupRequest)
//         .then(response => {
//             notification.success({
//                 message: 'Polling App',
//                 description: "Thank you! You're successfully registered. Please Login to continue!",
//             });
//             this.props.history.push("/login");
//         }).catch(error => {
//             notification.error({
//                 message: 'Polling App',
//                 description: error.message || 'Sorry! Something went wrong. Please try again!'
//             });
//         });
//     }

//     isFormInvalid() {
//         return !(this.state.name.validateStatus === 'success' &&
//             this.state.username.validateStatus === 'success' &&
//             this.state.email.validateStatus === 'success' &&
//             this.state.password.validateStatus === 'success'
//         );
//     }

//     render() {
//         return (
//             <div className="signup-container">
//                 <h1 className="page-title">Sign Up</h1>
//                 <div className="signup-content">
//                     <Form onSubmit={this.handleSubmit} className="signup-form">
//                         <FormItem
//                             label="Full Name"
//                             validateStatus={this.state.name.validateStatus}
//                             help={this.state.name.errorMsg}>
//                             <Input
//                                 size="large"
//                                 name="name"
//                                 autoComplete="off"
//                                 placeholder="Your full name"
//                                 value={this.state.name.value}
//                                 onChange={(event) => this.handleInputChange(event, this.validateName)} />
//                         </FormItem>
//                         <FormItem label="Username"
//                             hasFeedback
//                             validateStatus={this.state.username.validateStatus}
//                             help={this.state.username.errorMsg}>
//                             <Input
//                                 size="large"
//                                 name="username"
//                                 autoComplete="off"
//                                 placeholder="A unique username"
//                                 value={this.state.username.value}
//                                 onBlur={this.validateUsernameAvailability}
//                                 onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
//                         </FormItem>
//                         <FormItem
//                             label="Email"
//                             hasFeedback
//                             validateStatus={this.state.email.validateStatus}
//                             help={this.state.email.errorMsg}>
//                             <Input
//                                 size="large"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="off"
//                                 placeholder="Your email"
//                                 value={this.state.email.value}
//                                 onBlur={this.validateEmailAvailability}
//                                 onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
//                         </FormItem>
//                         <FormItem
//                             label="Password"
//                             validateStatus={this.state.password.validateStatus}
//                             help={this.state.password.errorMsg}>
//                             <Input
//                                 size="large"
//                                 name="password"
//                                 type="password"
//                                 autoComplete="off"
//                                 placeholder="A password between 6 to 20 characters"
//                                 value={this.state.password.value}
//                                 onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
//                         </FormItem>
//                         <FormItem>
//                             <Button type="primary"
//                                 htmlType="submit"
//                                 size="large"
//                                 className="signup-form-button"
//                                 disabled={this.isFormInvalid()}>Sign up</Button>
//                             Already registed? <Link to="/login">Login now!</Link>
//                         </FormItem>
//                     </Form>
//                 </div>
//             </div>
//         );
//     }

//     // Validation Functions

//     validateName = (name) => {
//         if(name.length < NAME_MIN_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
//             }
//         } else if (name.length > NAME_MAX_LENGTH) {
//             return {
//                 validationStatus: 'error',
//                 errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
//             }
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null,
//               };
//         }
//     }

//     validateEmail = (email) => {
//         if(!email) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Email may not be empty'
//             }
//         }

//         const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
//         if(!EMAIL_REGEX.test(email)) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Email not valid'
//             }
//         }

//         if(email.length > EMAIL_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
//             }
//         }

//         return {
//             validateStatus: null,
//             errorMsg: null
//         }
//     }

//     validateUsername = (username) => {
//         if(username.length < USERNAME_MIN_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
//             }
//         } else if (username.length > USERNAME_MAX_LENGTH) {
//             return {
//                 validationStatus: 'error',
//                 errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
//             }
//         } else {
//             return {
//                 validateStatus: null,
//                 errorMsg: null
//             }
//         }
//     }

//     validateUsernameAvailability() {
//         // First check for client side errors in username
//         const usernameValue = this.state.username.value;
//         const usernameValidation = this.validateUsername(usernameValue);

//         if(usernameValidation.validateStatus === 'error') {
//             this.setState({
//                 username: {
//                     value: usernameValue,
//                     ...usernameValidation
//                 }
//             });
//             return;
//         }

//         this.setState({
//             username: {
//                 value: usernameValue,
//                 validateStatus: 'validating',
//                 errorMsg: null
//             }
//         });

//         checkUsernameAvailability(usernameValue)
//         .then(response => {
//             if(response.available) {
//                 this.setState({
//                     username: {
//                         value: usernameValue,
//                         validateStatus: 'success',
//                         errorMsg: null
//                     }
//                 });
//             } else {
//                 this.setState({
//                     username: {
//                         value: usernameValue,
//                         validateStatus: 'error',
//                         errorMsg: 'This username is already taken'
//                     }
//                 });
//             }
//         }).catch(error => {
//             // Marking validateStatus as success, Form will be recchecked at server
//             this.setState({
//                 username: {
//                     value: usernameValue,
//                     validateStatus: 'success',
//                     errorMsg: null
//                 }
//             });
//         });
//     }

//     validateEmailAvailability() {
//         // First check for client side errors in email
//         const emailValue = this.state.email.value;
//         const emailValidation = this.validateEmail(emailValue);

//         if(emailValidation.validateStatus === 'error') {
//             this.setState({
//                 email: {
//                     value: emailValue,
//                     ...emailValidation
//                 }
//             });
//             return;
//         }

//         this.setState({
//             email: {
//                 value: emailValue,
//                 validateStatus: 'validating',
//                 errorMsg: null
//             }
//         });

//         checkEmailAvailability(emailValue)
//         .then(response => {
//             if(response.available) {
//                 this.setState({
//                     email: {
//                         value: emailValue,
//                         validateStatus: 'success',
//                         errorMsg: null
//                     }
//                 });
//             } else {
//                 this.setState({
//                     email: {
//                         value: emailValue,
//                         validateStatus: 'error',
//                         errorMsg: 'This Email is already registered'
//                     }
//                 });
//             }
//         }).catch(error => {
//             // Marking validateStatus as success, Form will be recchecked at server
//             this.setState({
//                 email: {
//                     value: emailValue,
//                     validateStatus: 'success',
//                     errorMsg: null
//                 }
//             });
//         });
//     }

//     validatePassword = (password) => {
//         if(password.length < PASSWORD_MIN_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
//             }
//         } else if (password.length > PASSWORD_MAX_LENGTH) {
//             return {
//                 validationStatus: 'error',
//                 errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
//             }
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null,
//             };
//         }
//     }

// }

// export default Signup;
