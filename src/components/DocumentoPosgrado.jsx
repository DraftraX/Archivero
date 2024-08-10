import React, { useEffect, useState } from "react";
import { Spin, message, Divider } from "antd";
import { API_URL } from "../utils/ApiRuta";

export default function PosgradoDetalle() {
  const [documento, setDocumento] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const documentId = localStorage.getItem("documentId");
  const token = localStorage.getItem("token");

  if (!documentId) {
    setError("No se encontró el ID del documento en el localStorage.");
    setLoading(false);
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/posgrado/verposgrado/${documentId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener el documento");
        }
        const data = await response.json();
        setDocumento(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId, token]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(
          `${API_URL}/posgrado/verposgrado/${documentId}/pdf`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener el PDF del documento");
        }
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        setError(error.message);
        message.error("No se pudo cargar el PDF.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [documentId, token]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Detalle del Posgrado
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Divider orientation="left">Información del Posgrado</Divider>
          <div className="ant-descriptions">
            <div className="ant-descriptions-item">
              <div className="ant-descriptions-item-label">
                Nombre y Apellido:
              </div>
              <div className="ant-descriptions-item-content">
                {documento.nombreapellido}
              </div>
            </div>
            <div className="ant-descriptions-item">
              <div className="ant-descriptions-item-label">DNI:</div>
              <div className="ant-descriptions-item-content">
                {documento.dni}
              </div>
            </div>
            <div className="ant-descriptions-item">
              <div className="ant-descriptions-item-label">
                Fecha de Expedición:
              </div>
              <div className="ant-descriptions-item-content">
                {documento.fechaexpedicion}
              </div>
            </div>
            <div className="ant-descriptions-item">
              <div className="ant-descriptions-item-label">
                Maestría o Doctorado:
              </div>
              <div className="ant-descriptions-item-content">
                {documento.maestriadoctorado}
              </div>
            </div>
            <div className="ant-descriptions-item">
              <div className="ant-descriptions-item-label">
                ID de Resolución:
              </div>
              <div className="ant-descriptions-item-content">
                {documento.idresolucion}
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          {pdfUrl ? (
            <embed
              className="w-full h-full"
              src={pdfUrl}
              type="application/pdf"
            />
          ) : (
            <p>No se pudo cargar el PDF.</p>
          )}
        </div>
      </div>
    </div>
  );
}
