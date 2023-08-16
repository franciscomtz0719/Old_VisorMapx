import React from "react";
import {
  CContainer,
  CCard,
  CCardBody
} from "@coreui/react";

import { ReportePDF } from "../pdf/reporte-pdf/ReportePDF";
import Loader from "../../reusable/Loader";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { getReporte } from "src/helpers/peticionesAPI";
import "./GenerarReporte.css";
import FormularioReporte from "./FormularioReporte";


class GenerarReporte extends React.PureComponent {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      reporte: {data:[],general:[],secciones:{general:true,bloques:true}},
      generacion: false,
      cargando: false
    };
    this.getReporte = this.getReporte.bind(this);
  }

  //metodo de solicitud de data al backend
  getReporte = async (tarjeta,folios,sensores,secciones) => {
    this.setState({generacion:false,cargando:true});
    const token = localStorage.getItem("token");    
  
    const respuesta = await getReporte([tarjeta.toString()], folios, token);        
    const configuracion = respuesta[0].configuracion;
    const reportes      = respuesta[0].reportes;
    const generales     = respuesta[0].generales;

    const data = [];
    const general = [];
    sensores.forEach((sensor) => {
      if(sensor.valor){
        data.push(reportes[sensor.index]);
        general.push(generales[sensor.index]);
      }
    });

    this.setState({reporte: {data,configuracion,general,secciones},generacion:true,cargando:false});
  };

  render() {
    return (
      <>      
        <FormularioReporte onGenerar={this.getReporte} tarjetas={this.props.tarjetas}/>
        {
          (this.state.cargando) ?
            <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
              <Loader height="10vh" />
            </div> 
          : null
        }
        {
          this.state.generacion ?  
          <CCard className="shadow contenedor-pdf">
            <CCardBody>
              <ReactToPrint content={() => this.componentRef}>
                <PrintContextConsumer>
                {({ handlePrint }) =>
                    <div  className="contenedor-btn">
                      <button
                        className="btn btn-guardar my-5 py-3 px-5"
                        onClick={handlePrint}
                      >
                        <h4 className="m-0">Imprimir Reporte(PDF)</h4>
                      </button>              
                    </div>
                }
                </PrintContextConsumer>
                <ReportePDF
                  ref={(el) => (this.componentRef = el)}
                  reporte={this.state.reporte}
                />
              </ReactToPrint>
            </CCardBody> 
          </CCard>
          :
          null           
        }
      </>
    );
  }

}

export default GenerarReporte;
