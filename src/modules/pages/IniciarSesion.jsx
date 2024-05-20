import React from "react";
import { Username, Password } from "../../components/Input";
import { Link } from "react-router-dom";
import "../../styles/IniciarSesion.css";

export function IniciarSesion() {
  return (
    <form className="Login bg-green-400">
      <div className="formato grid grid-cols-2 bg-gray-100 mx-20">
        <div className="h-full">
          <img
            className="h-full"
            src="https://unsm.edu.pe/wp-content/uploads/2018/05/archivero-unsm-2018.jpg"
          />
        </div>
        <div className="form">
          <h2 className="text-center pb-6">ARCHIVERO CENTRAL</h2>
          <Username />
          <Password />
          <Link to={"#"}>
            <h3 className="text-end pb-5">¿Olvidaste tu contraseña?</h3>
          </Link>
          <div className="px-4">
            <Link to={"/panelprincipal"}>
              <button className="boton bg-green-400 p-5">Iniciar Sesion</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
