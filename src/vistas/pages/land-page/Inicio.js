import React from "react";
import "./LandPage.css"
import fondo from "../../../assets/img/Fondo1.svg"
import dispositivos from "../../../assets/img/Dispositivos.svg" 
import { CRow, CCol } from "@coreui/react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Inicio(){
    
    const history = useHistory();    

    const login = ()=>{
        history.push("/login");
    }
    const style = {
        backgroundImage: `url(${fondo})`
    }
    return(
        <section id="inicio" className="seccion-inicio" style={style}>
            <div className="container-sm p-inicio">
                <CRow>
                    <CCol md="6">
                        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-white text-center" data-aos="fade-up">
                                Plataforma integral de IIoT aplicada en la Industria 4.0 
                            </h1>                    
                            <h4 className="text-white text-center mt-4" data-aos="fade-up">
                                Incorporando tecnologías innovadoras de microservicios en la nube, algoritmos expertos, IA y adquisición de datos mediante tarjetas inteligentes con conexión LTE-M y NB-IoT, se entrega un servicio que permite potencializar la eficiencia de sus procesos mediante la prevención de fallas y análisis de equipos, procesos y máquinas.
                            </h4>      
                            <Container fluid className="d-flex justify-content-center align-items-center mt-7">
                                <button className="btn btn-outline-light rounded px-5 py-3 mr-3" onClick = {login} data-aos="fade-up">
                                    <h5 className="p-0 m-0">INICIAR SESIÓN</h5>
                                </button>                                          
                            </Container>    
                        </Container>                                                                                                                                    
                    </CCol>
                    <CCol md="6">
                        <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100">
                            <img className = "dispositivos mt-5 mt-md-0" src={dispositivos} data-aos="fade-up"/>
                        </Container>
                    </CCol>
                </CRow>                                                    
            </div>            
        </section>        
    )
}

export default Inicio;