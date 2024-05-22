import React, { useEffect, useState } from "react";
import "../styles/Tabla.css";

export default function Tablas() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const obtenerDocumentos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:8080/documentos/verdocumentos", {
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
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };

    obtenerDocumentos();
  }, []);

  return (
    <div>
      <div className="container mt-5 text-center">
        <h1 className="title">Archivo General Universitario - UNSM</h1>
      </div>
      <div className="container mt-5">
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
            {documentos.map((documento) => (
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