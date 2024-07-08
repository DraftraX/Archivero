import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Button, Table, Pagination } from "antd";
import classNames from "classnames";
import "../styles/Tabla.css";

const { Option } = Select;

export default function Tablas() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [subcriterios, setSubcriterios] = useState([]);
  const [selectedSubcriterio, setSelectedSubcriterio] = useState("");
  const [filters, setFilters] = useState({
    nro: "",
    nombre: "",
    fecha: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Número de elementos por página

  useEffect(() => {
    const obtenerDocumentos = async () => {
      const message = localStorage.getItem("navMessage");

      try {
        const response = await fetch(
          `http://localhost:8080/resolucion/${message}`,
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

        const idcriteriomayor = message.split("/").pop();
        const subcriteriosResponse = await fetch(
          `http://localhost:8080/tipocriterio/vercriterio/criteriomayor/${idcriteriomayor}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  }, [token]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = documentos;

      if (filters.nro) {
        filtered = filtered.filter((doc) => doc.nrodoc.includes(filters.nro));
      }

      if (filters.nombre) {
        filtered = filtered.filter((doc) =>
          doc.titulo.toLowerCase().includes(filters.nombre.toLowerCase())
        );
      }

      if (filters.fecha) {
        filtered = filtered.filter((doc) => doc.fecha.includes(filters.fecha));
      }

      if (selectedSubcriterio) {
        filtered = filtered.filter(
          (doc) => doc.tipocriterio === selectedSubcriterio
        );
      }

      setFilteredDocumentos(filtered);
    };

    applyFilters();
  }, [filters, documentos, selectedSubcriterio]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubcriterioChange = (value) => {
    setSelectedSubcriterio(value);
  };

  const clearFilters = () => {
    setFilters({
      nro: "",
      nombre: "",
      fecha: "",
    });
    setSelectedSubcriterio("");
  };

  useEffect(() => {
    const handlePopState = () => {
      localStorage.setItem("navMessage", "verresolucion/");
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSaveIdAndRedirect = (id) => {
    localStorage.setItem("documentId", id);
    navigate("/verresolucion");
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "NRO:",
      dataIndex: "nrodoc",
      key: "nrodoc",
      width: 100,
    },
    {
      title: "Título:",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Fecha:",
      dataIndex: "fecha",
      key: "fecha",
      width: 150,
    },
    {
      title: "Enlace:",
      key: "enlace",
      width: 100,
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleSaveIdAndRedirect(record.nrodoc)}
          className="rounded-md"
        >
          Ver
        </Button>
      ),
    },
  ];

  // Calcular el índice de inicio y fin de los documentos a mostrar en la página actual
  const indexOfLastDoc = currentPage * pageSize;
  const indexOfFirstDoc = indexOfLastDoc - pageSize;
  const currentDocs = filteredDocumentos.slice(indexOfFirstDoc, indexOfLastDoc);

  return (
    <div className="container mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Archivo General Universitario - UNSM
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <Input
          name="nro"
          placeholder="Filtrar por NRO"
          value={filters.nro}
          onChange={handleFilterChange}
          className="col-span-1"
        />
        <Input
          name="nombre"
          placeholder="Filtrar por Nombre de Documento"
          value={filters.nombre}
          onChange={handleFilterChange}
          className="col-span-1"
        />
        <Input
          name="fecha"
          placeholder="Filtrar por Fecha"
          value={filters.fecha}
          onChange={handleFilterChange}
          className="col-span-1"
        />
        <Select
          placeholder="Seleccionar Subcriterio"
          value={selectedSubcriterio}
          onChange={handleSubcriterioChange}
          className="col-span-1"
        >
          {subcriterios.map((subcriterio) => (
            <Option key={subcriterio.mainid} value={subcriterio.criteryname}>
              {subcriterio.criteryname}
            </Option>
          ))}
        </Select>
        <Button onClick={clearFilters} className="col-span-1">
          Limpiar Filtros
        </Button>
      </div>
      <Table
        dataSource={currentDocs}
        columns={columns}
        rowKey="nrodoc"
        className="custom-table"
        pagination={false} // Desactiva la paginación de Ant Design
      />
      <Pagination
        className="mt-4"
        current={currentPage}
        total={filteredDocumentos.length}
        pageSize={pageSize}
        onChange={handleChangePage}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </div>
  );
}
