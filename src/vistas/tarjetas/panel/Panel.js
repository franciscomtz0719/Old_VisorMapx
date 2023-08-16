import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CContainer,
  CDataTable,
  CRow,
} from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "src/containers/UserContext";
import { getTarjeta, getUserAPI } from "src/helpers/peticionesAPI";
import Loader from "src/reusable/Loader";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";
import "./Panel.css";

const Panel = ({ history }) => {

  const servicios = useContext(ServicesContext);
  const [cargando, setCargando] = useState(true);

  const [tarjetas, setTarjetas] = useState([]);
  const [details, setDetails] = useState([]);

  const token = localStorage.getItem("token");

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "nombre", _style: { width: "60%" } },
    { key: "n_graficas", _style: { width: "15%" } },
    { key: "n_sensores", _style: { width: "15%" } },
    { key: "estado", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getTarjetas = async () => {
    return new Promise(async (callback)=>{
      const { tarjetas } = await getUserAPI(token);
      const promesas = tarjetas.map( (tarjeta) => {
        return getTarjeta(tarjeta, token);        
      });
      const resultado = await Promise.all(promesas);
      const lista_tarjetas = resultado.map((tarjeta) => {
          return {
            nombre: tarjeta.nombre,
            estado: tarjeta.estado,
            n_graficas: tarjeta.graficas.length,
            n_sensores: tarjeta.sensores.length,
            id: tarjeta._id,
          }
      });      
      setTarjetas(lista_tarjetas);
      callback(true);
    });
  };
  const getIntervalo = () => {
    return setInterval(getTarjetas, 30000);
  };

  const click = (nombre, direccion) => {
    history.push(`/tarjetas/${nombre}/${direccion}`);
  };

  useEffect(async () => {
    setCargando(true);
    await getTarjetas();
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
      <CRow>
        <CCol sm="12">
          <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera">
              <h4 className="m-0">Tarjetas</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={tarjetas}
                fields={fields}
                columnFilter
                itemsPerPage={5}
                sorter
                responsive
                pagination
                scopedSlots={{
                  nombre: (item) => {
                    return (
                      <div className="ml-2 mt-2 pt-1 cursor" onClick={() => click(item.nombre, "informacion")}>{item.nombre}</div>
                    )
                  },
                  estado: (item) => {
                    const icono =
                      item.estado == "activo" ? iconoactivo : iconoinactivo;
                    return (
                      <td>
                        <img src={icono} className="icono" />
                      </td>
                    );
                  },
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          className="boton-elemento"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index)
                            ? "Ocultar"
                            : "Caracteristicas"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <CRow>
                            <CCol md="3" className="my-1">
                              <CButton
                                className="boton-elemento"
                                onClick={() => click(item.nombre, "informacion")}
                              >
                                Información
                              </CButton>
                            </CCol>
                            {servicios.find((element) => element === "TC") ? (
                              <CCol md="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() =>
                                    click(item.nombre, "configuracion")
                                  }
                                >
                                  Configuración
                                </CButton>
                              </CCol>
                            ) : null}
                            {servicios.find((element) => element === "TGI") ? (
                              <CCol md="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() => click(item.nombre, "graficas")}
                                >
                                  Graficas
                                </CButton>
                              </CCol>
                            ) : null}
                            {servicios.find((element) => element === "TE") ? (
                              <CCol md="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() => click(item.nombre, "estadistica")}
                                >
                                  Estadisticas
                                </CButton>
                              </CCol>
                            ) : null}
                          </CRow>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Panel;
