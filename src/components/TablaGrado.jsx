import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Table, Space } from "antd";
import "../styles/Tabla.css";
import { API_URL } from "../../url.js";

const { Column } = Table;

export default function Tablas() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [filters, setFilters] = useState({
    nombreapellido: "",
    dni: "",
    fechaexpedicion: "",
    facultadescuela: "",
    gradotitulo: "",
  });

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const response = await fetch(
          API_URL + `/gradotitulos/vergradotitulo/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = documentos;

      if (filters.nombreapellido) {
        filtered = filtered.filter((doc) =>
          doc.nombreapellido
            .toLowerCase()
            .includes(filters.nombreapellido.toLowerCase())
        );
      }

      if (filters.dni) {
        filtered = filtered.filter((doc) => doc.dni.includes(filters.dni));
      }

      if (filters.fechaexpedicion) {
        filtered = filtered.filter((doc) =>
          doc.fechaexpedicion.includes(filters.fechaexpedicion)
        );
      }

      if (filters.facultadescuela) {
        filtered = filtered.filter((doc) =>
          doc.facultadescuela
            .toLowerCase()
            .includes(filters.facultadescuela.toLowerCase())
        );
      }

      if (filters.gradotitulo) {
        filtered = filtered.filter((doc) =>
          doc.gradotitulo
            .toLowerCase()
            .includes(filters.gradotitulo.toLowerCase())
        );
      }

      setFilteredDocumentos(filtered);
    };

    applyFilters();
  }, [filters, documentos]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      nombreapellido: "",
      dni: "",
      fechaexpedicion: "",
      facultadescuela: "",
      gradotitulo: "",
    });
  };

  const handleSaveIdAndRedirect = (id) => {
    localStorage.setItem("documentId", id);
    navigate("/vergrado");
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Grados y Títulos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          name="nombreapellido"
          placeholder="Filtrar por Nombre y Apellido"
          value={filters.nombreapellido}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="dni"
          placeholder="Filtrar por DNI"
          value={filters.dni}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="fechaexpedicion"
          placeholder="Filtrar por Fecha de Expedición"
          value={filters.fechaexpedicion}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="facultadescuela"
          placeholder="Filtrar por Facultad o Escuela"
          value={filters.facultadescuela}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="gradotitulo"
          placeholder="Filtrar por Grado o Título"
          value={filters.gradotitulo}
          onChange={handleFilterChange}
        />
        <Button onClick={clearFilters} className="button">
          Limpiar Filtros
        </Button>
      </div>
      <Table dataSource={filteredDocumentos} className="custom-table">
        <Column
          title="Nombre y Apellido"
          dataIndex="nombreapellido"
          key="nombreapellido"
        />
        <Column title="DNI" dataIndex="dni" key="dni" />
        <Column
          title="Fecha de Expedición"
          dataIndex="fechaexpedicion"
          key="fechaexpedicion"
        />
        <Column
          title="Facultad o Escuela"
          dataIndex="facultadescuela"
          key="facultadescuela"
        />
        <Column
          title="Grado o Título"
          dataIndex="gradotitulo"
          key="gradotitulo"
        />
        <Column
          title="Enlace"
          key="action"
          render={(documento) => (
            <Space size="middle">
              <Button
                onClick={() => handleSaveIdAndRedirect(documento.idgradotitulo)}
              >
                Ver
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
