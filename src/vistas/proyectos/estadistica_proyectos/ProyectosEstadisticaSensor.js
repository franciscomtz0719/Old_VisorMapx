import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import "./Estadisticas.css";

const ProyectosEstadisticaSensor = ({ sensor }) => {

  const estado = sensor.estado[0].toUpperCase() + sensor.estado.substring(1);
  const activo = sensor.estado == "activo";
  const icono = activo ? iconoactivo : iconoinactivo;
  const tendencia = (sensor.peligrosidad.tendencia[0] + sensor.peligrosidad.tendencia[1]);
  
  return (
    <CCol sm="12">
      <CCard>
        <CCardHeader className="contenedor-cabecera">
          <h5>{sensor.nombre}</h5>
        </CCardHeader>
        {(sensor.basica === null || !activo ) ? (
          <CCardBody className="shadow">
            <div className="container-fluid d-flex align-items-center my-4">
              <img src={icono} className="icono" />
              <h4 className="ml-2">{estado}</h4>
            </div>
            <CRow>
              <CCol sm="4">
                <CCard>
                  <CCardHeader className="contenedor-cabecera">
                    <h5 className="m-0">Básica</h5>
                  </CCardHeader>
                  <CCardBody>Información no disponible</CCardBody>
                </CCard>
              </CCol>
              <CCol sm="4">
                <CCard>
                  <CCardHeader className="contenedor-cabecera">
                    <h5 className="m-0">Niveles</h5>
                  </CCardHeader>
                  <CCardBody>Información no disponible</CCardBody>
                </CCard>
              </CCol>
              <CCol sm="4">
                <CCard>
                  <CCardHeader className="contenedor-cabecera">
                    <h5 className="m-0">Tendencia</h5>
                  </CCardHeader>
                  <CCardBody>Información no disponible</CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        ) : (
        <CCardBody>
          <div className="container-fluid d-flex align-items-center my-4">
            <img src={icono} className="icono"/>
            <h4 className="ml-2">{estado}</h4>
          </div>
          <CRow>
            <CCol sm="4">
              <CCard>
                <CCardHeader className="contenedor-cabecera">
                  <h5 className="m-0">Basica</h5>
                </CCardHeader>
                <CCardBody>
                  <h6 className="my-2">Valor</h6>
                  <hr />
                  <pre>
                    <li>{`Actual   : ${sensor.basica.actual.toFixed(4)} ${sensor.unidades}`}</li>
                    <li>{`Minimo   : ${sensor.basica.min.toFixed(4)} ${sensor.unidades}`}</li>
                    <li>{`Promedio : ${sensor.basica.promedio.toFixed(4)} ${sensor.unidades}`}</li>
                    <li>{`Maximo   : ${sensor.basica.max.toFixed(4)} ${sensor.unidades}`}</li>
                  </pre>
                  <h6 className="my-2">Nivel</h6>
                  <hr />
                  <pre>
                    <li>{`Nivel Actual   : ${sensor.basica.nivelactual.toFixed(4)}`}</li>
                    <li>{`Nivel Minimo   : ${sensor.basica.nivelmin.toFixed(4)}`}</li>
                    <li>{`Nivel Promedio : ${sensor.basica.nivelpromedio.toFixed(4)}`}</li>
                    <li>{`Nivel Máximo   : ${sensor.basica.nivelmax.toFixed(4)}`}</li>
                  </pre>
                  <h6 className="my-2">General</h6>
                  <hr />
                  <pre>
                    <li>{`Paquetes   : ${sensor.basica.paquetes}`}</li>
                    <li>{`Eficiencia : ${(sensor.basica.eficiencia*100).toFixed(4)} %`}</li>
                  </pre>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard>
                <CCardHeader className="contenedor-cabecera">
                  <h5 className="m-0">Niveles</h5>
                </CCardHeader>
                <CCardBody>
                  <h6 className="my-2">Valor</h6>
                  <hr />
                  <pre>
                    <li>{`Actual   : ${sensor.landmarks.actual.toFixed(4)}`}</li>
                    <li>{`Minimo   : ${sensor.landmarks.min.toFixed(4)}`}</li>
                    <li>{`Promedio : ${sensor.landmarks.promedio.toFixed(4)}`}</li>
                    <li>{`Máximo   : ${sensor.landmarks.max.toFixed(4)}`}</li>
                  </pre>
                  <h6 className="my-2">Cambio [ t ]</h6>
                  <hr />
                  <pre>
                    <li>{`Actual   : ${sensor.landmarks.deltai.toFixed(4)/2} min`}</li>
                    <li>{`Minimo   : ${sensor.landmarks.deltaimin.toFixed(4)/2} min`}</li>
                    <li>{`Promedio : ${sensor.landmarks.deltaipromedio.toFixed(4)/2} min`}</li>
                    <li>{`Máximo   : ${sensor.landmarks.deltaimax.toFixed(4)/2} min`}</li>
                  </pre>
                  <h6 className="my-2">Cambio [ f(t) ]</h6>
                  <hr />
                  <pre>
                    <li>{`Actual     : ${sensor.landmarks.deltay.toFixed(4)}`}</li>
                    <li>{`Minimo     : ${sensor.landmarks.deltaymin.toFixed(4)}`}</li>
                    <li>{`Promedio   : ${sensor.landmarks.deltaypromedio.toFixed(4)}`}</li>
                    <li>{`Máximo     : ${sensor.landmarks.deltaymax.toFixed(4)}`}</li>

                    <hr />

                    <li>{`Paquetes   : ${sensor.landmarks.paquetes}`}</li>
                    <li>{`Marca      : ${(sensor.landmarks.landmark)?"🔵":"⚪"}`}</li>
                  </pre>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard>
                <CCardHeader className="contenedor-cabecera">
                  <h5 className="m-0">Tendencia</h5>
                </CCardHeader>
                <CCardBody>
                  <h6 className="my-2">Valor</h6>
                  <hr />
                  <pre>
                    <li>{`Actual   : ${sensor.peligrosidad.actual.toFixed(4)}`}</li>
                    <li>{`Minimo   : ${sensor.peligrosidad.min.toFixed(4)}`}</li>
                    <li>{`Promedio : ${sensor.peligrosidad.promedio.toFixed(4)}`}</li>
                    <li>{`Máximo   : ${sensor.peligrosidad.max.toFixed(4)}`}</li>
                  </pre>
                  <h6 className="my-2">Tendencia</h6>
                  <hr />
                  <pre>
                    <li>{`Baja  : ${(tendencia!=0)?(sensor.peligrosidad.tendencia[0]*100/tendencia).toFixed(4):0} %`}</li>
                    <li>{`Alta  : ${(tendencia!=0)?(sensor.peligrosidad.tendencia[1]*100/tendencia).toFixed(4):0} %`}</li>

                    <hr />

                    <li>{`Paquetes   : ${sensor.peligrosidad.paquetes}`}</li>
                    <li>{`Marca      : ${(sensor.landmarks.landmark)?"🔵":"⚪"}`}</li>
                  </pre>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
        )
      }
      </CCard>
    </CCol>
  );
};

export default ProyectosEstadisticaSensor;
