import React, { useEffect, useRef, useState } from "react";
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
} from "@coreui/react";

import ElementosCustom from "./ElementosCustom";
import ElementosLanmarks from "./ElementosLandmarks";
import ElementosBasicas from "./ElementosBasicas";
import ElementosPeligrosidades from "./ElementosPeligrosidades";
import { getElementoById } from "src/helpers/peticionesAPI";
import Loader from "src/reusable/Loader";
import Navegacion,{NavegacionTipo} from "../../general/Navegacion";
import "./ElementosGraficas.css";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";

const ElementosLayout = ({
  match: {
    params: { idElemento },
  },
  history
}) => {
  const [informacion, setInformacion] = useState({
    nombre: "",
    identificador: "",
    descripcion: "",
    area: "",
    linea: "",
    tipo: "",
    proceso: "",
    estado: "inactivo",
    icono: iconoinactivo,
  });
  const [cargando, setCargando] = useState(true);
  const intervalo = useRef(null);

  const token = localStorage.getItem("token");
  const id = idElemento;

  const GetData = async () => {
    const {
      nombre,
      identificador,
      descripcion,
      area,
      linea,
      proceso,
      tipo,
      estado,
    } = await getElementoById(token, id);
    const icono = estado == "activo" ? iconoactivo : iconoinactivo;
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setInformacion({
      nombre,
      identificador,
      descripcion,
      area,
      linea,
      tipo,
      proceso,
      icono,
      estado: estadoformato,
    });
  };
  const GetIntervalo = () => {
    return setInterval(GetData, 30000);
  };

  useEffect(() => {
    return () => {
      if (intervalo.current != null) clearInterval(intervalo.current);
    };
  }, []);
  useEffect(async () => {
    setCargando(true);
    if (intervalo.current != null) {
      clearInterval(intervalo.current);
      intervalo.current = null;
    }
    await GetData();
    intervalo.current = GetIntervalo();
    setCargando(false);
  }, [idElemento]);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <CContainer fluid>
      <Navegacion activo={2} tipo={NavegacionTipo.ELEMENTO} history={history} direccion={id}/>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol className="col-3 d-flex align-items-center">
                  <img src={informacion.icono} className="icono" />
                  <h4 className="ml-2">{informacion.estado}</h4>
                </CCol>
                <CCol className="col-9 text-right">
                  <h5>Elemento</h5>
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
                    <CListGroupItem accent="info">
                      Identificador :
                    </CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.identificador}
                  </CCol>
                </CRow>
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
                    <CListGroupItem accent="info">Area :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.area}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Linea :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.linea}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Proceso :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.proceso}
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
              <i className="far fa-chart-bar"></i> <span> Graficas </span>
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
                      <ElementosCustom idElemento={idElemento} />
                    </div>{" "}
                  </CTabPane>
                  <CTabPane data-tab="basica">
                    {" "}
                    <div className="mt-4">
                      <ElementosBasicas idElemento={idElemento} />{" "}
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="nivel">
                    {" "}
                    <div className="mt-4">
                      <ElementosLanmarks idElemento={idElemento} />{" "}
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="tendencia">
                    {" "}
                    <div className="mt-4">
                      <ElementosPeligrosidades idElemento={idElemento} />
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

export default ElementosLayout;
