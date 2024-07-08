import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FormularioDocumento = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  const handleSubmit = async (values) => {
    const {
      nombreapellido,
      dni,
      fechaexpedicion,
      facultadescuela,
      gradotitulo,
      idresolucion,
    } = values;

    if (
      !nombreapellido ||
      !dni ||
      !fechaexpedicion ||
      !facultadescuela ||
      !gradotitulo ||
      !idresolucion
    ) {
      message.error("Todos los campos son obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("nombreapellido", nombreapellido);
    formData.append("dni", dni);
    formData.append("fechaexpedicion", fechaexpedicion);
    formData.append("facultadescuela", facultadescuela);
    formData.append("gradotitulo", gradotitulo);
    formData.append("idresolucion", idresolucion);
    if (file) {
      formData.append("pdf", file);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/gradotitulos/nuevogradotitulo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success("¡Documento creado con éxito!");
        navigate("/perfil");
      } else {
        message.error("¡Error al crear el documento!");
      }
    } catch (error) {
      message.error("¡Error al crear el documento!");
      console.error("Error al crear el documento:", error);
    }
  };

  return (
    <div className="flex justify-center  h-auto  pt-8">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Detalles del Documento
        </h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-flow-col-dense gap-4">
            <div>
              <Form.Item
                name="nombreapellido"
                label="Nombre y Apellido"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre y apellido",
                  },
                ]}
              >
                <Input placeholder="Nombre y Apellido" />
              </Form.Item>
              <Form.Item
                name="dni"
                label="DNI"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su DNI",
                    min: 8,
                    message: "Numero de documento incorrecto",
                    max: 8,
                    message: "Numero de documento incorrecto",
                  },
                ]}
              >
                <Input placeholder="DNI" />
              </Form.Item>
              <Form.Item
                name="gradotitulo"
                label="Grado o Título"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el grado o título",
                  },
                ]}
              >
                <Input placeholder="Grado o Título" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="fechaexpedicion"
                label="Fecha de Expedición"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de expedición",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="facultadescuela"
                label="Facultad o Escuela"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la facultad o escuela",
                  },
                ]}
              >
                <Input placeholder="Facultad o Escuela" />
              </Form.Item>
              <Form.Item
                name="idresolucion"
                label="ID de Resolución"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el ID de resolución",
                  },
                ]}
              >
                <Input placeholder="ID de Resolución" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="pdf"
            label="Archivo PDF"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            extra="Seleccione un archivo PDF"
          >
            <Upload
              name="pdf"
              accept="application/pdf"
              beforeUpload={() => false}
              onChange={handleChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir Archivo</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormularioDocumento;
