import React from "react";
import VisorBlanco from "../../../assets/img/VisorBlanco.png";
import "./LandPage.css";

function NavBar(){
  return (
        <div className="nav-app">
          <nav className="navbar navbar-expand-lg navbar-dark">
              <a href="#" className="navbar-brand">
                <img src={VisorBlanco} alt="Logo" className="logo ml-4"/>
              </a>
              <button className="navbar-toggler mr-4" type="button" data-toggle="collapse" data-target="#opciones">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="opciones">
                <ul className="navbar-nav my-1">
                  <li className="nav-item active">
                    <a className="nav-link mx-3 mb-0" href="#plataforma"><h5 className="m-0">PLATAFORMA</h5></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link mx-3 my-0" href="#beneficios"><h5 className="m-0">BENEFICIOS</h5></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link mx-3 my-0" href="#caracteristicas"><h5 className="m-0">CARACTERISTICAS</h5></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link mx-3 mt-0" href="#contacto"><h5 className="m-0">CONTACTO</h5></a>
                  </li>
                </ul>
              </div>              
            </nav>
        </div>
  );
}

export default NavBar;
