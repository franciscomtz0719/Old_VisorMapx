import React from "react";
import "./ReportePDF.css"
import logoApp from '../../../assets/img/Logo_Azul.png';
import logoFlogo from '../../../assets/img/Flogo_Logo.png';

function getFecha(folio){
  if(folio==undefined)
    return "";
  const minuto = (folio.substr(10,1)=="0")?"00":"30";
  return folio.substr(0,4)+"/"+folio.substr(4,2)+"/"+folio.substr(6,2)+" "+folio.substr(8,2)+":"+minuto;  
}
const GetFechaInicial = (sensor)=>{
   for(let i=0;i<sensor.length;i++)
    if(sensor[i].bloque != null)
      return sensor[i].folio;
    return null;
}

export class ReportePDF extends React.PureComponent {
  constructor(props) {
    super(props);   
  }

  render() {

    const {data,general,configuracion,secciones} = this.props.reporte;
    const tabladata = [];
    const tablageneral = [];

    data.forEach((sensor,i) => {         
      let index = 0;
      if(sensor==null)
        return;
      sensor.forEach((reporte,j)=>{        
        if(reporte.tipo!="sistema")
          return;            
        if(reporte.bloque==null)
          return;                    
        index++;   
        //GENERAL  
        if(index == 1) {      
          if( i==0 ) {   
            tablageneral.push(
              <tr key={"rango"+i}>
                <td className="celda-fecha" colSpan="13"><b>{getFecha(GetFechaInicial(sensor))}</b> a <b>{getFecha(sensor[sensor.length-1].folio)}</b></td>
              </tr>
            );
            tablageneral.push( 
              <tr key = {"parametros"+i}>
                <td className="celda">Sensor</td>
                <td className="celda">Rango</td>
                <td className="celda">Minimo</td>
                <td className="celda">Promedio</td>
                <td className="celda">Maximo</td>
                <td className="celda">Desviacion</td>
                <td className="celda">Eficiencia</td>
                <td className="celda">CP | PP</td>
                <td className="celda">CPK | PPK</td>
                <td className="celda">CPM | PPM</td>
                <td className="celda">Negativa</td>
                <td className="celda">Positiva</td>              
                <td className="celda">Alertas</td>
              </tr> 
            );            
          }
          const clase = (general[i].basica.eficiencia < 1)?"falla":"";
          tablageneral.push(
              
              <tr className={clase} key={"general"+i}>
                <td className="celda-data">{reporte.nombre}</td>
                <td className="celda-data">{"("+reporte.rango[0]+", "+reporte.rango[1]+") "+reporte.unidades}</td>
                <td className="celda-data">
                  {(general[i].basica.valor.min)?general[i].basica.valor.min.toFixed(2)+" "+reporte.unidades:'-'}
                </td>
                <td className="celda-data">
                  {(general[i].basica.valor.promedio)?general[i].basica.valor.promedio.toFixed(2)+" "+reporte.unidades:'-'}
                </td>                    
                <td className="celda-data">                      
                  {(general[i].basica.valor.max)?general[i].basica.valor.max.toFixed(2)+" "+reporte.unidades:'-'}
                </td>
                <td className="celda-data">
                  {(general[i].basica.valor.desviacion[0])?general[i].basica.valor.desviacion[0].toFixed(3)+" | "+general[i].basica.valor.desviacion[1].toFixed(3):"- | -"}
                </td>
                <td className="celda-data">                    
                  {(general[i].basica.eficiencia)?(general[i].basica.eficiencia*100).toFixed(1)+"%":'-'}
                </td>
                <td className="celda-data">                    
                  {(general[i].sixsigma.c.p)?general[i].sixsigma.c.p.toFixed(3)+" | "+general[i].sixsigma.p.p.toFixed(3):'-'}
                </td>
                <td className="celda-data">                    
                  {(general[i].sixsigma.c.pk)?general[i].sixsigma.c.pk.toFixed(3)+" | "+general[i].sixsigma.p.pk.toFixed(3):'-'}
                </td>            
                <td className="celda-data">                    
                  {(general[i].sixsigma.c.pm)?general[i].sixsigma.c.pm.toFixed(3)+" | "+general[i].sixsigma.p.pm.toFixed(3):'-'}
                </td>            

                {
                  (general[i].peligrosidad.paquetes<=0)?<td className="celda-data">{"0.0%"}</td>:
                  <td className="celda-data">{(general[i].peligrosidad.tendencia.negativa/general[i].peligrosidad.paquetes*100).toFixed(1)+"%"}</td>
                } 
                {
                  (general[i].peligrosidad.paquetes<=0)?<td className="celda-data">{"0.0%"}</td>:
                  <td className="celda-data">{(general[i].peligrosidad.tendencia.positiva/general[i].peligrosidad.paquetes*100).toFixed(1)+"%"}</td>
                }
                
                <td className="celda-data">{general[i].peligrosidad.paquetes}</td>
              </tr>            
            );
        }    
        //DATOS
        if(index == 1) {
          tabladata.push(
            <tr key={"sensor"+i}>
              <td className="celda-sensor" colSpan="13">{reporte.nombre}</td>
            </tr>
          );
          tabladata.push(
            <tr key={"rango"+i}>
              <td className="celda-rango" colSpan="13">{"( "+reporte.rango[0]+" "+reporte.unidades+" , "+reporte.rango[1]+" "+reporte.unidades+" )"}</td>
            </tr>
          );
          tabladata.push( 
            <tr key = {"parametros"+i}>
              <td className="celda">Fecha</td>
              <td className="celda">Reporte</td>
              <td className="celda">Minimo</td>
              <td className="celda">Promedio</td>
              <td className="celda">Maximo</td>
              <td className="celda">Desviacion</td>
              <td className="celda">Eficiencia</td>
              <td className="celda">CP | PP</td>
              <td className="celda">CPK | PPK</td>
              <td className="celda">CPM | PPM</td>
              <td className="celda">Negativa</td>
              <td className="celda">Positiva</td>              
              <td className="celda">Alertas</td>
            </tr> 
          );
        }           
        const clase = (reporte.bloque.basica.eficiencia < 1)?"falla":"";
        tabladata.push( <tr className={clase} key={i+"-"+j}>
                      <td className="celda-data">{getFecha(reporte.folio)}</td>
                      <td className="celda-data">{index}</td>
                
                      <td className="celda-data">
                        {(reporte.bloque.basica.valor.min)?reporte.bloque.basica.valor.min.toFixed(2)+" "+reporte.unidades:'-'}
                      </td>
                      <td className="celda-data">
                        {(reporte.bloque.basica.valor.promedio)?reporte.bloque.basica.valor.promedio.toFixed(2)+" "+reporte.unidades:'-'}
                      </td>                    
                      <td className="celda-data">                      
                        {(reporte.bloque.basica.valor.max)?reporte.bloque.basica.valor.max.toFixed(2)+" "+reporte.unidades:'-'}
                      </td>

                      <td className="celda-data">{(reporte.bloque.basica.valor.desviacion[0])?reporte.bloque.basica.valor.desviacion[0].toFixed(3)+" | "+reporte.bloque.basica.valor.desviacion[1].toFixed(3):"- | -"}</td>
                
                      <td className="celda-data">                    
                        {(reporte.bloque.basica.eficiencia)?(reporte.bloque.basica.eficiencia*100).toFixed(1)+"%":'-'}
                      </td>
                      <td className="celda-data">                    
                        {(reporte.bloque.sixsigma.c.p)?reporte.bloque.sixsigma.c.p.toFixed(3)+" | "+reporte.bloque.sixsigma.p.p.toFixed(3):'-'}
                      </td>
                      <td className="celda-data">                    
                        {(reporte.bloque.sixsigma.c.pk)?reporte.bloque.sixsigma.c.pk.toFixed(3)+" | "+reporte.bloque.sixsigma.p.pk.toFixed(3):'-'}
                      </td>            
                      <td className="celda-data">                    
                        {(reporte.bloque.sixsigma.c.pm)?reporte.bloque.sixsigma.c.pm.toFixed(3)+" | "+reporte.bloque.sixsigma.p.pm.toFixed(3):'-'}
                      </td>            

                      {
                        (reporte.bloque.peligrosidad.paquetes<=0)?<td className="celda-data">{"0.0%"}</td>:
                        <td className="celda-data">{(reporte.bloque.peligrosidad.tendencia.negativa/reporte.bloque.peligrosidad.paquetes*100).toFixed(1)+"%"}</td>
                      } 
                      {
                        (reporte.bloque.peligrosidad.paquetes<=0)?<td className="celda-data">{"0.0%"}</td>:
                        <td className="celda-data">{(reporte.bloque.peligrosidad.tendencia.positiva/reporte.bloque.peligrosidad.paquetes*100).toFixed(1)+"%"}</td>
                      }
                      
                      <td className="celda-data">{reporte.bloque.peligrosidad.paquetes}</td>
                    
                    </tr>
        );

      });
    })


    return (
      <div className="reporte-principal">
        <div className="reporte-encabezado">
          <img src={logoApp} className="app"/>
          <img src={logoFlogo} className="flogo"/>
        </div>
        <div className="reporte-identificador">
            <h2 className="tarjeta">{configuracion.nombre}</h2>
        </div>
        {
        (secciones.general)?
          <table className="reporte-tabla">
            <thead>
              <tr>
                <th className="celda-titulo" colSpan = "14">General</th>                             
              </tr>
              <tr>
                <th className="celda" colSpan = "1">Identificador</th>      
                <th className="celda" colSpan = "5">Valor</th>          
                <th className="celda" colSpan = "4">Capacidad</th>
                <th className="celda" colSpan = "3">Tendencia</th>            
              </tr>            
            </thead>
            <tbody>                      
              {
                tablageneral
              }       
            </tbody>                                    
          </table>:null
        }  
        {
          (secciones.bloques)?
          <table className="reporte-tabla">
            <thead>
              <tr>
                <th className="celda-titulo" colSpan = "14">Bloques</th>                             
              </tr>
              <tr>
                <th className="celda" colSpan = "2">Identificador</th>      
                <th className="celda" colSpan = "4">Valor</th>          
                <th className="celda" colSpan = "4">Capacidad</th>
                <th className="celda" colSpan = "3">Tendencia</th>            
              </tr>            
            </thead>
            <tbody>                      
              {
                tabladata
              }       
            </tbody>                                    
          </table> : null  
        }              
      </div>
    );

  }
}
