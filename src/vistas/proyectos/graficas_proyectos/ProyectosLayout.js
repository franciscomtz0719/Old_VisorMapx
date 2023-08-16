import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CButton,
} from "@coreui/react";
import { getProyectoById } from "src/helpers/peticionesAPI";
import "./ProyectosGraficas.css";
import ProyectosBasicas from "./ProyectosBasicas";
import ProyectosLandmarks from "./ProyectosLandmarks";
import ProyectosPeligrosidades from "./ProyectosPeligrosidades";
import ProyectosCustom from "./ProyectosCustom";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import Loader from "src/reusable/Loader";

const ProyectosLayout = ({
  match: {
    params: { idProyecto },
  }
}) => {

  const [informacion, setInformacion] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    estado:"inactivo",
    icono:iconoinactivo
  });
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem("token");
  const id = idProyecto;

  const getValor = async ()=>{
    const {      
      nombre,
      estado,
      tipo,
      descripcion,
    } = await getProyectoById(token, id);
    const icono = (estado=="activo")?iconoactivo:iconoinactivo;      
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setInformacion({
      nombre,
      descripcion,
      tipo,
      estado:estadoformato,
      icono
    });
  }
  const getIntervalo = ()=>{
    return setInterval(getValor,30000);
  }

  useEffect(async () => {
    setCargando(true);    
    await getValor();
    const intervalo = getIntervalo();
    setCargando(false);    
    return () => clearInterval(intervalo); 
  }, []);
  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol className="col-3 d-flex align-items-center">
                  <img src={informacion.icono} className="icono"/>
                  <h4 className="ml-2">{informacion.estado}</h4>
                </CCol>
                <CCol className="col-9 text-right">
                  <h5>Proyecto</h5>
                  <h3>{`${informacion.nombre}`}</h3>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              General
            </CCardHeader>
            <CCardBody>
              <CListGroup accent>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Descripción :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.descripcion}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Tipo :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.tipo}
                  </CCol>
                </CRow>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>      
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              <h4>
                <i className="far fa-chart-bar"></i> <span> Graficas </span>
              </h4>
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="custom">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="custom">Custom</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="basica">Basica</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="nivel">Nivel</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="tendencia">Tendencia</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="custom">
                    {" "}
                    <div className="mt-4">
                      <ProyectosCustom idProyecto={id} />
                    </div>{" "}
                  </CTabPane>
                  <CTabPane data-tab="basica">
                    {" "}
                    <div className="mt-4">
                      <ProyectosBasicas idProyecto={id} />{" "}
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="nivel">
                    {" "}
                    <div className="mt-4">
                      <ProyectosLandmarks idProyecto={id} />{" "}
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="tendencia">
                    {" "}
                    <div className="mt-4">
                      <ProyectosPeligrosidades idProyecto={id} />
                    </div>{" "}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ProyectosLayout;
