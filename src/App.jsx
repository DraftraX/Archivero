import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IniciarSesion } from "./modules/pages/IniciarSesion";
import { RestablecerContrasena } from "./modules/pages/RestablecerContrasena";
import { CrearUsuario } from "./modules/pages/CrearUsuario";
import { PanelPrincipal } from "./modules/pages/PanelPrincipal";
import { PaginaPrincipal } from "./modules/pages/PaginaPrincipal";

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
          <Route path="/paginaprincipal" element={<PaginaPrincipal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// function Navigatiion(){
//   return  <nav>
//     <ul>
//       <li>
//         <Link></Link>
//       </li>
//     </ul>
//   </nav>
// }

export default App;
