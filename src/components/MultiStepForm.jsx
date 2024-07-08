import React, { useState } from "react";
import { Form, Input, Button, Steps, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const nextStep = async () => {
    try {
      if (step === 0) {
        await form.validateFields(["fname", "lname", "address", "phone"]);
      } else if (step === 1) {
        await form.validateFields(["email", "pass", "cpass"]);
      }
      setStep(step + 1);
    } catch (error) {
      // Handle validation error
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFinish = async (values) => {
    const { fname, lname, address, phone, email, pass } = values;
    const UsuarioRequest = {
      name: fname,
      lastname: lname,
      address,
      cargoid: 1,
      phone,
      username: email,
      password: pass,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/usuario/nuevousuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(UsuarioRequest),
        }
      );

      if (response.ok) {
        message.success("¡Usuario creado con éxito!");
        navigate("/perfil");
      } else {
        message.error("Hubo un problema al crear el usuario");
      }
    } catch (error) {
      message.error("Hubo un problema al crear el usuario");
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className="flex justify-center  h-screen pt-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Steps current={step} className="mb-6">
          <Step title="Detalles Personales" />
          <Step title="Crear tu cuenta" />
        </Steps>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            fname: "",
            lname: "",
            address: "",
            email: "",
            pass: "",
            cpass: "",
            phone: "",
          }}
        >
          {step === 0 && (
            <div className="mb-4">
              <Form.Item
                name="fname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu primer nombre",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lname"
                label="Last Name"
                rules={[
                  { required: true, message: "Por favor ingresa tu apellido" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Por favor ingresa tu dirección" },
                ]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu teléfono",
                    min: 9,
                    message: "Numero de telefono invalido",
                  },
                ]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </div>
          )}
          {step === 1 && (
            <div className="mb-4">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Por favor ingresa un email válido",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="pass"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa una contraseña",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="cpass"
                label="Confirm Password"
                dependencies={["pass"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor confirma tu contraseña",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("pass") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </div>
          )}
          <Form.Item className="text-right">
            {step > 0 && (
              <Button onClick={prevStep} className="mr-2">
                Anterior
              </Button>
            )}
            {step < 1 && (
              <Button type="primary" onClick={nextStep}>
                Siguiente
              </Button>
            )}
            {step === 1 && (
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MultiStepForm;
