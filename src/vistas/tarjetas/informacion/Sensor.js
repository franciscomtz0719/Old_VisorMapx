import React from "react";
import { CCard, CCardBody, CCol, CRow, CCardHeader } from "@coreui/react";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";
import "./Informacion.css";

const Sensor = ({ sensor }) => {
  return (
    <CCol sm="4">
      <CCard className="shadow">
        <CCardHeader className="contenedor-cabecera">
          <h5>{sensor.nombre}</h5>
        </CCardHeader>
        {sensor.valor === null ? (
          <CCardBody>
            Información no disponible
          </CCardBody>
        ) : (
          <CCardBody>
            <CRow className="align-items-center justify-content-center">
              <CCol sm="8">
                <p>
                  <b>
                    {sensor.valor.toFixed(4)} {sensor.unidades}
                  </b>
                </p>
                <p>NORMALIZACIÓN : {(sensor.landmark.nivel[0])?sensor.landmark.nivel[1].toFixed(4):"-"}</p>
                <p>
                  TENDENCIA : {sensor.peligrosidad.peligrosidad[0].toFixed(4)}
                </p>
                <p>{sensor.estado.toUpperCase()} </p>
              </CCol>
              <CCol md="4">
                {sensor.estado === "activo" &&
                sensor.landmark.nivel[1] <= 1 &&
                sensor.landmark.nivel[1] >= 0 ? (
                  <div className="contenedor-icono">
                    <img src={iconoactivo} className="icono" />
                  </div>
                ) : (
                  <div className="contenedor-icono">
                    <img src={iconoinactivo} className="icono" />
                  </div>
                )}
              </CCol>
            </CRow>
          </CCardBody>
        )}
      </CCard>
    </CCol>
  );
};

export default Sensor;
