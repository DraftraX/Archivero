import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .email("Debe ingresar un correo válido")
    .min(1, "Ingrese su Usuario"),

  password: z.string().min(1, "Ingrese su contraseña"),
});

export function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChangeUsername = (value) => {
    setUsername(value);
    if (errors.username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: null,
      }));
    }
  };

  const handleChangePassword = (value) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: null,
      }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      loginSchema.parse(values); // Validate using zod schema
      setErrors({}); // Clear any previous errors

      const response = await axios.post("http://localhost:8080/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        message.success("Inicio de sesión exitoso");
        navigate("/perfil");
      } else {
        message.error("Credenciales incorrectas");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else if (axios.isAxiosError(error)) {
        console.error("Error en la solicitud:", error);
        message.error(
          "Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      } else {
        console.error("Error en el inicio de sesión:", error);
        message.error(
          "Hubo un problema desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500">
      <Row justify="center" className="w-full">
        <Col xl={8} lg={10} md={12} sm={20} xs={24}>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden lg:flex lg:max-w-4xl">
            <div className="lg:flex-1">
              <img
                className="h-full object-cover w-full lg:h-auto"
                src="https://unsm.edu.pe/wp-content/uploads/2018/05/archivero-unsm-2018.jpg"
                alt="Archivero UNSM"
              />
            </div>
            <div className="p-8 lg:flex-1 lg:p-12">
              <h2 className="text-2xl font-bold text-center text-gray-700">
                ARCHIVERO CENTRAL
              </h2>
              <Form onFinish={handleSubmit} layout="vertical" className="mt-6">
                <Form.Item
                  label="Usuario"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu correo electrónico",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Ingrese su usuario"
                    onChange={(e) => handleChangeUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs italic">
                      {errors.username}
                    </p>
                  )}
                </Form.Item>
                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu contraseña",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => handleChangePassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    Iniciar Sesión
                  </Button>
                </Form.Item>
              </Form>
              <div className="mt-4 text-center">
                <Link to={"/restore"} className="hover:text-green-500">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
