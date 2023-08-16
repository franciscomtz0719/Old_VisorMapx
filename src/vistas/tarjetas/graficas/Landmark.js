import React, { useEffect, useRef, useState } from "react";
import {
  CButton,
  CCollapse,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { Chart, Line } from "react-chartjs-2";
import "./Graficas.css";
import zoom from "chartjs-plugin-zoom";
import store from "src/store";

const data = (labels, values, arr_colors, etiquetas) => {
  let hour = [];
  let arr_values = [];
  if (labels.length > 1) {
    labels.forEach((label) => {
      hour.push(label.slice(11, label.length));
    });
  }
  values.forEach((v, idx) => {
    arr_values.push({
      label: `${etiquetas[idx].alias}`,
      data: v,
      fill: false,
      backgroundColor: `rgb(${arr_colors[idx]})`,
      borderColor: `rgb(${arr_colors[idx]}, 0.2)`,
    });
  });

  return {
    labels: hour,
    datasets: arr_values,
  };
};

const options = {
  scales: {
    y: {
      grace: "0.25%",
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "xy",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
        onZoomComplete({ chart }) {
          chart.update("none");
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const arr_colors = ["81,205,160", "109,120,173", "224,125,117"];

const Landmark = ({ sensores }) => {
  const chartRef = useRef(null);
  const arr_clean = sensores[0].map(() => {
    return [];
  });
  const [accordion, setAccordion] = useState();
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState(arr_clean);
  const [disponibilidad, setDisponibilidad] = useState(false);

  const { graficasDatos } = store.getState();

  const ultimoDato = (oldData, newData) => {
    if (oldData.length < graficasDatos.corto) return [...oldData, newData];
    else
      return [
        ...oldData.slice(
          oldData.length - (graficasDatos.corto - 1),
          oldData.length
        ),
        newData,
      ];
  };

  const inicializar = () => {
    let arr_dates = [];
    let matrix_val = [...arr_clean];
    sensores.forEach((sensor) => {
      if (sensor[0].landmark === null) {
        return;
      }
      setDisponibilidad(true);
      arr_dates.push(sensor[0].fecha);
      let arr = [];
      for (let i = 0; i < sensor.length; i++) {
        arr.push(ultimoDato(matrix_val[i], sensor[i].landmark.nivel[1]));
      }
      matrix_val = [...arr];
    });
    setValues(matrix_val);
    setLabels(arr_dates);
  };

  const actualizar = () => {
    if (sensores[0][0].landmark === null) {
      return;
    }
    setDisponibilidad(true);
    setLabels((old) => {
      return ultimoDato(old, sensores[0][0].fecha);
    });
    setValues((old) => {
      let arr = [];
      for (let i = 0; i < sensores[0].length; i++) {
        arr.push(ultimoDato(old[i], sensores[0][i].landmark.nivel[1]));
      }
      return arr;
    });
  };

  const resetZoom = () => {
    chartRef.current.resetZoom();
  };

  useEffect(() => {
    Chart.register(zoom);
    if (sensores.length > 1) inicializar();
    else if (sensores.length === 1) actualizar();
  }, [sensores]);

  return (
    <>
      {disponibilidad ? (
        <div>
          <div
            className="container-fluid"
            style={{ minHeight: "40vh", maxHeight: "50vh" }}
          >
            <Line
              data={data(labels, values, arr_colors, sensores[0])}
              options={options}
              ref={chartRef}
            />
            <CButton className="boton-reset" onClick={resetZoom}>
              Restablecer Zoom
            </CButton>
          </div>
          <div className="mt-5">
            {sensores[0].map((sensor, idx) => {
              return (
                <div id="accordion" key={idx}>
                  <CCard className="mb-0">
                    <CCardHeader className="contenedor-cabecera">
                      <CButton
                        block
                        className="text-left m-0 p-0 "
                        onClick={() =>
                          setAccordion(accordion === idx ? null : idx)
                        }
                      >
                        <h5 className="m-0 p-0">
                          <span className="text-color">
                            {" "}
                            {sensor.nombre} ({sensor.alias}){" "}
                          </span>
                        </h5>
                      </CButton>
                    </CCardHeader>
                    <CCollapse show={accordion === idx}>
                      <CCardBody>
                        <pre>
                          <h6>Fecha : {sensor.fecha} </h6>
                        </pre>
                        <pre>
                          <h6>
                            Valor (actual) :{" "}
                            {sensor.landmark.nivel[1].toFixed(4)}
                          </h6>
                        </pre>
                        <pre>
                          <h6>
                            Cambio t : {(sensor.landmark.deltai / 2).toFixed(4)}{" "}
                            min
                          </h6>
                        </pre>
                        <pre>
                          <h6>
                            Cambio f(t) : {sensor.landmark.deltay.toFixed(4)}
                          </h6>
                        </pre>
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        "Información no disponible"
      )}
    </>
  );
};

export default Landmark;
