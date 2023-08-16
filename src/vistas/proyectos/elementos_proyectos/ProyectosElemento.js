import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardHeader,
  CButton,
} from "@coreui/react";

import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";

import "./ProyectosElementos.css";

const ProyectosElemento = ({ elemento, history, idProyecto }) => {
  const icono = elemento.estado == "activo" ? iconoactivo : iconoinactivo;
  const estado =
    elemento.estado[0].toUpperCase() + elemento.estado.substring(1);
  const id = elemento._id;

  const click = (direccion) => {
    // history.push(`/elementos/${id}/${direccion}`);
    history.push(`/proyectos/${idProyecto}/elementos/${id}/${direccion}`);
  };
  return (
    <CCol sm="12" md="6" lg="4" key={elemento._id}>
      <CCard className="shadow overflow-hidden">
        <CCardHeader className="contenedor-cabecera">
          <CRow className="justify-content-between align-items-center">
            <CCol sm="12">{<h5>{elemento.nombre}</h5>}</CCol>
          </CRow>
        </CCardHeader>
        <CCardBody className="p-4">
          <div className="contenedor-elementos">
            <div className="d-flex justify-content-center align-items-center mb-4 w-75">
              <img src={icono} className="icono" />
              <span>{estado}</span>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column my-4 w-100">
              <h5 className="m-0">{`${elemento.descripcion}`}</h5>
              <h5 className="m-0">{`${elemento.tipo}`}</h5>
            </div>
            <CRow className="justify-content-center align-items-center my-4 mx-0 w-100">
              <CCol sm="6" className="my-1">
                <CButton
                  className="boton-elemento"
                  onClick={() => click("informacion")}
                >
                  Información
                </CButton>
              </CCol>
              {elemento.configuracion ? (
                <CCol sm="6" className="my-1">
                  <CButton
                    className="boton-elemento"
                    onClick={() => click("configuracion")}
                  >
                    Configuración
                  </CButton>
                </CCol>
              ) : undefined}
              {elemento.graficas ? (
                <CCol sm="6" className="my-1">
                  <CButton
                    className="boton-elemento"
                    onClick={() => click("graficas")}
                  >
                    Graficas
                  </CButton>
                </CCol>
              ) : undefined}
              {elemento.estadisticas ? (
                <CCol sm="6" className="my-1">
                  <CButton
                    className="boton-elemento"
                    onClick={() => click("estadistica")}
                  >
                    Estadisticas
                  </CButton>
                </CCol>
              ) : undefined}
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default ProyectosElemento;
