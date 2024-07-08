import React, { useState, useEffect } from "react";
import "../styles/MultiStepForm.css";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Upload,
  Space,
  Typography,
  Row,
  Col,
  Card,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_URL } from "../../url.js";
const { Option } = Select;
const { Title } = Typography;

const FormularioDocumento = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [Request, setRequest] = useState({
    nrodoc: "",
    titulo: "",
    estado: "",
    fecha: "",
    duracion: 0,
    tipoResolucion: "",
    idtipocriterio: "",
    pdf: null,
  });

  const [criterios, setCriterios] = useState([]);

  useEffect(() => {
    const fetchCriterios = async () => {
      try {
        const response = await fetch(
          API_URL+"/tipocriterio/vercriterio/tipocriterios",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCriterios(data);
        } else {
          console.error("Error al obtener los criterios");
        }
      } catch (error) {
        console.error("Error al obtener los criterios:", error);
      }
    };

    fetchCriterios();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "pdf" && files) {
      setRequest({ ...Request, pdf: files[0] });
    } else if (type === "checkbox") {
      setRequest({ ...Request, [name]: checked ? value : "" });
    } else {
      setRequest({ ...Request, [name]: value });
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Convert the values object to match the Zod schema
      const parsedValues = {
        ...values,
        duracion: Request.tipoResolucion === "Temporal" ? values.duracion : "",
        pdf: Request.pdf,
      };

      documentSchema.parse(parsedValues);

      const formData = new FormData();
      formData.append("nrodoc", values.nrodoc);
      formData.append("titulo", values.titulo);
      formData.append("estado", values.estado);
      formData.append("fecha", values.fecha);
      formData.append("tipoResolucion", values.tipoResolucion);
      if (values.tipoResolucion === "Temporal") {
        formData.append("duracion", values.duracion);
      }
      formData.append("idtipocriterio", values.idtipocriterio);
      if (Request.pdf) {
        formData.append("pdf", Request.pdf);
      }

      const response = await fetch(
        API_URL+"/resolucion/nuevaresolucion",
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
      if (error.errors) {
        error.errors.forEach((err) => {
          message.error(`¡Error al crear el documento! ${err.message}`);
        });
      } else {
        message.error(`¡Error al crear el documento! ${error.message}`);
      }
    }
  };

  return (
    <div className="h-full">
      <Card style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Formulario de Documento
        </Title>
        <Form
          id="msform"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={Request}
        >
          <div className="grid grid-flow-col-dense gap-4">
            <div>
              <Form.Item
                label="Número de Documento"
                name="nrodoc"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar su Número de documento",
                  },
                ]}
              >
                <Input placeholder="Número de Documento" />
              </Form.Item>
              <Form.Item
                label="Estado"
                name="estado"
                rules={[{ required: true, message: "Debe ingresar un estado" }]}
              >
                <Input placeholder="Estado" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Título"
                name="titulo"
                rules={[{ required: true, message: "Debe ingresar un título" }]}
              >
                <Input placeholder="Título" />
              </Form.Item>
              <Form.Item
                label="Fecha"
                name="fecha"
                rules={[{ required: true, message: "Debe ingresar una fecha" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Tipo de Resolución"
            name="tipoResolucion"
            rules={[
              {
                required: true,
                message: "Debe seleccionar un tipo de resolución",
              },
            ]}
          >
            <Checkbox.Group
              onChange={(checkedValues) => {
                const tipoResolucion = checkedValues.includes("Temporal")
                  ? "Temporal"
                  : "Permanente";
                setRequest({ ...Request, tipoResolucion });
              }}
            >
              <Row>
                <Col span={12}>
                  <Checkbox value="Permanente">Permanente</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="Temporal">Temporal</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          {Request.tipoResolucion === "Temporal" && (
            <Form.Item
              label="Duración (años)"
              name="duracion"
              rules={[
                { required: true, message: "Debe ingresar una duración" },
                {
                  type: "number",
                  min: 1,
                  message: "La duración debe ser mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Duración (años)" />
            </Form.Item>
          )}
          <Form.Item
            label="Tipo de Criterio"
            name="idtipocriterio"
            rules={[
              { required: true, message: "Debe seleccionar un criterio" },
            ]}
          >
            <Select placeholder="Seleccione Tipo de Criterio">
              <Option value="">Seleccione Tipo de Criterio</Option>
              {criterios.map((criterio) => (
                <Option key={criterio.mainid} value={criterio.mainid}>
                  {criterio.criteryname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="PDF" name="pdf">
            <Upload
              accept="application/pdf"
              beforeUpload={(file) => {
                setRequest({ ...Request, pdf: file });
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Subir PDF</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
              <Button type="default" onClick={() => navigate("/perfil")}>
                Cancelar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FormularioDocumento;
