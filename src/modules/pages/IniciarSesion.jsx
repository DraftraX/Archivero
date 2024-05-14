import React from "react";
import { Inputs } from "../../components/inputs";
import { Link } from "react-router-dom";

export function IniciarSesion() {
  return (
    <div className="grid justify-center">
      <Inputs />
      <Link to="/panelprincipal">Iniciar Sesion</Link>
    </div>
  );
}
