import React from "react";
import Alertas from "./vistas/alertas/Alertas";
// import Charts from "./views/charts/Charts";

// General
const Dashboard = React.lazy(() => import("./vistas/dashboard/Dashboard"));
const Reportes = React.lazy(() => import("./vistas/reportes/Reportes"));

//Tarjetas
const Panel = React.lazy(() => import('./vistas/tarjetas/panel/Panel'));
const Informacion = React.lazy(() => import('./vistas/tarjetas/informacion/Informacion'));
const Configuracion = React.lazy(() => import('./vistas/tarjetas/configuracion/Configuraciones')); 
const Layout = React.lazy(() => import('./vistas/tarjetas/graficas/Layout'));
const Estadisticas = React.lazy(() => import('./vistas/tarjetas/estadisticas/Estadisticas'));

// Elementos
const ElementosPanel = React.lazy(() =>
  import("./vistas/elementos/panel_elementos/ElementosPanel")
);
const ElementosInformacion = React.lazy(() =>
  import("./vistas/elementos/informacion_elementos/ElementosInformacion")
);
const ElementosConfiguracion = React.lazy(() =>
  import("./vistas/elementos/configuracion_elementos/ElementosConfiguracion")
);
const ElementosLayout = React.lazy(() =>
  import("./vistas/elementos/graficas_elementos/ElementosLayout")
);
const ElementosEstadistica = React.lazy(() =>
  import("./vistas/elementos/estadistica_elementos/ElementosEstadistica")
);

// Proyectos
const ProyectosPanel = React.lazy(() =>
  import("./vistas/proyectos/panel_proyectos/ProyectosPanel")
);
const ProyectosInformacion = React.lazy(() =>
  import("./vistas/proyectos/informacion_proyectos/ProyectosInformacion")
);
const ProyectosElementos = React.lazy(() =>
  import("./vistas/proyectos/elementos_proyectos/ProyectosElementos")
);
const ProyectosConfiguracion = React.lazy(() =>
  import("./vistas/proyectos/configuracion_proyectos/ProyectosConfiguracion")
);
const ProyectosLayout = React.lazy(() =>
  import("./vistas/proyectos/graficas_proyectos/ProyectosLayout")
);
const ProyectosEstadistica = React.lazy(() =>
  import("./vistas/proyectos/estadistica_proyectos/ProyectosEstadistica")
);

//Rutas
const routes = [
  
  { path: '/', exact: true, name: 'Home', component: Dashboard  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  { path: '/tarjetas', name: 'Tarjetas', component: Panel, exact: true },
  { path: '/tarjetas/:nombreTarjeta', name: 'Tarjeta', component: Informacion, exact: true },
  { path: '/tarjetas/:nombreTarjeta/informacion', name: 'Información', component: Informacion },
  { path: '/tarjetas/:nombreTarjeta/configuracion', name: 'Configuracion', component: Configuracion },
  { path: '/tarjetas/:nombreTarjeta/graficas', name: 'Graficas', component: Layout },
  { path: '/tarjetas/:nombreTarjeta/estadistica', name: 'Estadistica', component: Estadisticas },
  
  { path: '/elementos', name: 'Elementos', component: ElementosPanel, exact: true },
  { path: '/elementos/:idElemento', name: 'Elemento', component: ElementosInformacion, exact: true },
  { path: '/elementos/:idElemento/informacion', name: 'Información', component: ElementosInformacion },
  { path: '/elementos/:idElemento/configuracion', name: 'Configuracion', component: ElementosConfiguracion },
  { path: '/elementos/:idElemento/graficas', name: 'Graficas', component: ElementosLayout },
  { path: '/elementos/:idElemento/estadistica', name: 'Estadistica', component: ElementosEstadistica },
  
  { path: '/proyectos', name: 'Proyectos', component: ProyectosPanel, exact: true },
  { path: '/proyectos/:idProyecto', name: 'Proyecto', component: ProyectosInformacion, exact: true },
  { path: '/proyectos/:idProyecto/informacion', name: 'Información', component: ProyectosInformacion },
  { path: '/proyectos/:idProyecto/graficas', name: 'Graficas', component: ProyectosLayout },
  { path: '/proyectos/:idProyecto/configuracion', name: 'Configuracion', component: ProyectosConfiguracion },
  { path: '/proyectos/:idProyecto/estadistica', name: 'Estadistica', component: ProyectosEstadistica },
  { path: '/proyectos/:idProyecto/elementos', name: 'Elementos', component: ProyectosElementos, exact: true  },
  { path: '/proyectos/:idProyecto/elementos/:idElemento', name: 'Elemento', component: ElementosInformacion, exact: true },
  { path: '/proyectos/:idProyecto/elementos/:idElemento/informacion', name: 'Informacion', component: ElementosInformacion },
  { path: '/proyectos/:idProyecto/elementos/:idElemento/configuracion', name: 'Configuracion', component: ElementosConfiguracion },
  { path: '/proyectos/:idProyecto/elementos/:idElemento/graficas', name: 'Graficas', component: ElementosLayout },
  { path: '/proyectos/:idProyecto/elementos/:idElemento/estadistica', name: 'Estadistica', component: ElementosEstadistica },
  
  { path: '/alertas', name:'Alertas', component: Alertas},
  { path: '/reportes', name:'Reportes', component: Reportes},
  
];

export default routes;
