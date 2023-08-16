import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { getElementoById, getRecursosAPI } from "src/helpers/peticionesAPI";
import ElementosConfiguracionesSensores from "./ElementosConfiguracionesSensores";

import "./Configuraciones.css";
 
import ElementosConfiguracionesSensor from "./ElementosConfiguracionesSensor";
import Loader from "src/reusable/Loader";
import Navegacion, { NavegacionTipo } from "../../general/Navegacion";


import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';

const ElementosConfiguracion = ({
  match: {
    params: { idElemento },
  },
  history
}) => {
  const [graficasElementosConf, setGraficasElementosConf] = useState([]);
  const [sensoresElementosConf, setSensoresElementosConf] = useState([]);  
  const [informacion, setInformacion] = useState({
    tarjeta: "000000",
    nombre : "",
    identificador: "",
    descripcion: "",
    area: "",
    linea: "",
    tipo: "",
    proceso: "",
    estado:"inactivo",
    icono:iconoinactivo
  });
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem("token");
  const id = idElemento;
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
        sensores,
        variables,
        graficas,
      } = await getElementoById(token, id);
    let tarjeta = "";
    if(sensores.length > 0)
      tarjeta = sensores[0].direccion.substr(0,5);   
    const { sensores: lista_sensores } = await getRecursosAPI(tarjeta, token);

    let arr_sensores_variables = [];
    sensores.forEach((sensor) => {
      const direccion_sensor = sensor.direccion;
      const sensor_direccion = direccion_sensor.substring(
        direccion_sensor.indexOf(".") + 2
      );
      const sensor_info = lista_sensores.find(
        (s) => s.index === parseInt(sensor_direccion)
      );
      arr_sensores_variables.push({
        clase: "S",
        ...sensor_info,
      });
    });
    variables.forEach((variable) => {
      arr_sensores_variables.push({
        clase: "V",
        elemento: id.substring(id.length - 6),
        ...variable,
      });
    });
    setSensoresElementosConf(arr_sensores_variables);

    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      grafica.direcciones.forEach((direccion) => {
        // S0
        if (direccion[0] === "V") {
          const variable_index = variables.find(
            (variable) => variable.index === parseInt(direccion.substring(1))
          );
          if (variable_index.estado === "activo") {
            arr_grafica.push({
              clase: "V",
              elemento: id.substring(id.length - 6),
              ...variable_index,
            });
          }
        } else {
          const direccion_sensor = sensores[parseInt(direccion.substring(1))].direccion;
          const sensor_index = direccion_sensor.substring(
            direccion_sensor.indexOf(".") + 2
          );
          const sensor_info = lista_sensores.find(
            (sensor) => sensor.index === parseInt(sensor_index)
          );
          if (sensor_info.estado === "activo") {
            arr_grafica.push({
              clase: "S",
              ...sensor_info,
            });
          }
        }
      });

      if (arr_grafica.length > 0)
        arr_graficas.push(
          grafica.direcciones[0][0] === "V"
            ? {
                nombre: grafica.nombre,
                datos: { tipo: "variables", valores: arr_grafica },
              }
            : {
                nombre: grafica.nombre,
                datos: { tipo: "sensores", valores: arr_grafica },
              }
        );
    });
    
    setGraficasElementosConf(arr_graficas);
    const icono = (estado.toString()==="activo")?iconoactivo:iconoinactivo;      
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
      estado:estadoformato,
      tarjeta
    });

    

  };

  useEffect(async () => {
    setCargando(true);
    await getValor();
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
      <Navegacion activo={1} tipo={NavegacionTipo.ELEMENTO} history={history} direccion={id}/>
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
            <CCardHeader className="contenedor-cabecera">
              <h4>General</h4>
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
            <CCardHeader className="contenedor-cabecera">
              <h4>Sensores/Variables</h4>
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="graficas">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="graficas">Grupos</CNavLink>
                  </CNavItem>
                  {/* <CNavItem>
                    <CNavLink data-tab="todos">Todos</CNavLink>
                  </CNavItem> */}
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="graficas">
                    {graficasElementosConf.map((grafica, idx) => {
                      return (
                        <div className="contenedor-cabecera-grafica" key={idx}>
                          <h4 className="my-4">{grafica.nombre}</h4>
                          <ElementosConfiguracionesSensores
                            tarjeta={informacion.tarjeta}
                            sensores={grafica.datos}
                          />
                        </div>
                      );
                    })}
                  </CTabPane>

                  <CTabPane data-tab="todos" className="mt-4">
                    <CRow>
                      {sensoresElementosConf.map((sensor, idx) => {
                        return (
                          <ElementosConfiguracionesSensor
                            tarjeta={informacion.tarjeta}
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

export default ElementosConfiguracion;
