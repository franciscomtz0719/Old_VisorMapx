import React, { useEffect, useRef, useState } from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import {
  getElementoById,
  getPeligrosidadAPI,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";
import ElementosPeligrosidad from "./ElementosPeligrosidad";
import "./ElementosGraficas.css";
import Loader from "src/reusable/Loader";
import store from "src/store";

const ElementosPeligrosidades = ({idElemento}) => {
  
  const {graficasDatos} = store.getState();
  const [graficasElementosInfo, setGraficasElementosInfo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const intervalo = useRef(null)

  const token = localStorage.getItem("token");
  const id = idElemento;

  const getData = async () => {
    const { sensores, graficas } = await getElementoById(token, id);
    let tarjeta = "";
    if(sensores.length > 0)
      tarjeta = sensores[0].direccion.substr(0,5); 
    const { sensores: lista_sensores } = await getRecursosAPI(tarjeta, token);
      

    let str_sensores = [];
    sensores.forEach((sensor) => {
      str_sensores.push(`${sensor.direccion}`);
    });

    let { sensores: sensores_datos } = await getPeligrosidadAPI(
      str_sensores,
      token,
      graficasDatos.corto
    );
    sensores_datos = sensores_datos.reverse();

    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < sensores_datos.length; i++) {
        let arr_sensores = [];
        grafica.direcciones.forEach((direccion) => {
          if (direccion[0] === "S") {
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
  const getIntervalo = () => {
    return setInterval(async () => {
      const { sensores, graficas } = await getElementoById(token, id);
      let tarjeta = "";
      if(sensores.length > 0)
        tarjeta = sensores[0].direccion.substr(0,5); 
      const { sensores: lista_sensores } = await getRecursosAPI(tarjeta, token);

      let str_sensores = [];
      sensores.forEach((sensor) => {
        str_sensores.push(`${sensor.direccion}`);
      });
      let { sensores: sensores_datos } = await getPeligrosidadAPI(
        str_sensores,
        token,
        1
      );
      sensores_datos = sensores_datos.reverse();

      let arr_graficas = [];
      graficas.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < sensores_datos.length; i++) {
          let arr_sensores = [];
          grafica.direcciones.forEach((direccion) => {
            if (direccion[0] === "S") {
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
                arr_sensores.push({
                  nombre: sensor_info.nombre,
                  alias: sensor_info.alias,
                  tipo: "S",
                  ...sensores_datos[i][direccion_elemento],
                });
              }
            }
          });
          if (arr_sensores.length > 0) 
            arr_grafica.push(arr_sensores);          
        }
        if (arr_grafica.length > 0) 
          arr_graficas.push({ nombre: grafica.nombre, datos: arr_grafica });
        
      });
      setGraficasElementosInfo(arr_graficas);
    }, 30000);
  };

  useEffect(()=>{
    return ()=>{
      if(intervalo.current!=null)
        clearInterval(intervalo.current)
    };
  },[]);
  useEffect(async () => {
    setCargando(true);
    if(intervalo.current!=null){
      clearInterval(intervalo.current)
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
    <CRow>
      {graficasElementosInfo.map((grafica, idx) => {
        return (
          <CCol sm="12" md="6" key={idx}>
            <CCard className="shadow">
              <CCardHeader className="contenedor-cabecera">
                <h6 className="m-2">{grafica.nombre}</h6>
              </CCardHeader>
              <CCardBody>
                <ElementosPeligrosidad sensores={grafica.datos} />
              </CCardBody>
            </CCard>
          </CCol>
        );
      })}
    </CRow>
  );
};

export default ElementosPeligrosidades;
