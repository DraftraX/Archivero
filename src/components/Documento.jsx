import React, { useEffect, useState } from "react";
import "../styles/DetalleDocumento.css";

export default function DocumentoDetalle() {
  const [documento, setDocumento] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const documentId = localStorage.getItem("documentId");

  if (!documentId) {
    setError("No se encontró el ID del documento en el localStorage.");
    setLoading(false);
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/documentos/verdocumento/${documentId}`);
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
  }, []);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:8080/documentos/verdocumento/${documentId}/pdf`);
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
  }, [documentId]);

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
          <p><strong>NRO:</strong> {documento.nrodoc}</p>
          <p><strong>Título:</strong> {documento.titulo}</p>
          <p><strong>Estado:</strong> {documento.estado}</p>
          <p><strong>Fecha:</strong> {documento.fecha}</p>
          <p><strong>Duración:</strong> {documento.duracion}</p>
          <p><strong>Vencimiento:</strong> {documento.vencimiento}</p>
          <p><strong>Tipo de Criterio:</strong> {documento.tipocriterio}</p>
        </div>
      )}
      <div className="pdf-viewer">
        {pdfUrl && (
          <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
        )}
      </div>
    </div>
  );
}
