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
} from "@coreui/react";


import {
  getRecursosAPI,
  getTarjeta,
  getTarjetaEstadistica,
} from "src/helpers/peticionesAPI";

import EstadisticaSensores from "./EstadisticaSensores";
import EstadisticasSensor from "./EstadisticasSensor";
import Loader from "src/reusable/Loader";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import "./Estadisticas.css";
import Navegacion,{NavegacionTipo} from "src/vistas/general/Navegacion";

const Estadisticas = ({
  match: {
    params: { nombreTarjeta },
  },
  history
}) => {
  const [graficasInfo, setGraficasInfo] = useState([]);
  const [sensoresInfo, setSensoresInfo] = useState([]);
  const [data, setData] = useState({estado:"inactivo",icono:iconoinactivo});
  const [cargando, setCargando] = useState(true);
  const [token] = useState(localStorage.getItem("token"));
  const nombre = nombreTarjeta;

  const getData = async () => {
      const { graficas, sensores, estado} = await getTarjeta(nombre, token);

      let str_sensores = [];
      sensores.forEach((sensor) => {
        str_sensores.push(`${nombre}.S${sensor.index}`);
      });

      let estadistica = await getTarjetaEstadistica(str_sensores, token);

      let arr_sensores = [];
      for (let i = 0; i < estadistica.sensores[0].length; i++) {
        arr_sensores.push({
          nombre: sensores[i].nombre,
          alias: sensores[i].alias,
          estado: sensores[i].estado,
          unidades: sensores[i].unidades,
          ...estadistica.sensores[0][i],
        });
      }
      setSensoresInfo(arr_sensores);

      // Arreglo que almacena las graficas que se mostraran
      let arr_graficas = [];
      graficas.forEach((grafica) => {
        // Arreglo que almacena una grafica con sus sensores siempre  cuando almenos 1 sensor este activo
        let arr_grafica = [];
        for (let i = 0; i < estadistica.sensores.length; i++) {
          // Arreglo que almacena UNICAMENTE los sensores activos
          let arr = [];
          grafica.sensores.forEach((sensor) => {
            if (sensores[sensor].estado === "activo") {
              // console.log(estadistica.sensores[i][sensor])
              arr.push({
                nombre: sensores[sensor].nombre,
                alias: sensores[sensor].alias,
                estado: sensores[sensor].estado,
                unidades: sensores[sensor].unidades,
                ...estadistica.sensores[i][sensor],
              });
            }
          });
          if (arr.length > 0) arr_grafica.push(arr);
        }
        if (arr_grafica.length > 0)
          arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
      });
      setGraficasInfo(arr_graficas);

      const icono = (estado=="activo")?iconoactivo:iconoinactivo;      
      const estadoformato = estado[0].toUpperCase() + estado.substring(1);
      setData({estado:estadoformato,icono});

  };

  useEffect(async () => {
    await getData();
    const intervalo = setInterval(async () => {
      await getData();
    }, 30000);
    setCargando(false);
    return () => {
      clearInterval(intervalo);
    };
  }, []);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <>
      <Navegacion activo={3} tipo={NavegacionTipo.TARJETA} history={history} direccion={nombre}/>
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

      <CContainer fluid>
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
                      <CNavLink data-tab="grupos">Graficas</CNavLink>
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
                            <EstadisticaSensores
                              sensores={grafica.sensores[0]}
                            />
                          </div>
                        );
                      })}
                    </CTabPane>

                    <CTabPane data-tab="todos" className="mt-4">
                      <CRow>
                        {sensoresInfo.map((sensor, idx) => {
                          return (
                            <EstadisticasSensor sensor={sensor} key={idx} />
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
    </>
  );
};

export default Estadisticas;
