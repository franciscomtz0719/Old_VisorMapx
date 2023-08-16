import React from "react";
import { CRow } from "@coreui/react";
import ElementosConfiguracionesSensor from "./ElementosConfiguracionesSensor";

const ElementosConfiguracionesSensores = ({ tarjeta,sensores }) => {
  return (
    <div>
      <CRow>
        {sensores.valores.map((sensor, idx) => {
          return <ElementosConfiguracionesSensor tarjeta={tarjeta} sensor={sensor} key={idx} />;
        })}
      </CRow>
    </div>
  );
};

export default ElementosConfiguracionesSensores;
