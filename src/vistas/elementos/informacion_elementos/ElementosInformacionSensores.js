import { CRow } from "@coreui/react";
import React from "react";
import ElementosInformacionSensor from "./ElementosInformacionSensor";

const ElementosInformacionSensores = ({sensores}) => {
  return (
    <div>
      <CRow>
        {
          sensores.valores.map((sensor, idx)=>{
            return(
              <ElementosInformacionSensor
                key = {"graficas_sensor"+idx} 
                sensor = {sensor}
              />
            )
          })
        }
      </CRow>
    </div>
  );
};

export default ElementosInformacionSensores;
