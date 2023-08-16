import React from "react";
import { CCol, CRow } from "@coreui/react";
import ProyectosInformacionSensor from "./ProyectosInformacionSensor";

const ProyectosInformacionSensores = ({ sensores }) => {
  return (
    <>
      {sensores.map((sensor, idx) => {
        if(idx === sensores.length -1){
          return sensor.datos.map((info, idx) => {
            return <ProyectosInformacionSensor key={idx} sensor={info} />;
          })
        }
      })}
    </>
  );
};

export default ProyectosInformacionSensores;
