import React, { useContext, useEffect, useState } from "react";

import {
  CDataTable,
  CButton,
  CCollapse,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react";
import {
  getElementoById,
  getProyectoByIds,
  getUserAPI,
} from "src/helpers/peticionesAPI";

import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";

import "./ElementosPanel.css";
import { ServicesContext } from "src/containers/UserContext";
import Loader from "src/reusable/Loader";

const ElementosPanel = ({ history }) => {
  const token = localStorage.getItem("token");
  const servicios = useContext(ServicesContext);
  const [cargando, setCargando] = useState(true);

  const [elementos, setElementos] = useState([]);
  const [details, setDetails] = useState([]);

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
    { key: "proyecto", _style: { width: "30%" } },
    { key: "estado", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];


  const getElementos = async () => {
    return new Promise(async (callback) => {

      const lista_elementos = [];
      const promesas = [];
      const { proyectos: user_proyectos, elementos} = await getUserAPI(token);
      const proyectos = await getProyectoByIds(token, user_proyectos);

      proyectos.forEach(async (proyecto) => {
        proyecto.elementos.forEach((elemento) => {
          if(!elementos.includes(elemento.elemento))
            return;
          const elemento_info = getElementoById(token, elemento.elemento);
          promesas.push(elemento_info);
          elemento_info.then((res) => {
            lista_elementos.push({
              nombre: res.nombre,
              descripcion: res.descripcion,
              tipo: res.tipo,
              estado: res.estado,
              proyecto: proyecto.nombre,
              id: res._id,
            });
          });        
        });
      });

      Promise.all(promesas).then(() => {
        setElementos(lista_elementos);
        callback(true);
      });

    });
  };
  const getIntervalo = ()=> {
    return setInterval(getElementos,30000);
  }

  const click = (id, direccion) => {
    history.push(`/elementos/${id}/${direccion}`);
  };

  useEffect(async () => {
    setCargando(true);
    await getElementos();
    const intervalo = getIntervalo(); 
    setCargando(false);
    return ()=>clearInterval(intervalo);
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
              <h4 className="m-0">Elementos</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={elementos}
                fields={fields}
                columnFilter
                itemsPerPage={5}
                sorter
                responsive
                pagination
                onRowClick={(item) => console.log(item)}
                scopedSlots={{
                  nombre: (item) => {
                    return (
                      <div className="mt-2 pt-1 cursor" onClick={() => click(item.id, "informacion")}>{item.nombre}</div>
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
                            <CCol className="mb-4">
                              <div className="d-flex justify-content-center align-items-center flex-column w-100">
                                <h4 className="m-0">{`${item.descripcion}`}</h4>
                                <h4 className="m-0">{`${item.tipo}`}</h4>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol sm="3" className="my-1">
                              <CButton
                                className="boton-elemento"
                                onClick={() => click(item.id, "informacion")}
                              >
                                Información
                              </CButton>
                            </CCol>
                            {servicios.find((element) => element === "EC") ? (
                              <CCol sm="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() =>
                                    click(item.id, "configuracion")
                                  }
                                >
                                  Configuración
                                </CButton>
                              </CCol>
                            ) : null}
                            {servicios.find(
                              (element) =>
                                element === "EGI" || element === "EGII"
                            ) ? (
                              <CCol sm="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() => click(item.id, "graficas")}
                                >
                                  Graficas
                                </CButton>
                              </CCol>
                            ) : null}
                            {servicios.find((element) => element === "EE") ? (
                              <CCol sm="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() => click(item.id, "estadistica")}
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
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ElementosPanel;
