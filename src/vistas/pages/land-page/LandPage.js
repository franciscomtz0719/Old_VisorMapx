import React, { useEffect } from "react";
import AOS from "aos";

import "./LandPage.css";
import NavBar from "./NavBar";
import Inicio from "./Inicio";
import Plataforma from "./Plataforma";
import Beneficios from "./Beneficios";
import Caracteristicas from "./Caracteristicas";
import Contacto from "./Contacto";
import Footer from "./Footer"

export const LandPage = () => {  

  useEffect(() => {
    AOS.init();
    setTimeout(() => {
      AOS.refresh();
    }, 1);    
  },[]);
  return (
    <div className="landpage">
      <NavBar />         
      <Inicio />
      <Plataforma/>
      <Beneficios/>
      <Caracteristicas/>      
      <Contacto/>              
      <Footer/>   
    </div>    
  );
};

export default LandPage;
