const direccion = "https://mapxbackend.appsflogo.com/api/";

export const getTokenUsuario = async (nameUser, pass) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "gettoken",
      usuario: nameUser,
      pass: pass,
    }),
  });
  const respuesta = await resp.json();
  return respuesta;
};

export const getDataUsuario = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getdata",
      token: token,
    }),
  });
  const respuesta = await resp.json();
  return respuesta;
};

export const getSesion = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    credentials: "include",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getsesion",
      token: token,
    }),
  });
  const respuesta = await resp.json();
  return respuesta;
};
export const getEmpresa = async (tarjetaid, token) => {
  const resp = await fetch(direccion + "empresas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getempresa",
      tarjetaid: tarjetaid,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const updateSesion = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "updatesesion",
      token: token,
    }),
  });
  const respuesta = await resp.json();
  return respuesta;
};

export const deleteSesion = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "deletesesion",
      token: token,
    }),
  });
  const respuesta = await resp.json();
  return respuesta;
};

export const getUserAPI = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getusuario",
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getServiciosAPI = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getservicios",
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getRecursosAPI = async (nombre, token) => {
  const resp = await fetch(direccion + "tarjetas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getrecursos",
      nombre,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getPaquetesAPI = async (str_sensores, token, cantidad = 5) => {
  const resp = await fetch(direccion + "tarjetas/paquetes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getpaquetes",
      direcciones: str_sensores,
      cantidad,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getLandmarksAPI = async (str_sensores, token, cantidad = 5) => {
  const resp = await fetch(direccion + "tarjetas/landmarks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getlandmarks",
      direcciones: str_sensores,
      cantidad,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getPeligrosidadAPI = async (str_sensores, token, cantidad = 5) => {
  const resp = await fetch(direccion + "tarjetas/peligrosidad", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getpeligrosidad",
      direcciones: str_sensores,
      cantidad,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getSensores = async (nombreTarjeta, token) => {
  const resp = await fetch(direccion + "tarjetas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getsensores",
      nombre: nombreTarjeta,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};
export const getTarjeta = async (nombreTarjeta, token) => {
  const resp = await fetch(direccion + "tarjetas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "gettarjeta",
      nombre: nombreTarjeta,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getTarjetaEstadistica = async (nombreTarjeta, token) => {
  const resp = await fetch(direccion + "tarjetas/estadisticas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getestadisticas",
      direcciones: nombreTarjeta,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();

  return respuesta;
};

export const getSensoresPorIndice = async (direcciones, token) => {
  const resp = await fetch(direccion + "tarjetas/paquetes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getpaquetes",
      direcciones: [direcciones],
      token: token,
    }),
  });
  const { respuesta } = await resp.json();

  return respuesta;
};

export const getAlertasAPI = async (token) => {
  const resp = await fetch(direccion + "alertas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getalertas",
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const putAlertaAPI = async (id, token) => {
  const resp = await fetch(direccion + "alertas", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "setvista",
      id,
      token,
    }),
  });
  console.log(resp);
};

export const getElementosPaquetesApi = async (
  direcciones,
  token,
  cantidad = 1
) => {
  const resp = await fetch(direccion + "elementos/paquetes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getpaquetes",
      direcciones: direcciones,
      cantidad,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getElementosByToken = async (token) => {
  const resp = await fetch(direccion + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getrecursos",
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getBase = async (token) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getbase",
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getElementoById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getelemento",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

//PENDIENDTE
export const getElementosByIds = async (token, idElementos) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getelemento",
      id: idElementos,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getDataById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getdata",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getDataByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getdata",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getUbicacionById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getubicacion",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getUbicacionByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getubicacion",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getVariablesById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getvariables",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getVariablesByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getvariables",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getGraficasById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getgraficas",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getGraficasByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getgraficas",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getRecursosById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getrecursos",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getRecursosByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getrecursos",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getConfiguracionById = async (token, id) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getconfiguracion",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getConfiguracionByIds = async (token, ids) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getconfiguracion",
      id: ids,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getInterpretaciones = async (token, direcciones) => {
  const resp = await fetch(direccion + "elementos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getinterpretacion",
      id: direcciones,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getProyectoById = async (token, id) => {
  const resp = await fetch(direccion + "proyectos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getproyecto",
      id: id,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getProyectoByIds = async (token, idProyectos) => {
  const resp = await fetch(direccion + "proyectos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getproyecto",
      id: idProyectos,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getProyectosPaquetesApi = async (
  direcciones,
  token,
  cantidad = 1
) => {
  const resp = await fetch(direccion + "proyectos/paquetes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getpaquetes",
      direcciones: direcciones,
      cantidad,
      token,
    }),
  });
  const { respuesta } = await resp.json();
  return respuesta;
};

export const getReporte = async (tarjetanombre,folios,token) => {
  const resp = await fetch(direccion + "tarjetas/reportes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operacion: "getreportes",
      tarjetanombre: tarjetanombre,
      folios:folios,
      token: token,
    }),
  });
  const { respuesta } = await resp.json();

  return respuesta;
};
