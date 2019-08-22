import React, { Component } from "react";
import './ToolTip.css';
export default class AboutPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          hover:false
        }
    }
    handleMouseIn() {
        this.setState({ hover: true })
      }
      
      handleMouseOut() {
        this.setState({ hover: false })
      }
    render()
    {
return (
 
      <div className="tooltipReact" onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}><i className="fa fa-question-circle"></i>

          {this.state.hover==true ? <span className="tooltiptext">{this.props.toolTipText}</span> : null }
        
  
    </div>
  );
}
}