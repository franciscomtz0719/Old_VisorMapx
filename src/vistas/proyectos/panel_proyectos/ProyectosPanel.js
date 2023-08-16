import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "src/containers/UserContext";
import Loader from "src/reusable/Loader";
import "./ProyectosPanel.css";
import iconoactivo from "../../../assets/icons/activo.svg";
import iconoinactivo from "../../../assets/icons/inactivo.svg";
import { getProyectoByIds, getUserAPI } from "src/helpers/peticionesAPI";
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

const ProyectosPanel = ({ history }) => {
  const token = localStorage.getItem("token");
  const servicios = useContext(ServicesContext);
  const [cargando, setCargando] = useState(true);

  const [proyectos, setProyectos] = useState([]);
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
    { key: "nombre", _style: { width: "30%" } },
    { key: "area", _style: { width: "20%" } },
    { key: "linea", _style: { width: "20%" } },
    { key: "tipo", _style: { width: "20%" } },
    { key: "estado", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getProyectos = async () => {
    return new Promise(async (callback) => {
      const { proyectos } = await getUserAPI(token);
      const promesas = proyectos.map(async (proyecto) => {
        return getProyectoByIds(token, proyecto);      
      });
      const resultado = await Promise.all(promesas);
      const lista_proyectos = resultado.map((proyecto) => {
        return {
          nombre: proyecto.nombre,
          area: proyecto.area,
          linea: proyecto.linea,
          tipo: proyecto.tipo,
          estado: proyecto.estado,
          id: proyecto._id,
        }
      });   
      setProyectos(lista_proyectos);    
      callback(true);
    });
  };
  const getIntervalo = () => {
    return setInterval(getProyectos, 30000);
  };

  const click = (id, direccion) => {
    history.push(`/proyectos/${id}/${direccion}`);
  };

  useEffect(async () => {
    setCargando(true);
    await getProyectos();
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
              <h4 className="m-0">Proyectos</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={proyectos}
                fields={fields}
                columnFilter
                itemsPerPage={5}
                sorter
                responsive
                pagination
                scopedSlots={{
                  nombre: (item) => {
                    return (
                      <div className="mt-2 pt-1 cursor" onClick={() => click(item.id, "informacion")}>{item.nombre}</div>
                    )
                  },
                  estado: (item) => {
                    const icono = item.estado == "activo" ? iconoactivo : iconoinactivo;
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
                                className="boton-elemento "
                                onClick={() => click(item.id, "informacion")}
                              >
                                Información
                              </CButton>
                            </CCol>
                            {servicios.find((element) => element === "PC") ? (
                              <CCol md="3" className="my-1">
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
                            {servicios.find((element) => element === "PE") ? (
                              <CCol md="3" className="my-1">
                                <CButton
                                  className="boton-elemento"
                                  onClick={() => click(item.id, "estadistica")}
                                >
                                  Estadisticas
                                </CButton>
                              </CCol>
                            ) : null}
                            <CCol md="3" className="my-1">
                              <CButton
                                className="boton-elemento"
                                onClick={() => click(item.id, "elementos")}
                              >
                                Elementos
                              </CButton>
                            </CCol>
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

export default ProyectosPanel;
