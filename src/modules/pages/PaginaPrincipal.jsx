import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/PaginaPrincipal.css";

export function PaginaPrincipal() {
  const navigate = useNavigate();

  const handleNavigation = (href, message) => {
    localStorage.setItem("navMessage", message);
    navigate(href);
    if (href === "/resoluciones") {
      window.location.reload();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">
              VIDEO - PORTAL TRANSPARENCIA ESTÁNDAR (PTE)
            </h1>
            <iframe
              title="Portal de Transparencia Estándar (PTE)"
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/ma6nSPSYJGk?feature=oembed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-4"
            ></iframe>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">
              ¿QUÉ INFORMACIÓN ENCONTRARÁS?
            </h1>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    handleNavigation("/resoluciones", "verresolucion/")
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-left"
                >
                  Resoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/grados")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full mt-2 text-left"
                >
                  Grados y Títulos
                </button>
              </li>
              <li className="mt-2">Planeamiento y organización</li>
              <li>Personal</li>
              <li>Acceso a la Información Pública</li>
              <li>Registro de visitas</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">
              EL DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA
            </h1>
            <iframe
              title="EL DERECHO DE ACCESO A LA INFORMACIÓN PÚBLICA"
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/2LlYa7MElbU?feature=oembed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-4"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
