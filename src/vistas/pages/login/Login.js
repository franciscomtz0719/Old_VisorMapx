import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import LogoBlanco from "../../../assets/img/VisorBlanco.png";

import {
  AlertaToastSucces,
  AlertaToastDenied,
  AlertaCamposVacios,
  AlertaToastCredentialsIncorrect,
} from "../../../reusable/SweatAlerts";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import "./Login.css";

import CIcon from "@coreui/icons-react";
import { getSesion, getTokenUsuario } from "src/helpers/peticionesAPI";
import NavBar from "./NavBar";
import Footer from "../land-page/Footer";


const Login = () => {
  const [user, setUser] = useState({
    usuario: "",
    pass: "",
    operacion: "gettoken",
  });
  const {usuario, pass } = user;
  const [acceso, setAcceso] = useState(false);

  const handleForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      usuario == "" ||
      usuario == undefined ||
      pass == "" ||
      pass == undefined
    ) {
      AlertaCamposVacios();
    } else {
      //peticion del helper para usuario registrado en el backend
      const { status: status_token, respuesta: respuesta_token } =
        await getTokenUsuario(usuario, pass);

      if (!status_token) {
        AlertaToastCredentialsIncorrect();
        setAcceso(status_token);
        return;
      }

      const { status: status_sesiones, respuesta: respuesta_sesion } =
        await getSesion(respuesta_token);
      if (respuesta_sesion) {
        AlertaToastSucces();
        localStorage.setItem("token", respuesta_token);
      } else {
        AlertaToastDenied();
      }
      setAcceso(respuesta_sesion);
    }
  };
  if (acceso) {
    localStorage.setItem("isAutehenticated", acceso);
    return <Redirect to="/" />;
  }
  return (
    <>
      <section className="c-app login flex-row align-items-center">
        <NavBar />
        <CContainer className="contenedor mt-5">
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup className="shadow">
                <CCard className="contenedor-presentacion m-0">
                  <CCardBody className="text-center text-white descripción">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                      <img src={LogoBlanco} className="logoGradient" />
                      <h5 className="mt-3">
                        Sistema modular basado en tecnologías de microservicios
                        alojados en en la Nube orientado en la adquisión,
                        almacenamiento, análisis y entrega de resultados de datos
                        IIoT para la Industria 4.0
                      </h5>
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="p-1 p-md-4 m-0">
                  <CCardBody>
                    <CForm onSubmit={handleLogin}>
                      <h3 className="my-3">Iniciar sesión</h3>
                      <p className="text-muted">Inicia con tu cuenta</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Nombre de usuario"
                          autoComplete="username"
                          name="usuario"
                          onChange={handleForm}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Contraseña"
                          autoComplete="current-password"
                          name="pass"
                          onChange={handleForm}
                        />
                      </CInputGroup>
                      <CRow className="w-100 mx-auto mx-lg-0">
                        <CCol xs="12" lg="10">
                          <CButton className="px-5 py-3 btn-login w-100 mx-auto" type="submit">
                            Iniciar sesión
                          </CButton>
                        </CCol>                      
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>              
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>      
      </section>
      <Footer />
    </>
  );
};

export default Login;
