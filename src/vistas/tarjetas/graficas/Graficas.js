import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CSelect,
  CRow,
  CCol,
} from "@coreui/react";
import Basica from "./Basica";
import Landmark from "./Landmark";
import Peligrosidad from "./Peligrosidad";
import "./Graficas.css";


const Graficas = ({ graficaActiva, idx }) => {
  const [custom, setCustom] = useState("Basica");

  const handleChange = (e) => {
    setCustom(e.target.value);
  };

  return (
    <CCard className="shadow" key={idx}>
      <CCardHeader className="contenedor-cabecera">
        <CRow className="justify-content-between align-items-center">
          <CCol sm="6" className="my-2">
            <h5 className="m-0">{graficaActiva.nombre}</h5>
          </CCol>
          <CCol sm="6" className="my-2">
            <CCol xs="12">
              <CSelect
                custom
                name="select"
                id="select"
                value={custom}
                onChange={handleChange}
              >
                <option value="Basica">Basica</option>
                <option value="Nivel">Nivel</option>
                <option value="Tendencia">Tendencia</option>
              </CSelect>
            </CCol>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <div className={custom === "Basica" ? "" : "ocultar"}>
          <Basica sensores={graficaActiva.sensores} />
        </div>
        <div className={custom === "Nivel" ? "" : "ocultar"}>
          <Landmark sensores={graficaActiva.sensores} />
        </div>
        <div className={custom === "Tendencia" ? "" : "ocultar"}>
          <Peligrosidad sensores={graficaActiva.sensores} />
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Graficas;
