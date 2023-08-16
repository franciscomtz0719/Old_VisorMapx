import React from "react";
import { CRow } from "@coreui/react";
import ProyectosConfiguracionSensor from "./ProyectosConfiguracionSensor";

const ProyectosConfiguracionSensores = ({ tarjeta,sensores }) => {
  return (
    <div>
      <CRow>
        {sensores.valores.map((sensor, idx) => {
          return <ProyectosConfiguracionSensor tarjeta={tarjeta} sensor={sensor} key={idx} />;
        })}
      </CRow>
    </div>
  );
};

export default ProyectosConfiguracionSensores;
