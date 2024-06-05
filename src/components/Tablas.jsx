import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Tabla.css";

export default function Tablas() {
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [subcriterios, setSubcriterios] = useState([]);
  const [selectedSubcriterio, setSelectedSubcriterio] = useState("");
  const [filters, setFilters] = useState({
    nro: "",
    nombre: "",
    fecha: ""
  });
  
  useEffect(() => {
    const obtenerDocumentos = async () => {
      const message = localStorage.getItem('navMessage');

      try {
        const response = await fetch(`http://localhost:8080/documentos/${message}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("El servidor no respondio correctamente");
        }
        const data = await response.json();
        setDocumentos(data);
        setFilteredDocumentos(data);

        const idcriteriomayor = message.split("/").pop();
        const subcriteriosResponse = await fetch(`http://localhost:8080/tipocriterio/vercriterio/criteriomayor/${idcriteriomayor}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!subcriteriosResponse.ok) {
          throw new Error("Error al obtener subcriterios");
        }
        const subcriteriosData = await subcriteriosResponse.json();
        setSubcriterios(subcriteriosData);
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };

    obtenerDocumentos();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = documentos;
      if (filters.nro) {
        filtered = filtered.filter(doc => doc.nrodoc.includes(filters.nro));
      }
      if (filters.nombre) {
        filtered = filtered.filter(doc => doc.titulo.toLowerCase().includes(filters.nombre.toLowerCase()));
      }
      if (filters.fecha) {
        filtered = filtered.filter(doc => doc.fecha.includes(filters.fecha));
      }
      if (selectedSubcriterio) {
        filtered = filtered.filter(doc => doc.tipocriterio === selectedSubcriterio);
      }
      setFilteredDocumentos(filtered);
    };
    applyFilters();
  }, [filters, documentos, selectedSubcriterio]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubcriterioChange = (e) => {
    setSelectedSubcriterio(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      nro: "",
      nombre: "",
      fecha: ""
    });
    setSelectedSubcriterio("");
  };

  useEffect(() => {
    const handlePopState = () => {
      localStorage.setItem('navMessage', "verdocumento/");
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSaveIdAndRedirect = (id) => {
    localStorage.setItem('documentId', id);
    navigate('/verpdf');
  };

  return (
    <div>
      <div className="container mt-5 text-center">
        <h1 className="title">Archivo General Universitario - UNSM</h1>
      </div>
      <div className="container mt-5">
        <div className="filters-container">
          <div className="filters">
            <input
              type="text"
              name="nro"
              placeholder="Filtrar por NRO"
              value={filters.nro}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="nombre"
              placeholder="Filtrar por Nombre de Documento"
              value={filters.nombre}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="fecha"
              placeholder="Filtrar por Fecha"
              value={filters.fecha}
              onChange={handleFilterChange}
            />
            <select
              name="subcriterio"
              value={selectedSubcriterio}
              onChange={handleSubcriterioChange}
              className="dropdown"
            >
              <option value="">Seleccionar Subcriterio</option>
              {subcriterios.map(subcriterio => (
                <option key={subcriterio.mainid} value={subcriterio.criteryname}>
                  {subcriterio.criteryname}
                </option>
              ))}
            </select>
            <button
              onClick={clearFilters}
              className="button"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th scope="col">NRO:</th>
              <th scope="col">Titulo:</th>
              <th scope="col">Fecha:</th>
              <th scope="col">Enlace:</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocumentos.map((documento) => (
              <tr key={documento.nrodoc}>
                <td>{documento.nrodoc}</td>
                <td>{documento.titulo}</td>
                <td>{documento.fecha}</td>
                <td>
                  <button onClick={() => handleSaveIdAndRedirect(documento.nrodoc)}>
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
