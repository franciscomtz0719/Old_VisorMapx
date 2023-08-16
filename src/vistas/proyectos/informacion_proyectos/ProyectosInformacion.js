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
  CButton,
} from "@coreui/react";
import {
  getLandmarksAPI,
  getPaquetesAPI,
  getPeligrosidadAPI,
  getProyectoById,
  getProyectosPaquetesApi,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";
import ProyectosInformacionSensores from "./ProyectosInformacionSensores";
import "./ProyectosInformacion.css";
import Navegacion,{NavegacionTipo} from "src/vistas/general/Navegacion";
import Loader from "src/reusable/Loader";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";
import ProyectosBasica from "../graficas_proyectos/ProyectosBasica";
import ProyectosLandmark from "../graficas_proyectos/ProyectosLandmark";
import ProyectosPeligrosidad from "../graficas_proyectos/ProyectosPeligrosidad";
import store from "src/store";

const ProyectosInformacion = ({
  match: {
    params: { idProyecto },
  },
  history
}) => {
  
  const {graficasDatos} = store.getState();
  const [informacion, setInformacion] = useState({
    nombre: "",
    identificador:"",
    descripcion:"",
    area:"",
    linea:"",
    proceso:"",      
    tipo:"",
    estado: "inactivo",
    icono: iconoinactivo,
  });
  const [cargando, setCargando] = useState(true);
  const [sensoresProyectoInfo, setSensoresProyectoInfo] = useState([]);
  const [graficasProyectoInfo, setGraficasProyectoInfo] = useState([]);
  const [general, setGeneral] = useState({
    SA: 0,
    SI: 0,
    GA: 0,
    GI: 0,
    VA: 0,
    VI: 0,
  });
  const token = localStorage.getItem("token");
  const id = idProyecto;

  const getValor = async () => {
    const {
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
      variables: variables_proyecto,
    } = await getProyectoById(token, id);
    let tarjeta = "";
    if(sensores_proyecto.length > 0)
      tarjeta = sensores_proyecto[0].direccion.substr(0,5);   
    const { sensores: lista_sensores } = await getRecursosAPI(tarjeta, token);

    let str_sensores = [];
    let str_variables = [];
    variables_proyecto.forEach((variable) => {
      str_variables.push(`${id}.V${variable.index}`);
    });
    sensores_proyecto.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });

    let [
      { sensores: sensores_datos },
      land,
      peligro,
      { variables: variables_datos },
    ] = await Promise.all([
      getPaquetesAPI(str_sensores, token, graficasDatos.corto),
      getLandmarksAPI(str_sensores, token, graficasDatos.corto),
      getPeligrosidadAPI(str_sensores, token, graficasDatos.corto),
      getProyectosPaquetesApi(str_variables, token, graficasDatos.corto),
    ]);

    sensores_datos        = sensores_datos.reverse();
    land.sensore          = land.sensores.reverse();
    peligro.sensores      = peligro.sensores.reverse();
    variables_datos       = variables_datos.reverse();

    let countSA = 0;
    let countSI = 0;
    let countGA = 0;
    let countGI = 0;
    let countVA = 0;
    let countVI = 0;

    let arr_graficas = [];
    graficas_proyecto.forEach((grafica) => {
      let tipo = ''
      let arr_grafica = [];
      for (let i = 0; i < variables_datos.length; i++) {
        let arr_variables = [];
        let arr_sensores = [];
        grafica.direcciones.forEach((direccion) => {
          if (direccion[0] === "V") {
            tipo = 'variable'
            const variable_index = variables_proyecto.find(
              (variable) => variable.index === parseInt(direccion.substring(1))
            );
            if (variable_index.estado === "activo") {
              if(i === 0)
                countVA += 1;
              arr_variables.push({
                nombre: variable_index.nombre,
                alias: variable_index.alias,
                estado: variable_index.estado,
                unidades: variable_index.unidades,
                tipo: "V",
                ...variables_datos[i][parseInt(variable_index.index)],
              });
            } else {
              if(i === 0)
                countVI += 1;
            }
          } else {
            tipo = 'sensor'
            const direccion_proyecto = parseInt(direccion.substring(1));
            const direccion_sensor =
              sensores_proyecto[direccion_proyecto].direccion;
            const sensor_index = direccion_sensor.substring(
              direccion_sensor.indexOf(".") + 2
            );
            const sensor_info = lista_sensores.find(
              (sensor) => sensor.index === parseInt(sensor_index)
            );
            if (sensor_info.estado === "activo") {
              if(i === 0)
                countSA += 1;
              arr_sensores.push({
                nombre: sensor_info.nombre,
                alias: sensor_info.alias,
                estado: sensor_info.estado,
                unidades: sensor_info.unidades,
                tipo: "S",
                ...sensores_datos[i][direccion_proyecto],
                ...land.sensores[i][direccion_proyecto],
                ...peligro.sensores[i][direccion_proyecto],
              });
            } else {
              if(i === 0)
                countSI += 1;
            }
          }
        });
        if (arr_variables.length > 0) {
          arr_grafica.push({datos: arr_variables, tipo: 'variable'});
        }
        if (arr_sensores.length > 0) {
          arr_grafica.push({datos: arr_sensores, tipo: 'sensor'});
        }
      }
      if (arr_grafica.length > 0) {
        countGA += 1;
        arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica, tipo: tipo });
      } else {
        countGI += 1;
      }
    });
    setGraficasProyectoInfo(arr_graficas);

    const icono = estado == "activo" ? iconoactivo : iconoinactivo;
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setInformacion({
      nombre,
      identificador,      
      descripcion,
      area,
      linea,
      proceso,
      tipo,
      estado: estadoformato,
      icono,
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
  const getIntervalo = async () => {
    return setInterval(getValor, 30000);
  };

  useEffect(async () => {
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
      <Navegacion activo={0} tipo={NavegacionTipo.PROYECTO} history={history} direccion={id}/>
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
              <CTabs activeTab="basica">
                <CNav variant="tabs">
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
                <CTabContent className="mt-4">
                  <CTabPane data-tab="basica">
                    {graficasProyectoInfo.map((grafica, idx) => {
                      return (
                        <CCard key={"proyectos" + idx}>
                          <CCardHeader className="contenedor-cabecera-grafica">
                            <h4>{grafica.nombre}</h4>
                          </CCardHeader>
                          <CCardBody>
                            <CRow>
                              <CCol sm="6">
                                <ProyectosInformacionSensores
                                  sensores={grafica.datos}
                                />
                              </CCol>
                              <CCol sm="6">
                                <ProyectosBasica sensores={grafica.datos} />
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCard>
                      );
                    })}
                  </CTabPane>
                  <CTabPane data-tab="nivel">
                    {graficasProyectoInfo.map((grafica, idx) => {
                      return (
                        <CCard key={"proyectos" + idx}>
                          <CCardHeader className="contenedor-cabecera-grafica">
                            <h4>{grafica.nombre}</h4>
                          </CCardHeader>
                          <CCardBody>
                            <CRow>
                              <CCol sm="6">
                                <ProyectosInformacionSensores
                                  sensores={grafica.datos}
                                />
                              </CCol>
                              <CCol sm="6">
                                { grafica.tipo === 'sensor' ?  <ProyectosLandmark sensores={grafica.datos} /> : null}
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCard>
                      );
                    })}
                  </CTabPane>
                  <CTabPane data-tab="tendencia">
                    {graficasProyectoInfo.map((grafica, idx) => {
                      return (
                        <CCard key={"proyectos" + idx}>
                          <CCardHeader className="contenedor-cabecera-grafica">
                            <h4>{grafica.nombre}</h4>
                          </CCardHeader>
                          <CCardBody>
                            <CRow>
                              <CCol sm="6">
                                <ProyectosInformacionSensores
                                  sensores={grafica.datos}
                                />
                              </CCol>
                              <CCol sm="6">
                                { grafica.tipo === 'sensor' ?  <ProyectosPeligrosidad sensores={grafica.datos} /> : null}
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCard>
                      );
                    })}
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

export default ProyectosInformacion;
