import React from "react";
import "./LandPage.css"
import { CRow, CCol } from "@coreui/react";
import { Container } from "react-bootstrap";
import celular from "../../../assets/img/img_celular.svg"
import logo from "../../../assets/img/VisorBlanco.png"

function Contacto(){

    const contactar = ()=>{

        const contacto = document.createElement("a")
        contacto.href = "mailto:rogelio@grupoflogo.com";
        contacto.click();

    }

    return(
        <section id="contacto" className="seccion-demo">
            <CRow className="container-fluid">
                <CCol md="6" className="mt-3">
                    <Container fluid className="d-flex flex-column justify-content-center pl-5 h-100">
                       <img src={celular} className="celular"/>
                    </Container>
                </CCol>
                <CCol md="6" className="mt-3">
                    <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100" data-aos="fade-up">
                        <Container fluid data-aos="fade-up">
                            <h2 className="text-white text-center">¿Desea ingresar a la industria 4.0?</h2>
                            <div className="d-flex justify-content-center align-items-center">
                                <h1 className="text-white my-o mr-3">Utilice</h1>
                                <img src={logo} className="logo"/>
                            </div>                            
                        </Container>
                        <Container fluid className="mt-7" data-aos="fade-up">
                            <h3 className="text-white text-center mt-2"><b>Contactenos</b></h3>
                            <h4 className="text-white text-center">Asi podremos entregarle una cuenta demo, que le de la oportunidad de observar el potencial de la plataforma</h4>
                            <h3 className="text-white text-center mt-6">Permita que conozcamos sus proyectos y necesidades</h3>                              
                            <h4 className="text-white text-center">Juntos, mejoraremos el rendimiento de sus operaciones optimizando las situaciones criticas de su maquinaria y procesos industriales.</h4>
                        </Container>      
                        <button className="btn btn-outline-light rounded px-5 py-3 mt-7" data-aos="fade-up" onClick={contactar}>
                            <h2 className="p-0 my-0 mx-5">CONTACTAR</h2>
                        </button>                    
                    </Container>
                </CCol>
            </CRow>
        </section>        
    )
}

export default Contacto;