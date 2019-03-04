import React from 'react';
import { Grid, Nav, NavItem } from 'react-bootstrap';
import './Footer.css';
function Footer(/*props*/) {
  return (
    <footer className="navbar-fixed-bottom footer-arunya">
					<div className="container">
						<div className="row">
							<p className="text-footer">Don't miss my site: <a href="www.devbutze.com">DevButze</a> </p>
						</div>
					</div>
				</footer>
  );
}

export default Footer;
