import React from "react";
import { NavLink } from "react-router-dom";
import VisorBlanco from "../../../assets/img/VisorBlanco.png";
import "./Login.css";

function NavBar(){
  
  return (
        <div className="nav-app">
          <nav className="navbar navbar-expand-lg navbar-dark">
              <NavLink exact to="/" className="navbar-brand">
                <img src={VisorBlanco} alt="Logo" className="logo ml-4"/>
              </NavLink>
              {
                /*
                <button className="navbar-toggler mr-4" type="button" data-toggle="collapse" data-target="#opciones">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="opciones">
                  <ul className="navbar-nav my-1">                 
                  </ul>
                </div> 
                */
              }
              
            </nav>
        </div>
  );
}

export default NavBar;
