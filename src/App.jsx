import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IniciarSesion } from "./modules/pages/IniciarSesion";
import { RestablecerContrasena } from "./modules/pages/RestablecerContrasena";
import { CrearUsuario } from "./modules/pages/CrearUsuario";
import { PanelPrincipal } from "./modules/pages/PanelPrincipal";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* ruta inicial */}
          <Route path="/" element={<Navigate to="/panelprincipal" />} />

          {/* demas rutas */}
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/register" element={<RestablecerContrasena />} />
          <Route path="/create" element={<CrearUsuario />} />
          <Route path="/panelprincipal" element={<PanelPrincipal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
