import React, { Component } from 'react';


export default class SideBar extends Component{

  render() {
    return (

<nav id="sidebarFront">
    <div className="sidebar-header">
        <h3>Arunya Sidebar</h3>
    </div>

    {/* <ul className="list-unstyled components">
        <p>Dummy Heading</p>
        <li className="active">
            <a className="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
                <li><a href="#">Home 1</a></li>
                <li><a href="#">Home 2</a></li>
                <li><a href="#">Home 3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">About</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
                <li><a href="#">Page 1</a></li>
                <li><a href="#">Page 2</a></li>
                <li><a href="#">Page 3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">Portfolio</a>
        </li>
        <li>
            <a href="#">Contact</a>
        </li>
    </ul> */}

</nav>

    );
    }
}
