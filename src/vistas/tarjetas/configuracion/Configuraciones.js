import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
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
import { getRecursosAPI, getTarjeta } from "src/helpers/peticionesAPI";
import ConfiguracionesSensores from "./ConfiguracionesSensores";
import ConfiguracionesSensor from "./ConfiguracionesSensor";


import Loader from "src/reusable/Loader";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import "./Configuraciones.css";
import Navegacion, {NavegacionTipo} from "src/vistas/general/Navegacion";
const Configuraciones = ({
  match: {
    params: { nombreTarjeta },
  },
  history
}) => {
  const [graficasInfo, setGraficasInfo] = useState([]);
  const [sensoresInfo, setSensoresInfo] = useState([]);
  const [data, setData] = useState({estado:"Inactivo",icono:iconoinactivo});
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem("token");
  const nombre = nombreTarjeta;

  const getValor = async () => {
    if (nombre == undefined) 
      return;

    const { graficas, sensores, estado} = await getTarjeta(nombre, token);
    setSensoresInfo(sensores);

    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      let arr = [];
      grafica.sensores.forEach((sensor) => {
        arr.push({
          ...sensores[sensor],
        });
      });
      arr_grafica.push(...arr);
      arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
    });
    
    setGraficasInfo(arr_graficas);

    const icono = (estado=="activo")?iconoactivo:iconoinactivo;      
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);

    setData({estado:estadoformato,icono}); 

  };

  useEffect(async () => {
    setCargando(true);
    await getValor();
    setCargando(false);
  }, []);

  if (nombreTarjeta == undefined) 
    return <Redirect to="/" />;
  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );    
  return (
    <CContainer fluid>
      <Navegacion activo={1} tipo={NavegacionTipo.TARJETA} history={history} direccion={nombre}/>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody>
              <CRow className="justify-content-between">
              <CCol className="col-6 d-flex align-items-center">
                  <img src={data.icono} className="icono"/>
                  <h4 className="ml-2">{data.estado}</h4>
                </CCol>
                <CCol className="col-6 text-right">
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
              <h4>Sensores</h4>
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="grupos">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="grupos">Grupos</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="todos">Todos</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="grupos">
                    {graficasInfo.map((grafica, idx) => {
                      return (
                        <div className="contenedor-cabecera-grafica" key={idx}>
                          <h4 className="my-4">{grafica.nombre}</h4>
                          <ConfiguracionesSensores
                            tarjeta = {nombre}
                            sensores = {grafica.sensores}
                          />
                        </div>
                      );
                    })}
                  </CTabPane>
                  <CTabPane data-tab="todos" className="mt-4">
                    <CRow>
                      {sensoresInfo.map((sensor, idx) => {
                        return (
                          <ConfiguracionesSensor 
                              tarjeta={nombre} 
                              sensor={sensor} 
                              key={idx} 
                          />
                        );
                      })}
                    </CRow>
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

export default Configuraciones;
