import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import "./ProyectosInformacion.css";

const ProyectosInformacionSensor = ({ sensor }) => {
  return (
    <CCol>
      <CCard className="shadow">
        <CCardHeader className="contenedor-cabecera">
          <h5 className="m-0">{sensor.nombre}</h5>
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center justify-content-center">
            <CCol sm="8">
              <p><b>{sensor.valor.toFixed(2)} {sensor.unidades}</b></p>
              {sensor.tipo == "S" ? (
                <p>NORMALIZACIÓN : {sensor.landmark.nivel[1].toFixed(4)}</p>
              ) : undefined}
              {sensor.tipo == "S" ? (
                <p>
                  TENDENCIA : {sensor.peligrosidad.peligrosidad[0].toFixed(4)}
                </p>
              ) : undefined}
              <p>{sensor.estado.toUpperCase()} </p>
            </CCol>
            <CCol md="4">
              {sensor.tipo == "S" ? (
                sensor.estado == "activo" &&
                sensor.landmark.nivel[1] <= 1 &&
                sensor.landmark.nivel[1] >= 0 ? (
                  <div className="contenedor-icono">
                    <img src={iconoactivo} className="icono"/>
                  </div>
                ) : (
                  <div className="contenedor-icono">
                    <img src={iconoinactivo} className="icono"/>
                  </div>
                )
              ) : sensor.estado == "activo" ? (
                  <div className="contenedor-icono">
                    <img src={iconoactivo} className="icono"/>
                  </div>
                ) : (
                  <div className="contenedor-icono">
                    <img src={iconoinactivo} className="icono"/>
                  </div>
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default ProyectosInformacionSensor;
