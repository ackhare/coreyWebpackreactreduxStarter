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
import BasicMetaDataForm from "./BasicMetaDataForm";
import API from '../../util/api';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
export class TabContent extends React.Component
{
  constructor(props) {
    super(props);
    console.log(this.props);
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

    return (
      <div>
        {this.props.activeTab.name === 'Meta Updation' ?
<BasicMetaDataForm/>
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
export default TabContent;