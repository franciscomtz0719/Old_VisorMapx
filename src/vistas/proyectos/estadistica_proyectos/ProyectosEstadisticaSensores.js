import React from "react";
import { CRow } from "@coreui/react";
import ProyectosEstadisticaSensor from "./ProyectosEstadisticaSensor";

const ProyectosEstadisticaSensores = ({ sensores }) => {
  return (
    <CRow>
      {sensores.valores.map((sensor, idx) => {
        return <ProyectosEstadisticaSensor sensor={sensor} key={idx} />;
      })}
    </CRow>
  );
};

export default ProyectosEstadisticaSensores;
