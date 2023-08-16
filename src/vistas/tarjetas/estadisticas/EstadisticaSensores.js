import { CRow } from "@coreui/react";
import React from "react";
import EstadisticasSensor from "./EstadisticasSensor";

const EstadisticaSensores = ({ sensores }) => {
  return (
    <CRow>
      {sensores.map((sensor, idx) => {
        return <EstadisticasSensor sensor={sensor} key={idx} />;
      })}
    </CRow>
  );
};

export default EstadisticaSensores;
