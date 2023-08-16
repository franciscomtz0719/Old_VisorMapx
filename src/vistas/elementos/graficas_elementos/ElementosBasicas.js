import React, { useEffect, useRef, useState } from "react";
import ElementosBasica from "./ElementosBasica";
import { CCard, CCardBody, CCardHeader, CRow, CCol} from "@coreui/react";

import {
  getElementoById,
  getElementosPaquetesApi,
  getPaquetesAPI,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";

import "./ElementosGraficas.css";
import Loader from "src/reusable/Loader";
import { useStore } from "react-redux";

const ElementosBasicas = ({ idElemento }) => {
  
  const {graficasDatos} = useStore().getState();
  const [graficasElementosInfo, setGraficasElementosInfo] = useState([]);
  const [cargando, setCargando] = useState(true);

  const intervalo = useRef(null)
  const token = localStorage.getItem("token");
  const id = idElemento;

  const getData = async () => {
    const { sensores, variables, graficas } = await getElementoById(token, id);
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

    let [{ sensores: sensores_datos },
         { variables: variables_datos }] = await Promise.all([
      getPaquetesAPI(str_sensores,token,graficasDatos.corto),
      getElementosPaquetesApi(str_variables,token,graficasDatos.corto)
    ]);
    console.log(variables_datos);    

    variables_datos = variables_datos.reverse();
    sensores_datos = sensores_datos.reverse();
    
    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < variables_datos.length; i++) {
        let arr_variables = [];
        let arr_sensores = [];
        grafica.direcciones.forEach((direccion) => {
          if (direccion[0] === "V") {
            const variable_index = variables.find(
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
            const direccion_elemento = parseInt(direccion.substring(1));
            const direccion_sensor = sensores[direccion_elemento].direccion;
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
                ...sensores_datos[i][direccion_elemento],
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
    setGraficasElementosInfo(arr_graficas);
  };
  const getIntervalo = ()=>{
    return setInterval(async () => {
      const { sensores, variables, graficas } = await getElementoById(token, id);
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
      let [ { sensores: sensores_datos },
            { variables: variables_datos }] = await Promise.all([
        getPaquetesAPI(str_sensores,token,1),
        getElementosPaquetesApi(str_variables,token,1)
      ]);  
      
      let arr_graficas = [];
      graficas.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < variables_datos.length; i++) {
          let arr_variables = [];
          let arr_sensores = [];
          grafica.direcciones.forEach((direccion) => {
            if (direccion[0] === "V") {
              const variable_index = variables.find(
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
            }
            else {
              const direccion_elemento = parseInt(direccion.substring(1));
              const direccion_sensor = sensores[direccion_elemento].direccion;
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
                  ...sensores_datos[i][direccion_elemento],
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
      setGraficasElementosInfo(arr_graficas);
    }, 30000);
  }

  useEffect(()=>{
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
  }, [idElemento]);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <div>
      <CRow>
        {graficasElementosInfo.map((grafica, idx) => {
          return (
            <CCol sm="12" md="6" key={idx}>
              <CCard className="shadow" >
                <CCardHeader className="contenedor-cabecera">
                  <h6 className="m-2">{grafica.nombre}</h6>
                </CCardHeader>
                <CCardBody>
                  <ElementosBasica sensores={grafica.datos} />
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
      </CRow>
    </div>
  );
};

export default ElementosBasicas;
