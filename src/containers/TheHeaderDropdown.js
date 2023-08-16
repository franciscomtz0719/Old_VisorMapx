import React, { useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from "@coreui/react";
import { Redirect } from "react-router";
import CIcon from "@coreui/icons-react";
import { deleteSesion } from "src/helpers/peticionesAPI";
import user from '../assets/icons/user.svg';

const TheHeaderDropdown = () => {
  const [redirect, setRedirect] = useState(false);
  const logout = async () => {
    const token = localStorage.getItem('token')
    await deleteSesion(token)
    localStorage.removeItem('token');
    localStorage.setItem("isAutehenticated", false);
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/landpage" />;

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src = {user}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">    
         
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
     
    </CDropdown>
  );
};

export default TheHeaderDropdown;
