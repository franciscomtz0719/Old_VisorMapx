import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CSelect,
  CRow,
  CCol,
} from "@coreui/react";
import ProyectosBasica from "./ProyectosBasica";
import ProyectosLandmark from "./ProyectosLandmark";
import ProyectosPeligrosidad from "./ProyectosPeligrosidad";

const ProyectosGraficas = ({ graficaActiva, idx }) => {
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
              {graficaActiva.datos.tipo === "sensores" ? (
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
              ) : null}
            </CCol>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <div className={custom === "Basica" ? "" : "ocultar"}>
          {/* {graficaActiva.datos.valores} */}
          <ProyectosBasica sensores={graficaActiva.datos.valores} />
        </div>
        {graficaActiva.datos.tipo === "sensores" ? (
          <>
            <div className={custom === "Nivel" ? "" : "ocultar"}>
              <ProyectosLandmark sensores={graficaActiva.datos.valores} />
            </div>
            <div className={custom === "Tendencia" ? "" : "ocultar"}>
              <ProyectosPeligrosidad sensores={graficaActiva.datos.valores} />
            </div>
          </>
        ) : null}
      </CCardBody>
    </CCard>
  );
};

export default ProyectosGraficas;
