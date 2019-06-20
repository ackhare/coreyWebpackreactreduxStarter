import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import './Footer.css'
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right-footer navbar-fixed-bottom">
            {/* &copy;  */}
            {new Date().getFullYear()}{" "}
            <a  href="https://www.devarunya.com">Arunya Corp</a>, made with

            love for a better web
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
