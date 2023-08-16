import React from "react";
import { CFooter } from "@coreui/react";
import Logo_Azul from "../assets/img/Logo.svg";
import Flogo_Logo from "../assets/img/Flogo_Logo.svg";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <img src={Logo_Azul} alt= "logo_visormapx" className="footer-logo" />
        </a>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">
          <p style={{ display: "inline-block" }}>Powered by</p>
        </span>
        <a
          href="https://grupoflogo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Flogo_Logo}  alt= "logo_flogo" className="footer-flogo"/>
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
