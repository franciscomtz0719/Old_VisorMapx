import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { TheLayout } from ".";

export const PrivateRoute = ({
  ...rest //resto de componentes como el path
}) => {
  const [enable, setEnable] = useState(localStorage.getItem("isAutehenticated") === "true")
  useEffect(()=>{
    setEnable(localStorage.getItem("isAutehenticated") === "true");
  },[]);
  return (
        enable ? <TheLayout {...rest} /> : <Redirect to="/landpage" />
  );
};