import { CRow } from "@coreui/react";
import React from "react";
import Sensor from "./Sensor";

const InformacionSensor = ({ sensores }) => {
  return (
    <div>
      <CRow>
        {sensores.map((sensor, idx) => {
          return (
            <Sensor sensor={sensor} key={idx}/>
          );
        })}
      </CRow>
    </div>
  );
};

export default InformacionSensor;
