import React from "react";
import "./LandPage.css"
import { Container } from "react-bootstrap";
import mayor from "../../../assets/icons/icon_mayor.svg";

function Plataforma(){
    return(
        <section id="plataforma" className="seccion-plataforma">
            <div className="container-sm p-2">
                <h1 className="t1 m-0 text-left" data-aos="fade-up">¿Qué es</h1>                                   
                <h1 className="t2 m-0 text-left" data-aos="fade-up"><span className="text-azul">Visor MAPX</span>®?</h1>                                   
                <div className="container-fluid" data-aos="fade-up">
                    <p className="p1 mt-5 mb-0 text-justify">Es un <b className="text-azul">sistema integral</b> y <b className="text-azul">modular</b> enfocado en el <b className="text-azul">monitoreo</b> de manera remota y continua del estado de las  <b className="text-azul">máquinas</b> y <b className="text-azul">procesos</b> industriales <b className="text-azul">(Machine Health Monitoring)</b>.</p>
                    <p className="p1 mt-3 mb-0 text-justify">Actualmente, se encuentra especializado y optimizado para su implementación en <b className="text-azul">proyectos industriales</b> donde se requiera un <b className="text-azul">análisis y mejora de su desempeño y calidad</b> de su operación tomando como referencia la <b className="text-azul">NOM 9001 2015</b>(principalmente en los apartados de VERIFICAR) y aplicando análisis <b className="text-azul">SIX-SIGMA</b> para la entrega de estadística.</p>
                    <p className="p1 mt-3 mb-0 text-justify">Su ejecucion, funcionamiento e instalación se adapta a las <b className="text-azul">necesidades del cliente</b> con <b className="text-azul">precisión, seguridad y confiabilidad</b>.</p>
                </div>                
            </div>          
            <div className="container-sm px-2 py-5 mt-5 shadow" data-aos="fade-up">
                <Container fluid className="d-flex flex-column align-items-center justify-content-center pl-0 pr-5 h-100">
                    <p className="p1 mb-0 text-center"><span className="text-azul">Visor MAPX</span>® incorpora tecnología propia; diseñada y desarrollada para operar en hardware y software de manera independiente y en conjunto, todo esto permite cumplir el objetivo de obtener la: </p>
                    <Container fluid className="d-flex flex-wrap align-items-center justify-content-center h-100 px-0 mt-3">
                        <h4 className="obj mb-0 text-left">ADQUISICIÓN</h4>
                        <img src={mayor} alt="mayor" className="img-fluid" />
                        <h4 className="obj mb-0 text-left">ALMACENAMIENTO</h4>
                        <img src={mayor} alt="mayor" className="img-fluid" />
                        <h4 className="obj mb-0 text-left">ANÁLISIS</h4>
                        <img src={mayor} alt="mayor" className="img-fluid" />
                        <h4 className="obj mb-0 text-left">RESULTADOS</h4>
                    </Container>  
                    <p className="p1 mb-0 text-center mt-3">de datos <b className="text-azul">IIoT</b>, estadistica y algoritmos de la <b className="text-azul">Industria 4.0</b></p>
                </Container>                    
            </div>       
        </section>        
    )
}

export default Plataforma;