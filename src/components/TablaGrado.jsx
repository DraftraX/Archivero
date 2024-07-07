import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Tabla.css";

export default function Tablas() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [filters, setFilters] = useState({
    nombreapellido: "",
    dni: "",
    fechaexpedicion: "",
    facultadescuela: "",
    gradotitulo: "",
  });

  // Obtención de documentos desde la API
  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/gradotitulos/vergradotitulo/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("El servidor no respondió correctamente");
        }
        const data = await response.json();
        setDocumentos(data);
        setFilteredDocumentos(data);
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };

    obtenerDocumentos();
  }, [token]);

  // Aplicar filtros
  useEffect(() => {
    const applyFilters = () => {
      let filtered = documentos;

      if (filters.nombreapellido) {
        filtered = filtered.filter(doc =>
          doc.nombreapellido.toLowerCase().includes(filters.nombreapellido.toLowerCase())
        );
      }

      if (filters.dni) {
        filtered = filtered.filter(doc => doc.dni.includes(filters.dni));
      }

      if (filters.fechaexpedicion) {
        filtered = filtered.filter(doc => doc.fechaexpedicion.includes(filters.fechaexpedicion));
      }

      if (filters.facultadescuela) {
        filtered = filtered.filter(doc =>
          doc.facultadescuela.toLowerCase().includes(filters.facultadescuela.toLowerCase())
        );
      }

      if (filters.gradotitulo) {
        filtered = filtered.filter(doc =>
          doc.gradotitulo.toLowerCase().includes(filters.gradotitulo.toLowerCase())
        );
      }

      setFilteredDocumentos(filtered);
    };

    applyFilters();
  }, [filters, documentos]);

  // Manejo de cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar filtros
  const clearFilters = () => {
    setFilters({
      nombreapellido: "",
      dni: "",
      fechaexpedicion: "",
      facultadescuela: "",
      gradotitulo: ""
    });
  };

  // Guardar ID del documento y redirigir
  const handleSaveIdAndRedirect = (id) => {
    localStorage.setItem('documentId', id);
    navigate('/vergrado');
  };

  return (
    <div>
      <div className="container mt-5 text-center">
        <h1 className="title">Grados y Títulos</h1>
      </div>
      <div className="container mt-5">
        <div className="filters-container">
          <div className="filters">
            <input
              type="text"
              name="nombreapellido"
              placeholder="Filtrar por Nombre y Apellido"
              value={filters.nombreapellido}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="dni"
              placeholder="Filtrar por DNI"
              value={filters.dni}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="fechaexpedicion"
              placeholder="Filtrar por Fecha de Expedición"
              value={filters.fechaexpedicion}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="facultadescuela"
              placeholder="Filtrar por Facultad o Escuela"
              value={filters.facultadescuela}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="gradotitulo"
              placeholder="Filtrar por Grado o Título"
              value={filters.gradotitulo}
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
              <th scope="col">Nombre y Apellido</th>
              <th scope="col">DNI</th>
              <th scope="col">Fecha de Expedición</th>
              <th scope="col">Facultad o Escuela</th>
              <th scope="col">Grado o Título</th>
              <th scope="col">Enlace</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocumentos.map((documento) => (
              <tr key={documento.idgradotitulo}>
                <td>{documento.nombreapellido}</td>
                <td>{documento.dni}</td>
                <td>{documento.fechaexpedicion}</td>
                <td>{documento.facultadescuela}</td>
                <td>{documento.gradotitulo}</td>
                <td>
                  <button onClick={() => handleSaveIdAndRedirect(documento.idgradotitulo)}>
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
