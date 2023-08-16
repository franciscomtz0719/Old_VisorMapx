import React from "react";
import "./LandPage.css"
import { CRow, CCol } from "@coreui/react";
import { Container } from "react-bootstrap";
import activo from "../../../assets/icons/activo.svg";
import laptop from "../../../assets/img/img_laptop.svg"

function Beneficios(){
    return(
        <section id="beneficios" className="seccion-beneficios">
            <CRow className="container-fluid">
                <CCol md="6" className="mt-3">
                    <Container fluid className="d-flex flex-column justify-content-center pl-5 h-100">
                        <h1 className="text-left text-white mb-5" data-aos="fade-up">Beneficios</h1>
                        <div className="d-flex align-items-center my-2" data-aos="fade-up">
                            <img src={activo} alt="activo" className="indicador mr-4"/>
                            <h3 className="text-white m-0">Detección temprana de fallas. </h3>
                        </div>
                        <div className="d-flex align-items-center my-2" data-aos="fade-up">
                            <img src={activo} alt="activo" className="indicador mr-4"/>
                            <h3 className="text-white m-0">Reduccion de costos de mantenimiento y tiempos muertos. </h3>
                        </div>
                        <div className="d-flex align-items-center my-2" data-aos="fade-up">
                            <img src={activo} alt="activo" className="indicador mr-4"/>
                            <h3 className="text-white m-0">Extensión de la vida útil de sus equipos. </h3>
                        </div>
                        <div className="d-flex align-items-center my-2" data-aos="fade-up">
                            <img src={activo} alt="activo" className="indicador mr-4"/>
                            <h3 className="text-white m-0">Mejora constante de sus proyectos industriales mediante el análisis de datos. </h3>
                        </div>
                        <div className="d-flex align-items-center my-2" data-aos="fade-up">
                            <img src={activo} alt="activo" className="indicador mr-4"/>
                            <h3 className="text-white m-0">Planificación de mantenimiento preventivo. </h3>
                        </div>
                    </Container>
                </CCol>
                <CCol md="6" className="mt-3">
                    <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100" >
                        <img src={laptop} className="laptop" data-aos="fade-up"/>
                    </Container>
                </CCol>
            </CRow>
        </section>        
    )
}

export default Beneficios;