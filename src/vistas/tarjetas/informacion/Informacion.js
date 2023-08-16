import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../../containers/UserContext";
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
import {
  getLandmarksAPI,
  getPaquetesAPI,
  getPeligrosidadAPI,
  getTarjeta,
} from "src/helpers/peticionesAPI";

import InformacionSensor from "./InformacionSensor";
import Sensor from "./Sensor";
import Loader from "src/reusable/Loader";
import iconoactivo from "../../../assets/icons/activo.svg";

import iconoinactivo from "../../../assets/icons/inactivo.svg";
import "./Informacion.css";
import Navegacion, { NavegacionTipo } from "src/vistas/general/Navegacion";
const Informacion = ({
  match: {
    params: { nombreTarjeta },
  },
  history,
}) => {
  const [general, setGeneral] = useState({
    SA: 0,
    SI: 0,
    GA: 0,
    GI: 0,
  });

  const token = localStorage.getItem("token");
  const nombre = nombreTarjeta;

  const [disponible, setDisponible] = useState(false);
  const [graficasInfo, setGraficasInfo] = useState([]);
  const [sensoresInfo, setSensoresInfo] = useState([]);
  const [data, setData] = useState({
    estado: "inactivo",
    icono: iconoinactivo,
  });
  const [cargando, setCargando] = useState(true);

  const getData = async () => {
    const { graficas, sensores, estado } = await getTarjeta(nombre, token);

    let str_sensores = [];
    sensores.forEach((sensor) => {
      str_sensores.push(`${nombre}.S${sensor.index}`);
    });

    let [valor, land, peligro] = await Promise.all([
      getPaquetesAPI(str_sensores, token, 1),
      getLandmarksAPI(str_sensores, token, 1),
      getPeligrosidadAPI(str_sensores, token, 1),
    ]);

    let arr_sensores = [];
    for (let i = 0; i < valor.sensores[0].length; i++) {
      arr_sensores.push({
        nombre: sensores[i].nombre,
        alias: sensores[i].alias,
        estado: sensores[i].estado,
        unidades: sensores[i].unidades,
        min: sensores[i].parametros.rango[0],
        max: sensores[i].parametros.rango[1],
        ...valor.sensores[0][i],
        ...land.sensores[0][i],
        ...peligro.sensores[0][i],
      });
    }

    let countSA = 0;
    let countSI = 0;
    let countGA = 0;
    let countGI = 0;
    let arr_graficas = [];

    graficas.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < valor.sensores.length; i++) {
        let arr = [];
        grafica.sensores.forEach((sensor) => {
          if (sensores[sensor].estado === "activo") {
            countSA += 1;
            arr.push({
              nombre: sensores[sensor].nombre,
              alias: sensores[sensor].alias,
              estado: sensores[sensor].estado,
              unidades: sensores[sensor].unidades,
              min: sensores[sensor].parametros.rango[0],
              max: sensores[sensor].parametros.rango[1],
              ...valor.sensores[i][sensor],
              ...land.sensores[i][sensor],
              ...peligro.sensores[i][sensor],
            });
          }
          if (sensores[sensor].estado === "inactivo") countSI += 1;
        });
        if (arr.length > 0) countGA += 1;
        if (arr.length < 1) countGI += 1;
        arr_grafica.push(arr);
      }

      arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
    });
    setGeneral({
      SA: countSA,
      SI: countSI,
      GA: countGA,
      GI: countGI,
    });
    setSensoresInfo(arr_sensores);
    setGraficasInfo(arr_graficas);
    setDisponible(true);

    const icono = estado == "activo" ? iconoactivo : iconoinactivo;
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);
    setData({ estado: estadoformato, icono });
  };
  const getIntervalo = () => {
    setInterval(async () => {
      const { graficas, sensores, estado } = await getTarjeta(nombre, token);

      let str_sensores = [];
      sensores.forEach((sensor) => {
        str_sensores.push(`${nombre}.S${sensor.index}`);
      });

      let [valor, land, peligro] = await Promise.all([
        getPaquetesAPI(str_sensores, token, 1),
        getLandmarksAPI(str_sensores, token, 1),
        getPeligrosidadAPI(str_sensores, token, 1),
      ]);

      valor.sensores = valor.sensores.reverse();
      land.sensores = land.sensores.reverse();
      peligro.sensores = peligro.sensores.reverse();

      let arr_sensores = [];
      for (let i = 0; i < valor.sensores[0].length; i++) {
        if (valor.sensores[0][i].valor === null) continue;
        else {
          arr_sensores.push({
            nombre: sensores[i].nombre,
            alias: sensores[i].alias,
            estado: sensores[i].estado,
            unidades: sensores[i].unidades,
            min: sensores[i].parametros.rango[0],
            max: sensores[i].parametros.rango[1],
            ...valor.sensores[0][i],
            ...land.sensores[0][i],
            ...peligro.sensores[0][i],
          });
        }
      }

      let countSA = 0;
      let countSI = 0;
      let countGA = 0;
      let countGI = 0;
      let arr_graficas = [];

      if (arr_sensores.length < 1) {
        return;
      } else {
        graficas.forEach((grafica) => {
          let arr_grafica = [];
          for (let i = 0; i < valor.sensores.length; i++) {
            let arr = [];
            grafica.sensores.forEach((sensor) => {
              if (sensores[sensor].estado === "activo") {
                countSA += 1;
                arr.push({
                  nombre: sensores[sensor].nombre,
                  alias: sensores[sensor].alias,
                  estado: sensores[sensor].estado,
                  unidades: sensores[sensor].unidades,
                  min: sensores[sensor].parametros.rango[0],
                  max: sensores[sensor].parametros.rango[1],
                  ...valor.sensores[i][sensor],
                  ...land.sensores[i][sensor],
                  ...peligro.sensores[i][sensor],
                });
              }
              if (sensores[sensor].estado === "inactivo") countSI += 1;
            });

            if (arr.length > 0) countGA += 1;
            if (arr.length < 1) countGI += 1;
            arr_grafica.push(arr);
          }

          arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
        });

        setGeneral({
          SA: countSA,
          SI: countSI,
          GA: countGA,
          GI: countGI,
        });
        setSensoresInfo(arr_sensores);
        setGraficasInfo(arr_graficas);
        setDisponible(true);

        const icono = estado == "activo" ? iconoactivo : iconoinactivo;
        const estadoformato = estado[0].toUpperCase() + estado.substring(1);
        setData({ estado: estadoformato, icono });
      }
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
        activo={0}
        tipo={NavegacionTipo.TARJETA}
        history={history}
        direccion={nombre}
      />
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody className="shadow">
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
        <CCol>
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              General
            </CCardHeader>
            <CCardBody className="shadow">
              <CListGroup accent>
                <CRow className="justify-content-end">
                  <CCol sm="4" className="align-self-center encabezado_general">
                    Sensores
                  </CCol>
                  <CCol sm="4" className="align-self-center encabezado_general">
                    Graficas
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="dark">Activos :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {general.SA}
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {general.GA}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="dark">Inactivos :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {general.SI}
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {general.GI}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="dark">Totales :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {general.SA + general.SI}
                  </CCol>
                  <CCol sm="4" className="align-self-center">
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
              Sensores
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
                <CTabContent className="mt-4">
                  <CTabPane data-tab="grupos">
                    {graficasInfo.map((graficaActiva, idx) => {
                      return (
                        <CCard key={idx}>
                          <CCardHeader className="contenedor-cabecera-grafica">
                            <h4>{graficaActiva.nombre}</h4>
                          </CCardHeader>
                          <CCardBody>
                            <InformacionSensor
                              sensores={graficaActiva.sensores[0]}
                            />
                          </CCardBody>
                        </CCard>
                      );
                    })}
                  </CTabPane>
                  <CTabPane data-tab="todos">
                    <CRow>
                      {sensoresInfo.map((sensor, idx) => {
                        return <Sensor sensor={sensor} key={idx} />;
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

export default Informacion;
