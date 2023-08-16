import React, { useContext, useMemo} from "react";
import { CCard, CCol, CRow, CNav, CNavItem, CNavLink } from "@coreui/react";
import { ServicesContext } from "src/containers/UserContext";
import propTypes from "prop-types";
import "./Navegacion.css";

const NavegacionTipo = {
  TARJETA : 0,
  ELEMENTO : 1,
  PROYECTO : 2 
}
const Navegacion = ({activo = 0,tipo = NavegacionTipo.ELEMENTO, history, direccion}) => {

  const servicios = useContext(ServicesContext);
  const navegacion = useMemo(() =>{
    const navegacion = [];
    switch(tipo) {
      case NavegacionTipo.TARJETA:
        navegacion.push({titulo:"Información",id:0,direccion:"informacion",key:"tinformacion"});
        if(servicios!=undefined){
          if(servicios.includes("TC"))
            navegacion.push({titulo:"Configuración",id:1,direccion:"configuracion",key:"tconfiguracion"});
          if(servicios.includes("TGI") || servicios.includes("TGII"))
            navegacion.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"});
          if(servicios.includes("TE"))
            navegacion.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"});
        }        
        break;        
      case NavegacionTipo.ELEMENTO:
        navegacion.push({titulo:"Información",id:0,direccion:"informacion",key:"einformacion"});
        if(servicios!=undefined){
          if(servicios.includes("EC"))
            navegacion.push({titulo:"Configuración",id:1,direccion:"configuracion",key:"econfiguracion"});
          if(servicios.includes("EGI") || servicios.includes("EGII"))
            navegacion.push({titulo:"Graficas",id:2, direccion:"graficas",key:"egraficas"});
          if(servicios.includes("EE"))
            navegacion.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"});
        }        
        break;
      case NavegacionTipo.PROYECTO:
        if(servicios!=undefined){
          if(servicios.includes("EGI") || servicios.includes("EGII"))
            navegacion.push({titulo:"Información",id:0,direccion:"informacion",key:"pinformacion"});
          if(servicios.includes("EC"))
            navegacion.push({titulo:"Configuración",id:1,direccion:"configuracion",key:"pconfiguracion"});
          if(servicios.includes("EE"))
            navegacion.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"});
          navegacion.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"});
        }
        break;        
    } 
    return navegacion;
  },[servicios,tipo]);
  
  const click = (index) => {
    
    switch(tipo) {
      case NavegacionTipo.TARJETA:
        history.push(`/tarjetas/${direccion}/${navegacion[index].direccion}`);           
        break;        
      case NavegacionTipo.ELEMENTO:
        history.push(`/elementos/${direccion}/${navegacion[index].direccion}`);         
       break;
      case NavegacionTipo.PROYECTO:
        history.push(`/proyectos/${direccion}/${navegacion[index].direccion}`);         
        break;
    }

  }

  return (
    <>
      <CCard className="navegacion py-1">                                                          
        <div className="panel d-flex justify-content-end">
          <CNav variant="tabs">
            {navegacion.map((item,index) => {
              return (
                <CNavItem key={item.key}>
                  {
                    (item.id==activo)?
                    <CNavLink className="link" active>{item.titulo}</CNavLink>
                    :
                    <CNavLink className="link" onClick={()=>click(index)}>{item.titulo}</CNavLink>
                  }        
                </CNavItem>
              );
            })}  
          </CNav>            
        </div>                  
      </CCard>
    </>
  );
};

Navegacion.propTypes = {
  activo: propTypes.number,
  tipo: propTypes.oneOf([0,1,2]),
  direccion: propTypes.string,
  history: propTypes.object
};

export {NavegacionTipo};
export default Navegacion;
