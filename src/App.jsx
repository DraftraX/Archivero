import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IniciarSesion } from "./modules/pages/IniciarSesion";
import { RestablecerContrasena } from "./modules/pages/RestablecerContrasena";
import { CrearUsuario } from "./modules/pages/CrearUsuario";
import { PanelPrincipal } from "./modules/pages/PanelPrincipal";
import { PaginaPrincipal } from "./modules/pages/PaginaPrincipal";
import { VistaResoluciones } from "./modules/pages/VistaResoluciones";
import { PerfilUsuario } from "./modules/pages/PerfilUsuario"; 
import { CrearResolucion } from "./modules/pages/CrearResolucion";
import { VerResolucion } from "./modules/pages/VerResolucion";
import { NuevaContrasena } from "./modules/pages/NuevaContrasena";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* ruta inicial */}
          <Route path="/" element={<Navigate to="/panelprincipal" />} />

          {/* Rutas protegidas */}
          <Route path="/paginaprincipal" element={<PrivateRoute><PaginaPrincipal /></PrivateRoute>} />
          <Route path="/resoluciones" element={<PrivateRoute><VistaResoluciones /></PrivateRoute>} />
          <Route path="/verresolucion" element={<PrivateRoute><VerResolucion /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilUsuario /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CrearUsuario /></PrivateRoute>} />
          <Route path="/createresolucion" element={<PrivateRoute><CrearResolucion/></PrivateRoute>} />
          
          {/* demas rutas */}
          <Route path="/login" element={<IniciarSesion />} /> 
          <Route path="/restore" element={<RestablecerContrasena />} />
          <Route path="/newpassword" element={<NuevaContrasena />} />
          <Route path="/panelprincipal" element={<PanelPrincipal />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
