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
import Sidebar from "../../components/Sidebar/Sidebar";
import API from '../../utils/api';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
class Basic extends React.Component{
  constructor() {
    super();
    this.state = {
      valuesField: [],
      isLoading: false
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
render() {
  if (this.state.isLoading) {
    return <p>Loading…</p>;
}
console.log(this.state.valuesField.contactEmail)
return (

  <div className="container">
   <div className="row">
    <h3>Arunya blog metadata</h3>
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
          </div>
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
          <div className="form-group">
          <label>Footer Note</label>
          <input className="form-control"
            type="text"
            name="footerNote"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.footerNote}
          />
          {errors.footerNote}
          </div>
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
          <button  className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

      )}
    </Formik>
  </div>  </div>
);
      }
        }
class TabContent extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**",
      tab: "write"
    };
    this.saveContent = this.saveContent.bind(this);
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }
//         super(props);
//         this.handleMenuClick = this.handleMenuClick.bind(this);
//     }

//     handleMenuClick({ key }) {
//       if(key === "logout") {
//         this.props.onLogout();
//       }
//     
  handleValueChange = value => {
    this.setState({ value });
  };

  handleTabChange = tab => {
    this.setState({ tab });
  };
  fetchData() {
  API.get('/parts/getParts?slug=about')
    .then(res => {
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      console.log(res.data);
      var converter = new Showdown.Converter();
      let html      = converter.makeMarkdown(res.data.html);
      console.log(html);
      this.setState({value:html });
      this.setState({tab:'write' });
    })
  
  }
  componentDidMount() {
    this.fetchData();
  
  }
saveContent()
{
  var converter = new Showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(this.state.value);
  console.log(html)
  console.log(this.state.tab);
  var headers = {
    'Content-Type': 'application/json'
}
let values={};
values.html=html;
values.slug="about"

  API.post("/parts/getPartssAndUpdate?slug=about", values,{headers: headers})
  .then(res => {
    window.scrollTo(0, 0)
    console.log(res);
    console.log(res.data);
 
  }) .catch(error => {
  })

}
  render() {
    const fetchRandomUser = () => API.get("books");
    console.log(fetchRandomUser());
    return (
      <div>
        {this.props.activeTab.name === 'Tab 1' ?
<Basic/>
        :null}
        {this.props.activeTab.name === 'Tab 2' ?
        <section className="panel panel-warning">
          <h2 className="panel-heading">Content 2</h2>
          <p className="panel-body">Atlantic herring jellynose fish Siamese fighting fish pollock: cobbler snakehead sea raven! Freshwater shark sergeant major clingfish sweeper galjoen fish mudfish longjaw mudsucker. Death Valley pupfish pomfret electric ray zingel African glass catfish squawfish yellowtail snapper grunt sculpin.</p>
          <p className="panel-body">Pike ribbon sawtail fish common tunny, yellowfin grouper pearl perch mooneye three-toothed puffer Bengal danio. Black sea bass turbot, "madtom swallower northern anchovy Red whalefish; Redhorse sucker." Filefish yellow jack Japanese eel longfin smelt stargazer saury yellow weaver flounder white croaker pink salmon. Pacific herring, whiff pink salmon jack wallago! Yellow jack alfonsino pike chubsucker, yellowtail collared dogfish rivuline tailor eelblenny silver carp; smalltooth sawfish--sea chub powen giant gourami. Inconnu false trevally pompano, half-gill roundhead black dragonfish damselfish: king of herring.</p>
        </section>
        :null}
        {this.props.activeTab.name === 'Tab 3' ?
        <section className="panel panel-success">
          <h2 className="panel-heading">About Page</h2>
          <div className="container container-full-width">
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
        />
      </div>
      <button onClick={this.saveContent}  className="btn btn-primary upgrade-form-submit">
            Submit
          </button>
        
          </section>
        :null}
       
      </div>
    );
  }
};


var tabData = [
  { name: 'Meta Updation', isActive: true },
  { name: 'Tab 2', isActive: false },
  { name: 'Tab 3', isActive: false }
];
class Icons extends React.Component {


  state = {
    activeTab: tabData[0]
  }

  handleClick = (tab) => {
    this.setState({activeTab: tab});
  }
  render() {
    return (
      <div className="wrapper">
      <Sidebar {...this.props} />
      <div id="main-panel" className="main-panel" ref="mainPanel">
        <Header {...this.props} />
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            <div>
        <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
         <TabContent activeTab={this.state.activeTab} />
      </div>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
      </div>
      </div>
    );
  }
}



export default Icons;
