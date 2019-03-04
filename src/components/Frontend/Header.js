import React, { Component } from "react";
export default class Header extends Component {
  render(){
      return (
           <header id="header" className="header">
          <div className="header-menu">
              <div className="col-sm-7">
                  <a id="menuToggle" className="menutoggle pull-left"><i className="fa fa fa-tasks"></i></a>
                  <div className="header-left">
                      <button className="search-trigger"><i className="fa fa-search"></i></button>
                      <div className="form-inline">
                          <form className="search-form">
                              <input className="form-control mr-sm-2" placeholder="Search ..." aria-label="Search" type="text"/>
                              <button className="search-close" type="submit"><i className="fa fa-close"></i></button>
                          </form>
                      </div>
                  </div>
               </div>
          </div>

      </header>

      )
  }
}