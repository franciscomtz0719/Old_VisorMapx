import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { _nav } from "./_nav";
import { getElementosByIds, getProyectoByIds } from "src/helpers/peticionesAPI";
import "./Containers.css";

const TheSidebar = ({ servicios, tarjetas, elementos, proyectos }) => {
  const token = localStorage.getItem("token");
  const [navegacion, setNavegacion] = useState([]);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  useEffect(async () => {
    const elementos_nombres = [];
    if (elementos !== undefined) {
      const elementos_info = await getElementosByIds(token, elementos);
      if (elementos_info.length > 0) {
        elementos_info.forEach((elemento) => {
          elementos_nombres.push({ nombre: elemento.nombre, id: elemento._id });
        });
      }
    }

    const proyectos_nombres = [];
    if (proyectos !== undefined) {
      const proyectos_info = await getProyectoByIds(token, proyectos);
      if (proyectos_info.length > 0) {
        proyectos_info.forEach((proyecto) => {
          proyectos_nombres.push({ nombre: proyecto.nombre, id: proyecto._id });
        });
      }
    }

    setNavegacion(
      _nav(servicios, tarjetas, elementos_nombres, proyectos_nombres)
    );
  }, [servicios]);

  return (
    <CSidebar
      className="color-fondo"
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src="media/img/logo_blanco.png"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          src={"media/img/icono.png"}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {navegacion ? (
          <CCreateElement
            items={navegacion}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        ) : undefined}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
