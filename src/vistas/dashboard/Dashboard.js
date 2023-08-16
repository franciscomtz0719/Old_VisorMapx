import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
} from "@coreui/react"; 
import { getDataUsuario, getEmpresa } from "src/helpers/peticionesAPI";

import Loader from "src/reusable/Loader";
import activo from "../../assets/icons/activo.svg"
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    avatar:"",
    empresa: "",
    planta: "",
    usuario: "",
    puesto: "",
    correo: "",
    celular: "",
  });
  const [cargando, setCargando] = useState(true);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    try {
      const respuestaUsuario = await getDataUsuario(token);
      const respuestaEmpresa = await getEmpresa(undefined, token);

      const {        
        nombre: usuario,
        puesto,
        correo,
        celular,
      } = respuestaUsuario.respuesta;
      const {
        _id : avatar, 
        nombre: empresa, 
        planta 
      } = respuestaEmpresa;

      setData({ empresa, planta, usuario, puesto, correo, celular, avatar});
      setCargando(false);
    } catch (error) {}
  }, []);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <>
      <CContainer fluid>
        <CCard className="shadow 100vh">
          <CRow>
            <CCol sm="12">
              <CCardHeader className="contenedor-cabecera">
                <h4 className="m-0">Dashboard</h4>
              </CCardHeader>
              <CCardBody className="cardbody">
                <CCol className="col-6">
                  <div className="estado col-2 d-flex align-items-center">
                    <img src={activo} className="h-100 w-auto"/>
                    <h4 className="ml-3">Activo</h4>
                  </div>                
                </CCol>

                <div className="infoempresa">
                  <h4 className="text-right">Empresa</h4>
                  <h3 className="text-right">{data.empresa}</h3>
                  <h4 className="text-right">{data.planta}</h4>
                </div>
                <hr />
                
                <div className="imagencontainer">
                    <img
                      className="logoEmpresa mt-2"
                      src={`media/avatars/${data.avatar}.png`}
                      alt="logo empresa"
                    />
                </div>
              </CCardBody>

              <CCardFooter className="contenedor-cabecera">
                <CRow>
                  <CCol sm="6">
                    <div className="infoempresaleft">
                      <h5>{"Usuario: " + data.usuario}</h5>
                    </div>
                  </CCol>
                  <CCol sm="6">
                    <div className="infoempresa">
                      <p className="m-0 text-right">{"Puesto: " + data.puesto}</p>
                      <p className="m-0 text-right">{"Correo: " + data.correo}</p>
                      <p className="m-0 text-right">{"Celular: " + ((data.celular.length<=0)?"NE":data.celular)}</p>
                    </div>
                  </CCol>
                </CRow>                
              </CCardFooter>
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
    </>
  );
};

export default Dashboard;
