import { CContainer } from "@coreui/react";
import React,{useEffect,useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import { getSensores, getUserAPI } from "src/helpers/peticionesAPI";
import Loader from "src/reusable/Loader";
import GenerarReporte from "./GenerarReporte";
import './Reportes.css'

const Reportes = () => {

  const [acceso, setAcceso] = useState(false);
  const [tarjetas, setTarjetas] = useState([]);
  const [cargando, setCargando] = useState(true);

 useEffect(async() => {
   setCargando(true);
    try{
      const token = localStorage.getItem('token');
      const {flogo,tarjetas:nombres}= await getUserAPI(token);
      const sensores = await getSensores(nombres,token);
      const sensoresRev = sensores.reverse();

      const tarjetas = nombres.map((tarjeta,i) => {
        return {
          nombre: tarjeta,
          sensores: sensoresRev[i]
        }
      });
      setAcceso(flogo);
      setTarjetas(tarjetas);
    }
    catch(e){};
    setCargando(false);
 }, [])

  if (cargando)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "40vh" }}>
        <Loader height="10vh" />
      </div>
    );
  return (
    <>
      <CContainer fluid>        
        <GenerarReporte acceso={acceso} tarjetas={tarjetas}/>          
      </CContainer>      
    </>
  );
};

export default Reportes;
