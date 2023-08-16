import React, { useContext } from "react";
import {useHistory} from 'react-router-dom'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ServicesContext } from "./UserContext";

const TheHeaderDropdownNotif = () => {
  const { alertas } = useContext(ServicesContext);
  const history = useHistory();

  const click = (e) => {
    e.preventDefault();
    history.push(`/alertas`);
  }

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {alertas.length}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {alertas.length > 0 ? (
          alertas.map((alerta,i) => {
            return (
              <CDropdownItem className="alerta" onClick={click} key={"alertas"+i}>
                <CIcon name="cil-warning" className="mfe-2" />  
                <div className="ml-2">
                  <p className="m-0">Nombre : {alerta.nombre}</p>
                  <p className="m-0">Alertas: {alerta.cantidad}</p>
                  <p className="m-0">Fechas : {"[ "+alerta.fechainicio+", "+alerta.fechatermino+" ]"}</p>
                </div>                              
              </CDropdownItem>
            );
          })
        ) : (
          <CDropdownItem>Sin notificaciones</CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
