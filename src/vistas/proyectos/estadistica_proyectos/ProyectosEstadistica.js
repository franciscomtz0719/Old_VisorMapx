import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CNav,
  CButton,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

import {
  getProyectoById,
  getRecursosAPI,
  getTarjetaEstadistica,
} from "src/helpers/peticionesAPI";
import ProyectosEstadisticaSensores from "./ProyectosEstadisticaSensores";
import ProyectosEstadisticaSensor from "./ProyectosEstadisticaSensor";
import Loader from "src/reusable/Loader";

import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';

import "./Estadisticas.css";
import Navegacion,{NavegacionTipo} from "src/vistas/general/Navegacion";

const ProyectosEstadistica = ({
  match: {
    params: { idProyecto },
  },
  history
}) => {
  const [informacion, setInformacion] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    estado:"inactivo",
    icono:iconoinactivo    
  });
  const [sensoresProyectoEstad, setSensoresProyectoEstad] = useState([]);
  const [graficasProyectoEstad, setGraficasProyectoEstad] = useState([]);
  const [cargando, setCargando] = useState(false);
  const token = localStorage.getItem("token");
  const id = idProyecto;

  const getValor = async () => {
    const
      {
        nombre,
        identificador,      
        descripcion,
        area,
        linea,
        proceso,
        tipo,
        estado,
        graficas: graficas_proyecto,
        sensores: sensores_proyecto,
      } = await  getProyectoById(token, id);
      let tarjeta = "";
      if(sensores_proyecto.length > 0)
        tarjeta = sensores_proyecto[0].direccion.substr(0,5);  
      const { sensores: lista_sensores } = await getRecursosAPI(tarjeta, token);
      
    let str_sensores = [];
    sensores_proyecto.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });
    const { sensores: sensores_estadistica } = await getTarjetaEstadistica(
      str_sensores,
      token
    );

    // Sensores - Todos
    let arr_sensores_variables = [];
    sensores_proyecto.map((sensor, idx) => {
      const direccion_sensor = sensor.direccion;
      const sensor_direccion = direccion_sensor.substring(
        direccion_sensor.indexOf(".") + 2        
      );
      const sensor_info = lista_sensores.find(
        (s) => s.index === parseInt(sensor_direccion)
      );
      arr_sensores_variables.push({
        nombre: sensor_info.nombre,
        alias: sensor_info.alias,
        estado: sensor_info.estado,
        unidades: sensor_info.unidades,
        clase: "S",
        ...sensores_estadistica[0][idx],
      });
    });
    setSensoresProyectoEstad(arr_sensores_variables);

    // Sensores - Graficas
    let arr_graficas = [];
    let count_sensores = 0;
    graficas_proyecto.forEach((grafica) => {
      let arr_grafica = [];
      grafica.direcciones.forEach((direccion) => {
        if (direccion[0] === "S") {
          const direccion_elemento = parseInt(direccion.substring(1));
          const direccion_sensor = sensores_proyecto[direccion_elemento].direccion;
          const sensor_index = direccion_sensor.slice(
            direccion_sensor.indexOf(".") + 2,
            direccion_sensor.length
          );
          const sensor_info = lista_sensores.find(
            (sensor) => sensor.index === parseInt(sensor_index)
          );
          if (sensor_info.estado === "activo") {
            arr_grafica.push({
              nombre: sensor_info.nombre,
              alias: sensor_info.alias,
              estado: sensor_info.estado,
              unidades: sensor_info.unidades,
              clase: "S",
              ...sensores_estadistica[0][direccion_elemento],
            });
            count_sensores += 1;
          }
        }
      });

      if (arr_grafica.length > 0) {
        arr_graficas.push({
          nombre: grafica.nombre,
          datos: { tipo: "sensores", valores: arr_grafica },
        });
      }
    });
    const icono = (estado=="activo")?iconoactivo:iconoinactivo;      
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setInformacion({
      nombre,
      identificador,      
      descripcion,
      area,
      linea,
      proceso,
      tipo,
      estado:estadoformato,
      icono
    });
    setGraficasProyectoEstad(arr_graficas);
  };
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
      <Navegacion activo={2} tipo={NavegacionTipo.PROYECTO} history={history} direccion={id}/>
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
                    <CListGroupItem accent="info">Identificador :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.identificador}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Descripcion :</CListGroupItem>
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
              Sensores
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="grupos">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="grupos">Grupos</CNavLink>
                  </CNavItem>
                  {/*<CNavItem>
                    <CNavLink data-tab="todos">Todos</CNavLink>
                  </CNavItem>*/}
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="grupos">
                    {graficasProyectoEstad.map((grafica, idx) => {
                      return (
                        <div className="contenedor-cabecera-grafica" key={idx}>
                          <h4 className="my-4">{grafica.nombre}</h4>
                          <ProyectosEstadisticaSensores
                            sensores={grafica.datos}
                          />
                        </div>
                      );
                    })}
                  </CTabPane>

                  <CTabPane data-tab="todos">
                    <CRow>
                      {sensoresProyectoEstad.map((sensor, idx) => {
                        return (
                          <ProyectosEstadisticaSensor
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

export default ProyectosEstadistica;
