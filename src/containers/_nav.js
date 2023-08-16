const LARGO_MAXIMO = 28;

export const _nav = (servicios, tarjetas, elementos, proyectos) => {
  if (servicios === undefined) return;

  // Tarjetas
  const sidebar_tarjetas = [];
  tarjetas.forEach((tarjeta) => {
    if (tarjeta.length > LARGO_MAXIMO)
      tarjeta = tarjeta.substring(0, LARGO_MAXIMO - 3) + "...";
    const tarjeta_servicios = [
      {
        _tag: "CSidebarNavItem",
        name: "Información",
        to: `/tarjetas/${tarjeta}/informacion`,
      },
    ];
    servicios.forEach((servicio) => {
      switch (servicio) {
        case "TGI":
          tarjeta_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Graficas",
            to: `/tarjetas/${tarjeta}/graficas`,
          });
          break;
        case "TE":
          tarjeta_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Estadistica",
            to: `/tarjetas/${tarjeta}/estadistica`,
          });
          break;
        case "TC":
          tarjeta_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Configuración",
            to: `/tarjetas/${tarjeta}/configuracion`,
          });
          break;
        default:
          break;
      }
    });
    if (tarjeta_servicios.length > 1) {
      const sidebar_tarjeta = {
        _tag: "CSidebarNavDropdown",
        name: `${tarjeta}`,
        route: `/tarjetas/${tarjeta}`,
        _children: tarjeta_servicios,
      };
      sidebar_tarjetas.push(sidebar_tarjeta);
    }
  });

  // Elementos
  const sidebar_elementos = [];
  elementos.forEach((elemento) => {
    if (elemento.nombre.length > LARGO_MAXIMO)
      elemento.nombre = elemento.nombre.substring(0, LARGO_MAXIMO - 3) + "...";

    const elemento_servicios = [
      {
        _tag: "CSidebarNavItem",
        name: "Información",
        to: `/elementos/${elemento.id}/informacion`,
      },
    ];

    servicios.forEach((servicio) => {
      switch (servicio) {
        case "EGI":
          elemento_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Graficas",
            to: `/elementos/${elemento.id}/graficas`,
          });
          break;

        case "EE":
          elemento_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Estadistica",
            to: `/elementos/${elemento.id}/estadistica`,
          });
          break;

        case "EC":
          elemento_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Configuración",
            to: `/elementos/${elemento.id}/configuracion`,
          });
          break;

        default:
          break;
      }
    });

    if (elemento_servicios.length > 1) {
      const sidebar_elemento = {
        _tag: "CSidebarNavDropdown",
        name: `${elemento.nombre}`,
        route: `/elementos/${elemento.id}`,
        _children: elemento_servicios,
      };
      sidebar_elementos.push(sidebar_elemento);
    }
  });

  // Proyectos
  const sidebar_proyectos = [];
  proyectos.forEach((proyecto) => {
    if (proyecto.nombre.length > LARGO_MAXIMO)
      proyecto.nombre = proyecto.nombre.substring(0, LARGO_MAXIMO - 3) + "...";

    const proyecto_servicios = [
      {
        _tag: "CSidebarNavItem",
        name: "Información",
        to: `/proyectos/${proyecto.id}/informacion`,
      }
    ];

    servicios.forEach((servicio) => {
      switch (servicio) {
        case "PE":
          proyecto_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Estadistica",
            to: `/proyectos/${proyecto.id}/estadistica`,
          });
          break;
        case "PC":
          proyecto_servicios.push({
            _tag: "CSidebarNavItem",
            name: "Configuración",
            to: `/proyectos/${proyecto.id}/configuracion`,
          });
          break;
        default:
          break;
        }
    });
    proyecto_servicios.push({
      _tag: "CSidebarNavItem",
      name: "Elementos",
      to: `/proyectos/${proyecto.id}/elementos`,
    });

    if (proyecto_servicios.length > 1) {
      const sidebar_proyecto = {
        _tag: "CSidebarNavDropdown",
        name: `${proyecto.nombre}`,
        route: `/proyectos/${proyecto}`,
        _children: proyecto_servicios,
      };
      if(servicios.includes("PGI") || servicios.includes("PGII") || servicios.includes("PC")  || servicios.includes("PE"))
        sidebar_proyectos.push(sidebar_proyecto);
    }
    
  });

  const sidebar = [
    {
      _tag: "CSidebarNavTitle",
      _children: ["Menu"],
    },
    {
      _tag: "CSidebarNavItem",
      name: "Dashboard",
      to: "/dashboard",
      icon: "cil-layers",
    },
  ];

  if (sidebar_proyectos.length > 0) {
    sidebar.push({
      _tag: "CSidebarNavItem",
      name: "Proyectos",
      to: "/proyectos",
      icon: "cil-industry",
      // _children: sidebar_proyectos,
    });
  }
  if (sidebar_elementos.length > 0) {
    sidebar.push({
      _tag: "CSidebarNavItem",
      name: "Elementos",
      to: "/elementos",
      icon: "cil-input-hdmi"
    });
  }
  if (sidebar_tarjetas.length > 0)
    sidebar.push({
      _tag: "CSidebarNavItem",
      name: "Tarjetas",
      to: "/tarjetas",
      icon: "cil-memory",
      // _children: sidebar_tarjetas,
    });
  if (servicios.includes("AI") || servicios.includes("AII")) {
    sidebar.push({
      _tag: "CSidebarNavItem",
      name: "Alertas",
      to: "/alertas",
      icon: "cil-bell",
    });
  }
  if (servicios.includes("RE")) {
    sidebar.push({
      _tag: "CSidebarNavItem",
      name: "Reportes",
      to: "/reportes",
      icon: "cil-clipboard",
    });
  }

  return sidebar;
};
