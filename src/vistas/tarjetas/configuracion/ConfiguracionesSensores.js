import React from "react";
import { CRow } from "@coreui/react";
import ConfiguracionesSensor from "./ConfiguracionesSensor";

const ConfiguracionesSensores = ({tarjeta,sensores }) => {
  return (
    <div>
      <CRow>
        {sensores.map((sensor, idx) => {
          return <ConfiguracionesSensor tarjeta={tarjeta} sensor={sensor} key={idx} />;
        })}
      </CRow>
    </div>
  );
};

export default ConfiguracionesSensores;
