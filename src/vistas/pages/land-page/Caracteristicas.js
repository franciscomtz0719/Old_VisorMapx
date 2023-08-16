import React from "react";
import "./LandPage.css"
import { CRow, CCol, CCard, CCardHeader, CCardBody, CCardTitle, CCardText} from "@coreui/react";
import { Container } from "react-bootstrap";
import story1 from "../../../assets/img/Story_1.svg";
import story2 from "../../../assets/img/Story_2.svg";
import story3 from "../../../assets/img/Story_3.svg";
import story4 from "../../../assets/img/Story_4.svg";
import story5 from "../../../assets/img/Story_5.svg";

function Caracteristicas(){

    const caracteristicas = [        
        {
            titulo: "Control de usuarios",
            contenido: "El sistema permite la administración y control de los usuarios, así como sus permisos específicos, registro de actividades y responsabilidades, brindando seguridad y confianza de las tareas realizadas a lo largo de su proyecto.",
            imagen: story1
        },
        {
            titulo: "Visualización en tiempo real y sistema 30-30",
            contenido: "Todos los parámetros monitoreados y calculados pueden ser vistos al instante mediante una grafica de Control Estadístico de Procesos (SPC). Además, toda esta información permite que el sistema registre bloques de estadísticas cada 30 minutos, permitiendo su posterior visualización y análisis mediante la generación de reportes.",
            imagen: story2
        },
        {
            titulo: "Administración de recursos, datos y tareas",
            contenido: "Visor MAPX® procesa y analiza cada una de las variables y parámetros de su maquinas o procesos mediante un sistema que distribuye la información en varios niveles de gestión de operaciones, elementos y datos que componen el rendimiento de la maquina. Esto permite el análisis, diagnostico y generación de resultados de la eficiencia de sus proyectos.",
            imagen: story3
        },
        {
            titulo: "Procesamiento de información mediante Algoritmos expertos y Tecnológica única",
            contenido: "Los datos obtenidos por Visor MAPX ® pueden ser procesados por algoritmos especializados en la detección, filtrado, análisis, diagnostico, generación de alertas, detección de eventos, identificación de patrones entre otros. Todos estos algoritmos pueden ser personalizados para cada caso o situación específica dependiendo de las necesidades y adelantos de la industria. Por defecto, se incluyen dos algoritmos: Nivel y Tendencia.",
            imagen: story4
        },
        {
            titulo: "Detección de puntos criticos y alertas emergentes en tiempo real",
            contenido: "Con la tecnología de VisorMAPX® se brinda una poderosa herramienta de detección temprana de situaciones criticas y puntos débiles de cualquier equipo o proceso industrial. Por ello se deja a su disposición un servicio de alertas y notificaciones que llegan directamente a su dispositivo móvil vía Telegram.",
            imagen: story5
        }
    ];

    return(
        <section id="caracteristicas" className="seccion-caracteristicas">
            <Container sm>
                <h1 className="text-left text-azul" data-aos="fade-up">Características</h1>
            </Container>
            <Container sm className="container-cards">
                <CRow className="mt-5 px-5 align-items-stretch">
                    {
                        caracteristicas.map((caracteristica, index) => {
                            return (<CCol md="6" className="mt-3" key={"lp-car"+index}>
                                        <CCard className="carta shadow rounded-lg" data-aos="fade-up">
                                            <CCardHeader class="encabezado">
                                                <h3 className="text-white text-center m-0 p-4">{caracteristica.titulo}</h3>
                                            </CCardHeader>
                                            <CCardBody className="p-5 d-flex flex-column justify-content-center align-items-center">                                
                                                    <div className="d-flex align-items-center justify-content-center" data-aos="fade-up">
                                                        <img src={caracteristica.imagen} className="caracteristica-img"/>
                                                    </div>                                    
                                                    <p className="caracteristica-txt mt-4" data-aos="fade-up">
                                                       {caracteristica.contenido} 
                                                    </p>
                                            </CCardBody>      
                                        </CCard>
                                    </CCol>);    
                        })
                    }                                   
                </CRow>
            </Container>            
        </section>        
    )
}

export default Caracteristicas;