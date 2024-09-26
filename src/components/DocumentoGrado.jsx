import React, { useEffect, useState } from "react";
import { Spin, message, Divider, Card, Descriptions } from "antd";
import { API_URL } from "../utils/ApiRuta";
import "../styles/VerDocumento.css";

export default function DocumentoDetalle() {
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
          `${API_URL}/gradotitulos/vergradotitulo/${documentId}`,
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
          `${API_URL}/gradotitulos/vergradotitulo/${documentId}/pdf`,
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
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className=" max-w-full h-full p-8 bg-gray-50 shadow-lg rounded-lg mt-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Detalle del Documento
      </h1>
      <div className="division gap-8">
        {/* Información del Documento */}
        <Card bordered={false} className="shadow-lg">
          <Divider orientation="left">
            <h2 className="text-2xl font-semibold">
              Información del Documento
            </h2>
          </Divider>
          <Descriptions bordered column={1} labelStyle={{ fontWeight: "bold" }}>
            <Descriptions.Item label="Nombre y Apellido">
              {documento.nombreapellido}
            </Descriptions.Item>
            <Descriptions.Item label="DNI">{documento.dni}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Expedición">
              {documento.fechaexpedicion}
            </Descriptions.Item>
            <Descriptions.Item label="Facultad o Escuela">
              {documento.facultadescuela}
            </Descriptions.Item>
            <Descriptions.Item label="Grado o Título">
              {documento.gradotitulo}
            </Descriptions.Item>
            <Descriptions.Item label="ID de Resolución">
              {documento.idresolucion}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* PDF del Documento */}
        <Card bordered={false} className="shadow-lg">
          <Divider orientation="left">
            <h2 className="text-2xl font-semibold">Documento en PDF</h2>
          </Divider>
          <div className="border border-gray-300 rounded-lg h-96 overflow-hidden">
            {pdfUrl ? (
              <embed
                className="w-full h-full"
                src={pdfUrl}
                type="application/pdf"
              />
            ) : (
              <p className="text-center text-gray-500">
                No se pudo cargar el PDF.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
