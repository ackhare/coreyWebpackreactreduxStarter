import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import { Formik } from 'formik';
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButton/CustomButton";
import Tabs from "../../components/Tabs/Tabs";
import TabContent from "./TabContent";
import axios from 'axios';
import './Upgrade.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from '../../util/api';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
var tabData = [
  { name: 'Meta Updation', isActive: true },
  { name: 'Tab 2', isActive: false },
  { name: 'Tab 3', isActive: false }
];
  export class Upgrade extends React.Component {
  

    state = {
      activeTab: tabData[0]
    }
  
    handleClick = (tab) => {
      
     // this.setState({activeTab: tab});
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
  
  
  
  export default Upgrade;