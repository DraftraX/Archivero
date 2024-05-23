import React, { useEffect, useState } from "react";
import "../styles/Tabla.css";

export default function Tablas() {
  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [filters, setFilters] = useState({
    nro: "",
    nombre: "",
    fecha: ""
  });

  useEffect(() => {
    const obtenerDocumentos = async () => {
      const token = localStorage.getItem('token');
      const message = localStorage.getItem('navMessage');

      try {
        const response = await fetch(`http://localhost:8080/documentos/${message}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("El servidor no respondio correctamente");
        }
        const data = await response.json();
        console.log(data);
        setDocumentos(data);
        setFilteredDocumentos(data);
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
      setFilteredDocumentos(filtered);
    };
    applyFilters();
  }, [filters, documentos]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      nro: "",
      nombre: "",
      fecha: ""
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      localStorage.setItem('navMessage', "verdocumentos");
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
                <td>N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
