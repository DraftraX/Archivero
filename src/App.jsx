import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IniciarSesion } from "./modules/pages/IniciarSesion";
import { RestablecerContrasena } from "./modules/pages/RestablecerContrasena";
import { CrearUsuario } from "./modules/pages/CrearUsuario";
import { PanelPrincipal } from "./modules/pages/PanelPrincipal";
import { PaginaPrincipal } from "./modules/pages/PaginaPrincipal";
import { VistaTablas } from "./modules/pages/VistaTablas";
import { PerfilUsuario } from "./modules/pages/PerfilUsuario"; 
import { CrearDocumento } from "./modules/pages/CrearDocumento";
import { VerDocumento } from "./modules/pages/VerDocumento";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* ruta inicial */}
          <Route path="/" element={<Navigate to="/panelprincipal" />} />

          {/* Rutas protegidas */}
          <Route path="/restore" element={<PrivateRoute><RestablecerContrasena /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilUsuario /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CrearUsuario /></PrivateRoute>} />
          <Route path="/createdocument" element={<PrivateRoute><CrearDocumento/></PrivateRoute>} />
          
          {/* demas rutas */}
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/panelprincipal" element={<PanelPrincipal />} />
          <Route path="/paginaprincipal" element={<PaginaPrincipal />} />
          <Route path="/tablas" element={<VistaTablas />} />
          <Route path="/verpdf" element={<VerDocumento />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
