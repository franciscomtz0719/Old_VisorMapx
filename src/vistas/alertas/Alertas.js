import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CDataTable,
  CBadge,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CContainer,
} from "@coreui/react";
import "./Alertas.css";
import { getAlertasAPI, putAlertaAPI } from "src/helpers/peticionesAPI";
import Loader from "src/reusable/Loader";

const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "danger";
    default:
      return "primary";
  }
};

const fields = [
  { key: "nombre", _style: { width: "30%" } },
  { key: "direccion", _style: { width: "10%" } },
  { key: "cantidad", _style: { width: "10%" } },
  {
    key: "atender_alertas",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const fieldsConjuntos = [
  { key: "fecha", _style: { width: "19%" } },
  { key: "tipo", _style: { width: "19%" } },
  { key: "tendencia", _style: { width: "19%" } },
  { key: "estatus", _style: { width: "19%" } },
  { key: "descripción", _style: { width: "24%" } },
  {
    key: "show_action",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const Alertas = () => {
  const token = useState(localStorage.getItem("token"));

  const [details, setDetails] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [alertasConjunto, setAlertasConjunto] = useState({});
  const [cargando, setCargando] = useState(false);
  // const [botonAtender, setBotonAtender] = useState(true);

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

  const getAlertas = async () => {
    const resp = await getAlertasAPI(token);
    let obj_alertas = {};
    let arr_alertas = [];

    resp.forEach((r) => {
      if (obj_alertas[r.nombre] != undefined) {
        obj_alertas[r.nombre].push(r);
      } else {
        obj_alertas[r.nombre] = [r];
      }
    });

    Object.entries(obj_alertas).forEach(([key, value]) => {
      let vistas = 0;
      let botonAtender = true;

      value.forEach((v) => {
        vistas += v.vista;
      });
      if (value.length === vistas) 
        botonAtender = false
      arr_alertas.push({
        nombre: key,
        direccion: value[0].direccion,
        cantidad: value.length,
        vistas: vistas,
        botonAtender
      });
      
    });
    setAlertasConjunto(obj_alertas);
    setAlertas(arr_alertas);
  };

  const atenderAlerta = async (id, nombre) => {
    alertasConjunto[nombre].forEach((alerta) => {
      if (alerta.vista) console.log(alerta);
    });
    setCargando(true);
    await putAlertaAPI(id, token);
    await getAlertas();
    setCargando(false);
  };

  const atenderAlertas = async (nombre) => {
    let ids = [];
    alertasConjunto[nombre].forEach((alerta) => {
      if (!alerta.vista) ids.push(alerta._id);
    });

    setCargando(true);
    await putAlertaAPI(ids, token);
    await getAlertas();
    setCargando(false);
  };

  useEffect(async () => {
    setCargando(true);
    await getAlertas();
    const intervalo = setInterval(async () => {
      await getAlertas();
    }, 30000);
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
              <h4 className="m-0">Alertas</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={alertas}
                fields={fields}
                tableFilter
                itemsPerPage={25}
                sorter
                pagination
                scopedSlots={{
                  nombre: (item) => <th>{item.nombre}</th>,
                  direccion: (item) => <th>{item.direccion}</th>,
                  cantidad: (item) => (
                    <th>
                      {item.vistas}/{item.cantidad}
                    </th>
                  ),
                  atender_alertas: (item, index) => {
                    return (
                      <td className="py-2 text-center">
                        {item.botonAtender ? (
                          <CButton
                            className="boton-elemento"
                            size="sm"
                            onClick={() => {
                              atenderAlertas(item.nombre);
                            }}
                          >
                            Atender todas las alertas
                          </CButton>
                        ) : (
                          <span>Alertas atendidas</span>
                        )}
                      </td >
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
                          {details.includes(index) ? "Ocultar" : "Mostrar"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <CRow>
                            <CDataTable
                              items={alertasConjunto[item.nombre]}
                              fields={fieldsConjuntos}
                              striped
                              hover
                              sorter
                              columnFilter
                              scopedSlots={{
                                tendencia: (item) => (
                                  <td>
                                    {parseFloat(item.peligrosidad).toFixed(4)}
                                  </td>
                                ),
                                fecha: (item) => <td>{item.fechaservidor}</td>,
                                estatus: (item) => (
                                  <td>
                                    <CBadge
                                      color={getBadge(item.vista)}
                                      className="text-light"
                                    >
                                      {item.vista ? "Atendida" : "Pendiente"}
                                    </CBadge>
                                  </td>
                                ),
                                descripción: (item) => (
                                  <td>
                                    {item.tipo == "falla" ||
                                    item.tipo == "hardware"
                                      ? item.peligrosidad > 0
                                        ? "La variable se encuentra fuera del rango (Alta)"
                                        : "La variable se encuentra fuera del rango (Baja)"
                                      : item.peligrosidad > 0
                                      ? "La variable probablemente saldra del rango (Alta)"
                                      : "La variable probablemente saldra del rango (Baja)"}
                                  </td>
                                ),
                                show_action: (item, index) => {
                                  return (
                                    <td className="py-2">
                                      {item.vista ? null : (
                                        <CButton
                                          className="boton-alerta"
                                          size="sm"
                                          onClick={() =>
                                            atenderAlerta(item._id, item.nombre)
                                          }
                                        >
                                          Atender
                                        </CButton>
                                      )}
                                    </td>
                                  );
                                },
                              }}
                            />
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

export default Alertas;
