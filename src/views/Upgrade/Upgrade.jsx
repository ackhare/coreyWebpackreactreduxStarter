import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import { Formik } from 'formik';
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButton/CustomButton";
import Tabs from "../../components/Tabs/Tabs";
import axios from 'axios';
import API from '../../utils/api';
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
        if (!values.siteDescription && this.state.valuesField.length>0) {
          errors.siteDescription = 'Required';
        }
        if (!values.infoTitle && this.state.valuesField.length>0) {
          errors.infoTitle = 'Required';
        }
        console.log(values);
        console.log(errors);
        return errors;
      }}
      onChange={(values) => {
console.log("xxxxxx");
        return values;
      }}
      onSubmit={(values) => {
        var headers = {
          'Content-Type': 'application/json'
      }
      console.log("values");
        console.log(values);
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
          <label>Site Description</label>
          <input className="form-control"
            type="text"
            name="siteDescription"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.siteDescription}
          />
          {errors.siteDescription}
          </div>
          <div className="form-group">
          <label>Info Title</label>
          <input className="form-control"
            type="text"
            name="infoTitle"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pathPrefix}
          />
          {errors.infoTitle}
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
        <section className="panel panel-danger">
          <h2 className="panel-heading">Content 3</h2>
          <p className="panel-body">Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>
          <p className="panel-body">Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane. Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea dandelion sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive groundnut broccoli arugula.</p>
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
      </div>
    );
  }
}



export default Icons;
