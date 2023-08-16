import React, { useEffect, useState } from "react";
import Basica from "./Basica";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from "@coreui/react";
import { getPaquetesAPI, getRecursosAPI } from "src/helpers/peticionesAPI";
import "./Graficas.css";
import store from "src/store";

const Basicas = ({nombreTarjeta}) => {
  const [graficasActivas, setGraficasActivas] = useState([]);
  const {graficasDatos} = store.getState();  

  const token = localStorage.getItem("token");
  const nombre = nombreTarjeta;

  const getData = async () => {
    const { graficas, sensores } = await getRecursosAPI(nombre, token);
    let str_sensores = [];
    sensores.forEach((sensor) => {
      str_sensores.push(`${nombre}.S${sensor.index}`);
    });

    let datos = await getPaquetesAPI(str_sensores, token, graficasDatos.corto);

    datos.sensores = datos.sensores.reverse();
    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < datos.sensores.length; i++) {
        let arr = [];
        grafica.sensores.forEach((sensor) => {
          if (sensores[sensor].estado == "activo") {
            arr.push({
              nombre: sensores[sensor].nombre,
              alias: sensores[sensor].alias,
              ...datos.sensores[i][sensor],
            });
          }
        });
        if (arr.length > 0) {
          arr_grafica.push(arr);
        }
      }
      if (arr_grafica.length > 0)
        arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
    });
    setGraficasActivas(arr_graficas);
  };

  const getIntervalo = async () => {
    return setInterval(async () => {
      const { graficas, sensores } = await getRecursosAPI(nombre, token);
      let str_sensores = [];
      sensores.forEach((sensor) => {
        str_sensores.push(`${nombre}.S${sensor.index}`);
      });
      const datos = await getPaquetesAPI(str_sensores, token, 1);
      let arr_graficas = [];
      graficas.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < datos.sensores.length; i++) {
          let arr = [];
          grafica.sensores.forEach((sensor) => {
            if (sensores[sensor].estado == "activo") {
              arr.push({
                nombre: sensores[sensor].nombre,
                alias: sensores[sensor].alias,
                ...datos.sensores[i][sensor],
              });
            }
          });
          if (arr.length > 0) arr_grafica.push(arr);
        }
        if (arr_grafica.length > 0)
          arr_graficas.push({ nombre: grafica.nombre, sensores: arr_grafica });
      });
      setGraficasActivas(arr_graficas);
    }, 30000);
  };

  useEffect(async () => {
    await getData();
    const intervalo = getIntervalo();
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <CRow>
        {graficasActivas.map((graficaActiva, idx) => {
          return (
            <CCol sm="12" md="6" key={idx}>
              <CCard className="shadow" >
                <CCardHeader className="contenedor-cabecera">
                  <h6 className="m-2">{graficaActiva.nombre}</h6>
                </CCardHeader>
                <CCardBody>
                  <Basica sensores={graficaActiva.sensores} />
                </CCardBody>
              </CCard>
            </CCol>
          )
        })}
      </CRow>
    </div>
  );
};

export default Basicas;
