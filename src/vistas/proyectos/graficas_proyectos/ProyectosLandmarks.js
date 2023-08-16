import React, { useEffect, useRef, useState } from "react";
import { CCard, CCardBody, CCardGroup, CCardHeader, CCol, CRow } from "@coreui/react";
import {
  getLandmarksAPI,
  getProyectoById,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";
import ProyectosLandmark from "./ProyectosLandmark";
import Loader from "src/reusable/Loader";

const ProyectosLandmarks = ({ idProyecto }) => {
  const [graficasProyectosLandmarks, setGraficasProyectosLandmarks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const intervalo = useRef(null)
  const token = localStorage.getItem("token");
  const id = idProyecto;
  const tarjeta = "19686";

  const getData = async () => {
    const [{
      graficas: graficas_proyecto,
      sensores: sensores_proyecto,
    },{ sensores: lista_sensores }] = await Promise.all([
      getProyectoById(token, id),
      getRecursosAPI(tarjeta, token)
    ]);

    let str_sensores = [];
    sensores_proyecto.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });
    let { sensores: sensores_datos } = await getLandmarksAPI(
      str_sensores,
      token,
      10
    );
    sensores_datos = sensores_datos.reverse();

    let arr_graficas = [];
    graficas_proyecto.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < sensores_datos.length; i++) {
        let arr_sensores = [];
        grafica.direcciones.forEach((direccion) => {
          if (direccion[0] === "S") {
            const direccionproyecto = parseInt(direccion.substring(1));
            const direccion_sensor = sensores_proyecto[direccionproyecto].direccion;
            const sensor_index = direccion_sensor.substring(
              direccion_sensor.indexOf(".") + 2
            );
            const sensor_info = lista_sensores.find(
              (sensor) => sensor.index === parseInt(sensor_index)
            );
            if (sensor_info.estado === "activo") {
              arr_sensores.push({
                nombre: sensor_info.nombre,
                alias: sensor_info.alias,
                tipo: "S",
                ...sensores_datos[i][direccionproyecto],
              });
            }
          }
        });
        if (arr_sensores.length > 0) {
          arr_grafica.push(arr_sensores);
        }
      }
      if (arr_grafica.length > 0) {
        arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica });
      }
    });
    setGraficasProyectosLandmarks(arr_graficas);
  };
  const getIntervalo = () => {
    setInterval(async () => {
      const [{
        graficas: graficas_proyecto,
        sensores: sensores_proyecto,
      },{ sensores: lista_sensores }] = await Promise.all([
        getProyectoById(token, id),
        getRecursosAPI(tarjeta, token)
      ]);

      let str_sensores = [];
      sensores_proyecto.forEach((sensor) => {
        str_sensores.push(`${sensor.direccion}`);
      });
      let { sensores: sensores_datos } = await getLandmarksAPI(
        str_sensores,
        token,
        1
      );
      sensores_datos = sensores_datos.reverse();

      let arr_graficas = [];
      graficas_proyecto.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < sensores_datos.length; i++) {
          let arr_sensores = [];
          grafica.direcciones.forEach((direccion) => {
            if (direccion[0] === "S") {
              const direccionproyecto = parseInt(direccion.substring(1));
              const direccion_sensor = sensores_proyecto[direccionproyecto].direccion;
              const sensor_index = direccion_sensor.substring(
                direccion_sensor.indexOf(".") + 2
              );
              const sensor_info = lista_sensores.find(
                (sensor) => sensor.index === parseInt(sensor_index)
              );
              if (sensor_info.estado === "activo") {
                arr_sensores.push({
                  nombre: sensor_info.nombre,
                  alias: sensor_info.alias,
                  tipo: "S",
                  ...sensores_datos[i][direccionproyecto],
                });
              }
            }
          });
          if (arr_sensores.length > 0) {
            arr_grafica.push(arr_sensores);
          }
        }
        if (arr_grafica.length > 0) {
          arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica });
        }
      });
      setGraficasProyectosLandmarks(arr_graficas);
    }, 30000);
  };
  
  useEffect(() => {    
    return () => {
      if(intervalo.current!=null)
        clearInterval(intervalo.current);
    }
  }, [])
  useEffect(async () => {
    setCargando(true);
    if(intervalo.current!=null){
      clearInterval(intervalo.current);
      intervalo.current = null;
    }
    await getData();
    intervalo.current = getIntervalo();
    setCargando(false);
  }, [idProyecto]);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <CRow>
      {graficasProyectosLandmarks.map((grafica, idx) => {
        return (
          <CCol sm="12" md="6" key={idx}>
            <CCard className="shadow">
              <CCardHeader className="contenedor-cabecera">
                <h6 className="m-2">{grafica.nombre}</h6>
              </CCardHeader>
              <CCardBody>
                <ProyectosLandmark sensores={grafica.datos} />
              </CCardBody>
            </CCard>
          </CCol>
        );
      })}
    </CRow>
  );
};

export default ProyectosLandmarks;
