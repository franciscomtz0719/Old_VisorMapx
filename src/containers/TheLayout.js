import React, { useEffect, useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import {
  getAlertasAPI,
  getUserAPI,
  updateSesion,
} from "./../helpers/peticionesAPI";
import "react-toastify/dist/ReactToastify.css";
import { ServicesContext } from "./UserContext";

const TheLayout = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [alertas, setAlertas] = useState([]);

  const secuenciarSesion = () => {
    
    const checkSesion = async () => {
      const sesion = await updateSesion(token);
      let login = true;

      if (sesion.status) 
        if (sesion.respuesta) 
          login = false;
      
      setLogin(login);
    };

    checkSesion();
    setInterval(checkSesion, 0.5 * 60 * 1000);      
    
  };

  const getUser = async (token) => {
    const usuario_token = await getUserAPI(token);
    setUser(usuario_token);
  };

  const getAlertas = async () => {
    const alertas_api = await getAlertasAPI(token);
    if (alertas_api.length <= 0) 
      return;
    const alertas = []
    alertas_api.forEach((alerta) => {
      if(alerta.vista)
        return;
      let existe = false;
      for(let i=0;i<alertas.length;i++)
        if(alertas[i].direccion.toString() === alerta.direccion.toString()){
          existe = true;
          alertas[i] = {
            ...alertas[i],
            peligrosidad: alertas[i].peligrosidad+alerta.peligrosidad,  
            cantidad: alertas[i].cantidad+1,
            fechainicio: alerta.fechaservidor,
          }
        }
      if(!existe){
        alertas.push({
          direccion: alerta.direccion,
          nombre: alerta.nombre,
          alias: alerta.alias,
          peligrosidad: alerta.peligrosidad,  
          fechainicio: alerta.fechaservidor,
          fechatermino: alerta.fechaservidor,
          cantidad: 1    
        });
      }
        
    });    
    setAlertas(alertas);   
  };
  const getIntervalo = () => {
    return setInterval(getAlertas, 30000);
  };

  useEffect(async () => {
    secuenciarSesion();
    await getUser(token);    
    await getAlertas();
    const intervalo = getIntervalo();
    return () => clearInterval(intervalo);
  }, []);

  if (user == null || login) return <Redirect to="/landpage" />;
  return (
    <div className="c-app c-default-layout">
      <TheSidebar
        servicios={user.servicios}
        tarjetas={user.tarjetas}
        elementos={user.elementos}
        proyectos={user.proyectos}
      />
      <div className="c-wrapper">
        <ServicesContext.Provider
          value={{ alertas }}
        >
          <TheHeader />
        </ServicesContext.Provider>
        <div className="c-body">
          <ServicesContext.Provider value={user.servicios}>
            <TheContent />
          </ServicesContext.Provider>
        </div>
        <TheFooter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TheLayout;
export { TheLayout };
