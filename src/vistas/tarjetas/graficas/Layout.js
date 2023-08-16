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
} from "@coreui/react";
import Custom from "./Custom";
import Lanmarks from "./Landmarks";
import Basicas from "./Basicas";
import Peligrosidades from "./Peligrosidades";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";
import Loader from "src/reusable/Loader";
import { getTarjeta } from "src/helpers/peticionesAPI";
import "./Graficas.css";
import Navegacion, { NavegacionTipo } from "src/vistas/general/Navegacion";

const Layout = ({
  match: {
    params: { nombreTarjeta },
  },
  history,
}) => {
  const [data, setData] = useState({
    estado: "inactivo",
    icono: iconoinactivo,
  });
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem("token");
  const nombre = nombreTarjeta;

  const getData = async () => {
    const { estado } = await getTarjeta(nombre, token);
    const icono = estado == "activo" ? iconoactivo : iconoinactivo;
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setData({ estado: estadoformato, icono });
  };
  const getIntervalo = () => {
    return setInterval(async () => {
      const { estado } = await getTarjeta(nombre, token);
      const icono = estado == "activo" ? iconoactivo : iconoinactivo;
      const estadoformato = estado[0].toUpperCase() + estado.substring(1);
      setData({ estado: estadoformato, icono });
    }, 30000);
  };

  useEffect(async () => {
    await getData();
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
      <Navegacion
        activo={2}
        tipo={NavegacionTipo.TARJETA}
        history={history}
        direccion={nombre}
      />
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol className="col-3 d-flex align-items-center">
                  <img src={data.icono} className="icono" />
                  <h4 className="ml-2">{data.estado}</h4>
                </CCol>
                <CCol className="col-9 text-right">
                  <h5>Tarjeta</h5>
                  <h3>{nombre}</h3>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera">
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
                    <div className="mt-4">
                      <Custom nombreTarjeta={nombreTarjeta} />
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="basica">
                    <div className="mt-4">
                      <Basicas nombreTarjeta={nombreTarjeta} />
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="nivel">
                    <div className="mt-4">
                      <Lanmarks nombreTarjeta={nombreTarjeta} />
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="tendencia">
                    <div className="mt-4">
                      <Peligrosidades nombreTarjeta={nombreTarjeta} />
                    </div>
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

export default Layout;
