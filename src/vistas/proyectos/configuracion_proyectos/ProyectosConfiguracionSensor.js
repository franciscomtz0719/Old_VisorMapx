import React from "react";
import { CCard, CCardBody, CCardHeader, CCol } from "@coreui/react";
import iconoactivo from '../../../assets/icons/activo.svg';
import iconoinactivo from '../../../assets/icons/inactivo.svg';
import "./ProyectosConfiguracion.css";

const ProyectosConfiguracionSensor = ({ tarjeta,sensor }) => {

  const icono  =  (sensor.estado=="activo")?iconoactivo:iconoinactivo;
  const estado = sensor.estado[0].toUpperCase() + sensor.estado.substring(1);

  return (
    <CCol sm="4">
      <CCard className="shadow">
        <CCardHeader className="contenedor-cabecera">
          <h5>{sensor.nombre}</h5>
        </CCardHeader>{" "}
        {sensor.clase === "S" ? (
          <CCardBody>
            <div className="mb-4 d-flex align-items-center">
              <img src = {icono} className="icono"/>
              <h5 className="ml-2">{estado}</h5>
            </div>   
            <pre>
              <li>{`Dirección : ${tarjeta}.S${sensor.index}`}</li>
              <li>{`Alias     : ${sensor.alias}`}</li>
              <li>{`Unidades  : ${sensor.unidades}`}</li>
              <li>{`Rango     : [${sensor.parametros.rango[0].toFixed(4)}, ${sensor.parametros.rango[1].toFixed(4)}] ${sensor.unidades}`}</li>
            </pre>
            <h6>Nivel</h6>
            <hr />
            <pre>
              <li>{`Resolución (i)    : ${sensor.parametros.resolucion[0].toFixed(4) / 2} min`}</li>
              <li>{`Resolución (f(i)) : ${sensor.parametros.resolucion[1].toFixed(4)}`}</li>
            </pre>
            <h6>Tendencia</h6>
            <hr />
            <pre>
              <li>{`Función : Lineal`}</li>
              <li>{`Filtro  : ${sensor.parametros.peligrosidad}`}</li>
            </pre>
          </CCardBody>
        ) : (
          <CCardBody>            
            <div className="mb-4 d-flex align-items-center">
              <img src = {icono} className="icono"/>
              <h5 className="ml-2">{estado}</h5>
            </div>  
            <pre>
              <li>{`Dirección : ${sensor.proyecto}.${sensor.clase}${sensor.index}`}</li>
              <li>{`Alias     : ${sensor.alias}`}</li>
              <li>{`Unidades  : ${sensor.unidades}`}</li>
              <li>{`Tipo      : ${sensor.tipo}`}</li>
            </pre>
            <h6>Direcciones</h6>
            <hr />
            <pre>
              {sensor.direcciones.map((direccion, idx) => {
                return (
                  <li key={idx}>
                    [{idx}] {direccion}
                  </li>
                );
              })}
            </pre>
          </CCardBody>
        )}
      </CCard>
    </CCol>
  );
};

export default ProyectosConfiguracionSensor;
