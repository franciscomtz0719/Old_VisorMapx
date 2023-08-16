import { CRow } from "@coreui/react";
import React from "react";
import ElementosEstadisticaSensor from "./ElementosEstadisticaSensor";

const ElementosEstadisticaSensores = ({ sensores }) => {
  return (
    <CRow>
      {sensores.valores.map((sensor, idx) => {
        return <ElementosEstadisticaSensor sensor={sensor} key={idx} />;
      })}
    </CRow>
  );
};

export default ElementosEstadisticaSensores;
