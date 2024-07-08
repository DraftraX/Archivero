import React, { useEffect, useState } from "react";
import "../styles/DetalleDocumento.css";
import { API_URL } from "../../url.js";

export default function DocumentoDetalle() {
  const [documento, setDocumento] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const documentId = localStorage.getItem("documentId");
  const token = localStorage.getItem('token');

  if (!documentId) {
    setError("No se encontró el ID del documento en el localStorage.");
    setLoading(false);
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL+`/gradotitulos/vergradotitulo/${documentId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener el documento");
        }
        const data = await response.json();
        setDocumento(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [documentId, token]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(API_URL+`/gradotitulos/vergradotitulo/${documentId}/pdf`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener el PDF del documento");
        }
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [documentId, token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="documento-detalle">
      <h1>Detalle del Documento</h1>
      {documento && (
        <div className="documento-info">
          <p><strong>Nombre y Apellido:</strong> {documento.nombreapellido}</p>
          <p><strong>DNI:</strong> {documento.dni}</p>
          <p><strong>Fecha de Expedición:</strong> {documento.fechaexpedicion}</p>
          <p><strong>Facultad o Escuela:</strong> {documento.facultadescuela}</p>
          <p><strong>Grado o Título:</strong> {documento.gradotitulo}</p>
          <p><strong>ID de Resolución:</strong> {documento.idresolucion}</p>
        </div>
      )}
      <div className="pdf-viewer">
        {pdfUrl ? (
          <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
        ) : (
          <p>No se pudo cargar el PDF.</p>
        )}
      </div>
    </div>
  );
}
