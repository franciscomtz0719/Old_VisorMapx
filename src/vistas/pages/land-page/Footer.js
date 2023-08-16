import React from "react";
import "./LandPage.css"
import { CRow, CCol } from "@coreui/react";
import { Container } from "react-bootstrap";
import logo from "../../../assets/img/LogoVisor.svg"
import flogologo from "../../../assets/img/Flogo_Logo.svg"

function Footer(){
    return(
        <footer className="footer-app">
            <Container fluid className="d-flex align-items-center justify-content-center">
                <img src={logo} className="logo mx-5"/>
                <div className="p-2 bg-white rounded mx-5">
                    <img src={flogologo} className="logo"/>
                </div>                
            </Container>
        </footer>        
    )
}

export default Footer;