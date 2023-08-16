import React, { useEffect, useState } from "react";
import { CCol, CRow } from "@coreui/react";
import {
  getLandmarksAPI,
  getPaquetesAPI,
  getPeligrosidadAPI,
  getRecursosAPI,
} from "src/helpers/peticionesAPI";
import Loader from "src/reusable/Loader";
import Graficas from "./Graficas";
import "./Graficas.css";
import store from "src/store";

const Custom = ({ nombreTarjeta }) => {
  const [graficasActivas, setGraficasActivas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const {graficasDatos} = store.getState();

  const token = localStorage.getItem("token");
  const nombre = nombreTarjeta;

  const getData = async () => {
    const { graficas, sensores } = await getRecursosAPI(nombre, token);

    let str_sensores = [];
    sensores.forEach((sensor) => {
      str_sensores.push(`${nombre}.S${sensor.index}`);
    });

    let [valor,land,peligro] = await Promise.all([
                                      getPaquetesAPI(str_sensores, token, graficasDatos.corto),
                                      getLandmarksAPI(str_sensores, token, graficasDatos.corto),
                                      getPeligrosidadAPI(str_sensores, token, graficasDatos.corto)
                                    ]);

    valor.sensores = valor.sensores.reverse();
    land.sensores = land.sensores.reverse();
    peligro.sensores = peligro.sensores.reverse();

    let arr_graficas = [];
    graficas.forEach((grafica) => {
      let arr_grafica = [];
      for (let i = 0; i < valor.sensores.length; i++) {
        let arr = [];
        grafica.sensores.forEach((sensor) => {
          if (sensores[sensor].estado === "activo") {
            arr.push({
              nombre: sensores[sensor].nombre,
              alias: sensores[sensor].alias,
              ...valor.sensores[i][sensor],
              ...land.sensores[i][sensor],
              ...peligro.sensores[i][sensor],
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
      
      const [valor,land,peligro] = await Promise.all([
        getPaquetesAPI(str_sensores, token, 1),
        getLandmarksAPI(str_sensores, token, 1),
        getPeligrosidadAPI(str_sensores, token, 1)
      ]);

      let arr_graficas = [];
      graficas.forEach((grafica) => {
        let arr_grafica = [];
        for (let i = 0; i < valor.sensores.length; i++) {
          let arr = [];
          grafica.sensores.forEach((sensor) => {
            if (sensores[sensor].estado === "activo") {
              arr.push({
                nombre: sensores[sensor].nombre,
                alias: sensores[sensor].alias,
                ...valor.sensores[i][sensor],
                ...land.sensores[i][sensor],
                ...peligro.sensores[i][sensor],
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
    <div>
      <CRow class="row w-100">
        {graficasActivas.map((graficaActiva, idx) => {
          return  <CCol sm="12" md="6"  key={idx}>
                    <Graficas graficaActiva={graficaActiva} idx={idx} key={idx} />
                  </CCol>
        })}
      </CRow>
    </div>
  );
};

export default Custom;
