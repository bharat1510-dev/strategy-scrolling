import React from "react";
import './../App.css';


import PropTypes from 'prop-types'//to boundation for pass props
import { Outlet, Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";



function Navbar(props) {
  console.log('navbar input is ',props);
    return ( 
      <outlet>
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/textform">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent text-light" >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">{props.home}</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">{props.about}</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {props.coustomer_service}
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/" >contact us</a></li>
            <li><a className="dropdown-item" href="/">issue</a></li>
            <li><hr className="dropdown-divider"/>ordered issue</li>
            <li><a className="dropdown-item" href="/">payment issue</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div className={`form-check form-switch mx-1 text-${props.mode==='light'?'dark':'light'}`} >
  <input className="form-check-input" type="checkbox" onClick={props.toggle_mode} role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode==='light'?'dark':'light'} Mode</label>
 
</div>
   <div className="d-flex">
    <div className="bg-primary rounded mx-2" onClick={()=>props.toggle_mode('primary')} style={{height:'30px',width:'30px',cursor:'pointer'}}></div>
   </div>
   <div className="d-flex">
    <div className="bg-warning rounded mx-2" onClick={()=>props.toggle_mode('warning')} style={{height:'30px',width:'30px',cursor:'pointer'}}></div>
   </div>
   <div className="d-flex">
    <div className="bg-success rounded mx-2" onClick={()=>props.toggle_mode('success')} style={{height:'30px',width:'30px',cursor:'pointer'}}></div>
   </div>
   <div className="d-flex">
    <div className="bg-danger rounded mx-2" onClick={()=>props.toggle_mode('danger')} style={{height:'30px',width:'30px',cursor:'pointer'}}></div>
   </div>
   
</div>
    
    
  </div>

</nav>
</outlet>

    );
}

export default Navbar;
// boundation for passing the props lide datatype ,isempty
Navbar.propTypes={
  title:PropTypes.string.isRequired,
  about:PropTypes.string.isRequired
}
Navbar.defaultProps={
  title:'set title'
};