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
import "./ElementosInformacion.css";

import {
  getElementoById,
  getPaquetesAPI,
  getElementosPaquetesApi,
  getRecursosAPI,
  getLandmarksAPI,
  getPeligrosidadAPI,
} from "../../../helpers/peticionesAPI";
import ElementosInformacionSensores from "./ElementosInformacionSensores";
import ElementosInformacionSensor from "./ElementosInformacionSensor";
import Navegacion, {NavegacionTipo} from "../../general/Navegacion";
import { Redirect } from "react-router-dom";
import Loader from "src/reusable/Loader";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';

const ElementosInformacion = ({
  match: {
    params: { idElemento },
  },
  history
}) => {
  //Para elementos información
  const [sensoresElementosInfo, setSensoresElementosInfo] = useState([]);
  const [graficasElementosInfo, setGraficasElementosInfo] = useState([]);  
  const [cargando, setCargando] = useState(true);
  const intervalo = useRef(null);
  //Para la información general
  const [informacion, setInformacion] = useState({
    nombre: "",
    descripcion: "",
    area: "",
    linea: "",
    tipo: "",
    proceso: "",
    estado:"inactivo",
    icono:iconoinactivo
  });
  const [general, setGeneral] = useState({
    SA: 0,
    SI: 0,
    GA: 0,
    GI: 0,
    VA: 0,
    VI: 0,
  });

  const token = localStorage.getItem("token");
  const id = idElemento;

  const getValor = async () => {
    if (idElemento == undefined) return;

    const  {
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

    let str_sensores = [];
    let str_variables = [];
    variables.forEach((variable) => {
      str_variables.push(`${id}.V${variable.index}`);
    });
    sensores.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });

    const [
      { sensores: sensores_datos },
      land,
      peligro,
      { variables: variables_datos },
    ] = await Promise.all([
      getPaquetesAPI(str_sensores, token, 1),
      getLandmarksAPI(str_sensores, token, 1),
      getPeligrosidadAPI(str_sensores, token, 1),
      getElementosPaquetesApi(str_variables, token, 1),
    ]);

    let arr_sensores_variables = [];
    sensores.map((sensor, idx) => {
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
        tipo: "S",
        ...sensores_datos[0][idx],
        ...land.sensores[0][idx],
        ...peligro.sensores[0][idx],
      });
    });
    variables.forEach((variable, idx) => {
      arr_sensores_variables.push({
        nombre: variable.nombre,
        alias: variable.alias,
        estado: variable.estado,
        unidades: variable.unidades,
        tipo: "V",
        ...variables_datos[0][idx],
      });
    });

    setSensoresElementosInfo(arr_sensores_variables);

    let countSA = 0;
    let countSI = 0;
    let countGA = 0;
    let countGI = 0;
    let countVA = 0;
    let countVI = 0;

    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      grafica.direcciones.forEach((direccion) => {
        if (direccion[0] === "V") {
          const variable_index = variables.find(
            (variable) => variable.index === parseInt(direccion.substring(1))
          );
          if (variable_index.estado === "activo") {
            countVA += 1;
            arr_grafica.push({
              nombre: variable_index.nombre,
              alias: variable_index.alias,
              estado: variable_index.estado,
              unidades: variable_index.unidades,
              tipo: "V",
              ...variables_datos[0][parseInt(variable_index.index)],
            });
          } else {
            countVI += 1;
          }
        } else {
          const direccion_elemento = parseInt(direccion.substring(1));
          const direccion_sensor = sensores[direccion_elemento].direccion;
          const sensor_index = direccion_sensor.slice(
            direccion_sensor.indexOf(".") + 2,
            direccion_sensor.length
          );
          const sensor_info = lista_sensores.find(
            (sensor) => sensor.index === parseInt(sensor_index)
          );
          if (sensor_info.estado === "activo") {
            countSA += 1;
            arr_grafica.push({
              nombre: sensor_info.nombre,
              alias: sensor_info.alias,
              estado: sensor_info.estado,
              unidades: sensor_info.unidades,
              tipo: "S",
              ...sensores_datos[0][direccion_elemento],
              ...land.sensores[0][direccion_elemento],
              ...peligro.sensores[0][direccion_elemento],
            });
          } else {
            countSI += 1;
          }
        }
      });

      if (arr_grafica.length > 0) {
        countGA += 1;
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
      } else {
        countGI += 1;
      }
    });

    setGraficasElementosInfo(arr_graficas);

    const icono = (estado=="activo")?iconoactivo:iconoinactivo;      
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setInformacion({
      nombre,
      identificador,
      descripcion,
      area,
      linea,
      tipo,
      proceso,
      estado:estadoformato,
      icono
    });

    setGeneral({
      SA: countSA,
      SI: countSI,
      GA: countGA,
      GI: countGI,
      VA: countVA,
      VI: countVI,
    });
    

  };
  const getIntervalo = () => {
    return setInterval(getValor, 30000);
  };

  useEffect(async () => {
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
    await getValor();
    intervalo.current = getIntervalo();
    setCargando(false);
  }, [idElemento]);

  if (idElemento == undefined) 
    return <Redirect to="/" />;
  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <CContainer fluid>
      <Navegacion activo={0} tipo={NavegacionTipo.ELEMENTO} history={history} direccion={id}/>
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
              <hr />
              <CListGroup accent>
                <CRow className="justify-content-end">
                  <CCol sm="3" className="align-self-center encabezado_general">
                    Sensores
                  </CCol>
                  <CCol sm="3" className="align-self-center encabezado_general">
                    Variables
                  </CCol>
                  <CCol sm="3" className="align-self-center encabezado_general">
                    Grupos
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="3">
                    <CListGroupItem accent="dark">Inactivos :</CListGroupItem>
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.SI}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.VI}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.GI}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm="3">
                    <CListGroupItem accent="dark">Activos :</CListGroupItem>
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.SA}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.VA}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.GA}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm="3">
                    <CListGroupItem accent="dark">Totales :</CListGroupItem>
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.SA + general.SI}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.VA + general.VI}
                  </CCol>
                  <CCol sm="3" className="align-self-center">
                    {general.GA + general.GI}
                  </CCol>
                </CRow>                
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              Sensores / Variables
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="grupos">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="grupos">Grupos</CNavLink>
                  </CNavItem>
                  {/* <CNavItem>
                    <CNavLink data-tab="todos">Todos</CNavLink>
                  </CNavItem> */}
                </CNav>
                <CTabContent className="mt-4">
                  <CTabPane data-tab="grupos">
                    {graficasElementosInfo.map((grafica, idx) => {
                      return (
                        <CCard key={"grupos" + idx}>
                          <CCardHeader className="contenedor-cabecera-grafica">
                            <h4>{grafica.nombre}</h4>
                          </CCardHeader>
                          <CCardBody>
                            <ElementosInformacionSensores
                              sensores={grafica.datos}
                            />
                          </CCardBody>
                        </CCard>
                      );
                    })}
                  </CTabPane>
                  <CTabPane data-tab="todos">
                    <CRow>
                      {sensoresElementosInfo.map((sensor, idx) => {
                        return (
                          <ElementosInformacionSensor
                            key={"todos" + idx}
                            sensor={sensor}
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

export default ElementosInformacion;
