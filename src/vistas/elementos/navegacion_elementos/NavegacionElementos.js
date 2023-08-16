import React from "react";
import { CCard, CCol, CWidgetIcon, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const NavegacionElementos = () => {
  return (
    <>
      <CCard className="shadow">
        <CCol>
          <div className={"d-flex mt-2"}>
            <div className={"col-3"}>
              <CWidgetIcon color="primary">
                <CIcon name={"cilInfo"} size={"xl"} />
                {/* <CButton
                  className="boton-elemento"
                  onClick={() => click(item.id, "informacion")}
                >
                  Información
                </CButton> */}
              </CWidgetIcon>
            </div>
            <div className={"col-3"}>
              <CWidgetIcon header="Configuración" color="primary">
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </div>
            <div className={"col-3"}>
              <CWidgetIcon header="Gráficas" color="primary">
                <CIcon name={"cilGraph"} size={"xl"} />
              </CWidgetIcon>
            </div>
            <div className={"col-3"}>
              <CWidgetIcon header="Estádistica" color="primary">
                <CIcon name={"cilFunctions"} size={"xl"} />
              </CWidgetIcon>
            </div>
          </div>
        </CCol>
      </CCard>
    </>
  );
};

export default NavegacionElementos;
