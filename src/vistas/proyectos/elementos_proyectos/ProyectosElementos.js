import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

import {
  getDataUsuario,
  getElementosByIds,
  getProyectoById,
  getUserAPI,
} from "src/helpers/peticionesAPI";

import ProyectosElemento from "./ProyectosElemento";

import Loader from "src/reusable/Loader";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";

import "./ProyectosElementos.css";
import Navegacion,{NavegacionTipo} from "src/vistas/general/Navegacion";

const ProyectosElementos = ({
  match: {
    params: { idProyecto },
  },
  history
}) => {
  const [informacion, setInformacion] = useState({
    nombre: "",
    identificador : "",      
    descripcion : "",
    area : "",
    linea : "",
    proceso : "",
    tipo : "",
    estado: "inactivo",
    icono: iconoinactivo,
  });
  const [elementos, setElementos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const token = localStorage.getItem("token");
  const id = idProyecto;

  const getValor = async () => {
    const [
      { nombre, 
        identificador,      
        descripcion,
        area,
        linea,
        proceso,
        tipo, 
        estado, 
        elementos: elementosID },
      { elementos: elementosUsuarios, servicios },
    ] = await Promise.all([getProyectoById(token, id), getUserAPI(token)]);

    let elementos_id = elementosID.map((elemento) => {
      return elemento.elemento;
    });
    elementos_id = elementos_id.filter((elemento) => {
      return elementosUsuarios.includes(elemento);
    });
    let elementos = await getElementosByIds(token, elementos_id);
    elementos = elementos.map((elemento) => {
      return {
        ...elemento,
        configuracion: servicios.includes("PC"),
        graficas: servicios.includes("PGI") || servicios.includes("PGII"),
        estadisticas: servicios.includes("PE"),
      };
    });

    const icono = estado == "activo" ? iconoactivo : iconoinactivo;
    const estadoformato = estado[0].toUpperCase() + estado.substring(1);

    setElementos(elementos);
    setInformacion({
      nombre,
      identificador,      
      descripcion,
      area,
      linea,
      proceso,
      tipo,
      estado: estadoformato,
      icono,
    });
  };
  const getIntervalo = () => {
    return setInterval(getValor, 30000);
  };

  useEffect(async () => {
    setCargando(true);
    await getValor();
    const intervalo = getIntervalo();
    setCargando(false);
    return () => clearInterval(intervalo);
  }, []);

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <CContainer fluid>
      <Navegacion activo={3} tipo={NavegacionTipo.PROYECTO} history={history} direccion={id}/>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardBody>
              <CRow className="justify-content-between">
                <CCol className="col-3 d-flex align-items-center">
                  <img src={informacion.icono} className="icono" />
                  <h4 className="ml-2">{informacion.estado}</h4>
                </CCol>
                <CCol className="col-9 text-right">
                  <h5>Proyecto</h5>
                  <h3>{`${informacion.nombre}`}</h3>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              General
            </CCardHeader>
            <CCardBody>
              <CListGroup accent>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Identificador :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.identificador}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Descripcion :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.descripcion}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Area :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.area}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Linea :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.linea}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Proceso :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.proceso}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CListGroupItem accent="info">Tipo :</CListGroupItem>
                  </CCol>
                  <CCol sm="4" className="align-self-center">
                    {informacion.tipo}
                  </CCol>
                </CRow>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera-principal">
              Elementos
            </CCardHeader>
            <CCardBody>
              <CRow>
                {elementos.map((elemento) => {
                  return (
                    <ProyectosElemento
                      idProyecto={idProyecto}
                      elemento={elemento}
                      history={history}
                      key={elemento._id}
                    />
                  );
                })}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ProyectosElementos;
