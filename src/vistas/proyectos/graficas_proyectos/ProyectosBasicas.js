import React, { useEffect, useRef, useState } from "react";
import {
  getPaquetesAPI,
  getProyectoById,
  getProyectosPaquetesApi,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";
import { CCard, CCardBody, CCardGroup, CCardHeader, CCol, CRow } from "@coreui/react";
import ProyectosBasica from "./ProyectosBasica";
import Loader from "src/reusable/Loader";

const ProyectosBasicas = ({ idProyecto }) => {
  const [graficasProyectosBasicas, setGraficasProyectosBasicas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const intervalo = useRef(null)
  const token = localStorage.getItem("token");
  const id = idProyecto;
  const tarjeta = "19686";

  const getData = async () => {
    const [{
      graficas: graficas_proyecto,
      sensores: sensores_proyecto,
      variables: variables_proyecto,
    },{ sensores: lista_sensores }] = await Promise.all([
      getProyectoById(token, id),
      getRecursosAPI(tarjeta, token)
    ]);

    let str_sensores = [];
    let str_variables = [];
    variables_proyecto.forEach((variable) => {
      str_variables.push(`${id}.V${variable.index}`);
    });
    sensores_proyecto.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });

    let [{ sensores: sensores_datos },{ variables: variables_datos }] = await Promise.all([
      getPaquetesAPI(str_sensores,token,10),
      getProyectosPaquetesApi(str_variables,token,10)
    ]);    

    variables_datos = variables_datos.reverse();
    sensores_datos = sensores_datos.reverse();

    let arr_graficas = [];
    graficas_proyecto.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < variables_datos.length; i++) {
        let arr_variables = [];
        let arr_sensores = [];
        grafica.direcciones.forEach((direccion) => {
          if (direccion[0] === "V") {
            const variable_index = variables_proyecto.find(
              (variable) => variable.index === parseInt(direccion.substring(1))
            );
            if (variable_index.estado === "activo") {
              arr_variables.push({
                nombre: variable_index.nombre,
                alias: variable_index.alias,
                tipo: "V",
                ...variables_datos[i][parseInt(variable_index.index)],
              });
            }
          } else {
            const direccion_proyecto = parseInt(direccion.substring(1));
            const direccion_sensor = sensores_proyecto[direccion_proyecto].direccion;
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
                ...sensores_datos[i][direccion_proyecto],
              });
            }
          }
        });
        if (arr_variables.length > 0) {
          arr_grafica.push(arr_variables);
        }
        if (arr_sensores.length > 0) {
          arr_grafica.push(arr_sensores);
        }
      }
      if (arr_grafica.length > 0) {
        arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica });
      }
    });
    setGraficasProyectosBasicas(arr_graficas);
  };
  const getIntervalo = () => {
    return setInterval(async () => {
      const [{
        graficas: graficas_proyecto,
        sensores: sensores_proyecto,
        variables: variables_proyecto,
      },{ sensores: lista_sensores }] = await Promise.all([
        getProyectoById(token, id),
        getRecursosAPI(tarjeta, token)
      ]);
  
      let str_sensores = [];
      let str_variables = [];
      variables_proyecto.forEach((variable) => {
        str_variables.push(`${id}.V${variable.index}`);
      });
      sensores_proyecto.forEach((sensor) => {
        str_sensores.push(`${sensor.direccion}`);
      });

      let [{ sensores: sensores_datos },{ variables: variables_datos }] = await Promise.all([
        getPaquetesAPI(str_sensores,token,1),
        getProyectosPaquetesApi(str_variables,token,1)
      ]);  

      let arr_graficas = [];
      graficas_proyecto.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < variables_datos.length; i++) {
          let arr_variables = [];
          let arr_sensores = [];
          grafica.direcciones.forEach((direccion) => {
            if (direccion[0] === "V") {
              const variable_index = variables_proyecto.find(
                (variable) =>
                  variable.index === parseInt(direccion.substring(1))
              );
              if (variable_index.estado === "activo") {
                arr_variables.push({
                  nombre: variable_index.nombre,
                  alias: variable_index.alias,
                  tipo: "V",
                  ...variables_datos[i][parseInt(variable_index.index)],
                });
              }
            } else {
              const direccion_proyecto = parseInt(direccion.substring(1));
              const direccion_sensor = sensores_proyecto[direccion_proyecto].direccion;
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
                  ...sensores_datos[i][direccion_proyecto],
                });
              }
            }
          });
          if (arr_variables.length > 0) {
            arr_grafica.push(arr_variables);
          }
          if (arr_sensores.length > 0) {
            arr_grafica.push(arr_sensores);
          }
        }
        if (arr_grafica.length > 0) {
          arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica });
        }
      });
      setGraficasProyectosBasicas(arr_graficas);
    }, 30000);
  };

  useEffect(() => {
    return ()=>{
      if(intervalo.current!=null)
        clearInterval(intervalo.current);  
    }
  },[])
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
    <div>
       <CRow>
        {graficasProyectosBasicas.map((grafica, idx) => {
          // console.log(grafica.datos)
          return (
            <CCol sm="12" md="6" key={idx}>
              <CCard className="shadow">
                <CCardHeader className="contenedor-cabecera">
                  <h6 className="m-2">{grafica.nombre}</h6>
                </CCardHeader>
                <CCardBody>
                  <ProyectosBasica sensores={grafica.datos} />
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
       </CRow>
    </div>
  );
};

export default ProyectosBasicas;
