import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card";
import Button from "../../components/CustomButton/CustomButton";
import Tabs from "../../components/Tabs/Tabs";
import TabContent from "../../components/Tabs/TabContent";

// class Tabs extends React.Component
// {
//   render() {
//     return (
//       <ul className="nav nav-tabs">
//         {tabData.map(function(tab){
//           return (
//             <Tab data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
//           );
//         }.bind(this))}
//       </ul>
//     );
//   }
// };
// class Tab extends React.Component
// {
//   render() {
//     return (
//       <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
//         <a href="#">{this.props.data.name}</a>
//       </li>
//     );
//   }
// };

var tabData = [
  { name: 'Tab 1', isActive: true },
  { name: 'Tab 2', isActive: false },
  { name: 'Tab 3', isActive: false }
];
class Icons extends React.Component {

  getInitialState() {
    return {
      activeTab: tabData[0]
    }
  }
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
