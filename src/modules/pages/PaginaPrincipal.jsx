import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/PaginaPrincipal.css";

export function PaginaPrincipal() {
  const navigate = useNavigate();

  const handleNavigation = (href, message) => {
    localStorage.setItem('navMessage', message);
    navigate(href);
    if (href === "/tablas") {
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <div className="left-column">
          <h1 className="titulo">VIDEO - PORTAL TRANSPARENCIA ESTÁNDAR (PTE)</h1>
          <iframe
            title="Portal de Transparencia Estándar (PTE)"
            width="400"
            height="300"
            src="https://www.youtube.com/embed/ma6nSPSYJGk?feature=oembed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="center-column">
          <h1 className="titulo">¿QUÉ INFORMACIÓN ENCONTRARÁS?</h1>
          <ul className="info-list">
            <li>
              <button
                onClick={() => handleNavigation("/tablas", "verdocumento/")}
                className="button"
              >
                Archivos Generales
              </button>
            </li>
            <li>Planeamiento y organización</li>
            <li>Personal</li>
            <li>Acceso a la Información Pública</li>
            <li>Registro de visitas</li>
          </ul>
        </div>
        <div className="right-column">
          <h1 className="titulo">EL DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA</h1>
          <iframe
            title="EL DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA"
            width="400"
            height="300"
            src="https://www.youtube.com/embed/2LlYa7MElbU?feature=oembed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
