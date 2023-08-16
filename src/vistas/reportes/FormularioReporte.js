import React, {useState} from 'react';
import { CCard, CCardBody,CCardHeader } from "@coreui/react";
import "./FormularioReporte.css"

const getFecha = (fecha)=>{
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();

    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}
const getFolio = (fecha)=>{
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    let hour = fecha.getHours();
    let minuto = fecha.getMinutes()<30?0:1;
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    if(hour < 10){
        hour = "0" + hour;
    }
    return year + month + day + hour + minuto;
}
const getBloques = ()=>{
    const bloques = [];
    for(let i = 0; i < 24; i++){
        const hora = (i<10)?"0"+i:i;
        bloques.push(hora+":00");
        bloques.push(hora+":30");
    }
    return bloques;
}
const getSensores = (tarjeta)=>{
    const filtro = tarjeta.sensores.filter(sensor => sensor.tipo == "sistema");
    const sensores = filtro.map((sensor)=>{   
        return {nombre: sensor.nombre, index: sensor.index,valor: true}
    });
    return sensores;
}

function FormularioReporte({onGenerar,tarjetas=[]}){

    const [formulario, setFormulario] = useState({        
        tarjeta : 0,
        sensores : getSensores(tarjetas[0]), 
        inicio : {
            fecha   : getFecha(new Date()),
            bloque  : "00:00",            
        },
        termino : {
            fecha : getFecha(new Date()),
            bloque : "00:00",
        },
        secciones : {
            general : true,
            bloques : true
        },
        bloques : getBloques(),        
    });
    const hoy = getFecha(new Date());

    const editar = (e,index)=>{
        let aux = "";
        switch (index) {
            case 0:
                aux = e.target.selectedIndex;       
                console.log(tarjetas[aux]);               
                setFormulario({...formulario,tarjeta : aux,sensores : getSensores(tarjetas[aux])});
                break;
            case 1:
                aux = e.target.value;                      
                setFormulario({...formulario,inicio:{...formulario.inicio,fecha: aux}});
                break;
            case 2:
                aux = e.target.options[e.target.selectedIndex].value;                               
                setFormulario({...formulario,inicio:{...formulario.inicio,bloque: aux}});
                break;
            case 3:
                aux = e.target.value;                               
                setFormulario({...formulario,termino:{...formulario.termino,fecha: aux}});
                break;
            case 4:
                aux = e.target.options[e.target.selectedIndex].value;
                setFormulario({...formulario,termino:{...formulario.termino,bloque: aux}});
                break;
            case 5:
                aux = e.target.checked;
                if(!aux && !formulario.secciones.bloques)
                    aux = true;
                setFormulario({...formulario,secciones:{...formulario.secciones,general: aux}});
                break;
            case 6:
                aux = e.target.checked;
                if(!aux && !formulario.secciones.general)
                    aux = true;
                setFormulario({...formulario,secciones:{...formulario.secciones,bloques: aux}});
                break;
            default:                
                aux = e.target.checked
                const sensores = formulario.sensores;
                sensores[index-7].valor = aux;
                setFormulario({...formulario,sensores});
                break;
        }        
        
    }
    const generar = (e)=>{
        e.preventDefault();
        const folios = [];
        
        const fechaFolio = (fecha)=>{
            const date = new Date(fecha.fecha+" "+fecha.bloque);
            return date;
        }

        let fechaInicio = fechaFolio(formulario.inicio);
        let fechaTermino = fechaFolio(formulario.termino);

        if(fechaInicio > fechaTermino){
            const aux = fechaInicio;
            fechaInicio = fechaTermino;
            fechaTermino = aux;
        }

        const aux  = fechaInicio;
        while(aux.getTime() <= fechaTermino.getTime()){
            folios.push(getFolio(aux));
            aux.setTime(aux.getTime() + 1000*60*30);
        }
        if(onGenerar!=undefined && onGenerar!= null)
            onGenerar(tarjetas[formulario.tarjeta].nombre,folios,formulario.sensores,formulario.secciones);

    }

    const seleccionar = (estado)=>{
        const sensores = formulario.sensores;
        sensores.forEach((sensor)=>{
            sensor.valor = estado;
        });        
        setFormulario({...formulario,sensores});
    }

    return (
        <CCard className="shadow">
            <CCardHeader className="contenedor-cabecera">
                <h4 className="m-0">Reportes</h4>
            </CCardHeader>
            <CCardBody className="px-5 py-5">
                <form onSubmit={generar}>                                    
                    <div className="form-group">
                        <label htmlFor="tarjeta" className="mb-1"><h4>Tarjeta</h4></label>      
                        <select id="tarjeta" className="form-control" onChange={(e)=>editar(e,0)} value={tarjetas[formulario.tarjeta].nombre}>
                            {
                                tarjetas.map((tarjeta, i)=>{
                                    return <option key={"tarjeta"+i} value={tarjeta.nombre}>{tarjeta.nombre}</option>
                                })
                            }
                        </select>      
                    </div>
                    <label htmlFor="inicio" className="mb-1"><h4>Inicio</h4></label>
                    <div id="inicio" className="form-row">
                        <div className="col">
                            <input type="date" className="form-control" onChange={(e)=>editar(e,1)} value={formulario.inicio.fecha} max = {hoy}/>
                        </div>
                        <div className="col">
                            <select className="form-control" onChange={(e)=>editar(e,2)} value={formulario.inicio.bloque}>
                                {
                                    formulario.bloques.map((bloque, i)=>{
                                        return <option key={"inicio"+i} value={bloque}>{bloque}</option>
                                    })
                                }
                            </select>
                        </div>                        
                    </div>
                    <label htmlFor="termino" className="mt-4 mb-1"><h4>Termino</h4></label>
                    <div id="termino" className="form-row">
                        <div className="col">
                            <input type="date" className="form-control" onChange={(e)=>editar(e,3)} value={formulario.termino.fecha} max={hoy}/>
                        </div>
                        <div className="col">
                            <select className="form-control" onChange={(e)=>editar(e,4)} value={formulario.termino.bloque}>
                                {
                                    formulario.bloques.map((bloque, i)=>{
                                        return <option key={"termino"+i} value={bloque}>{bloque}</option>
                                    })
                                }
                            </select>
                        </div>                        
                    </div>
                    
                    <details>
                        <summary className="mt-4">
                            <h4 className="d-inline-block">Configuración avanzada</h4>
                        </summary>
                        <div className="ml-5">
                            <label htmlFor="secciones" className="mt-4 mb-1"><h4>Secciones</h4></label>                        
                            <div id="secciones" className="form-row">
                                <div className="col-md-2 form-check">
                                    <input type="checkbox" className="form-check-input" checked={formulario.secciones.general} onChange={(e)=>editar(e,5)}/>
                                    <label className="form-check-label">General</label>                                    
                                </div>                          
                                <div className="col-md-2 form-check">
                                    <input type="checkbox" className="form-check-input" checked={formulario.secciones.bloques} onChange={(e)=>editar(e,6)}/>
                                    <label className="form-check-label">Bloques</label>                                    
                                </div>                          
                            </div>
                            <label htmlFor="sensores" className="mt-4 mb-1"><h4>Sensores</h4></label>                        
                            <div id="sensores" className="form-row">
                                {
                                    formulario.sensores.map((sensor, i)=>{
                                        return <div className="col-md-4 form-check" key={"formulario"+i}>
                                            <input type="checkbox" className="form-check-input" checked={sensor.valor} onChange={(e)=>editar(e,7+i)}/>
                                            <label className="form-check-label">{sensor.nombre}</label>                                    
                                        </div>
                                    })
                                }
                                <div className="col-12 mt-4">
                                    <div className="row seleccionar">
                                        <div className="col px-1">
                                            <a className="btn btn-seleccionar" onClick={()=>seleccionar(true)}>Seleccionar</a>
                                        </div>
                                        <div className="col px-1">
                                            <a className="btn btn-seleccionar" onClick={()=>seleccionar(false)}>Deseleccionar</a>
                                        </div>
                                    </div>                                
                                </div>
                            </div>                    
                        </div>
                    </details>

                    <div className="contenedor-btn mt-5">
                        <button type="submit" className="btn btn-generar">
                            <h4>Generar</h4>
                        </button>
                    </div>
                </form>
            </CCardBody>
        </CCard>
    );
}


export default FormularioReporte;