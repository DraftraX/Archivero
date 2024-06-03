import React, { useState } from "react";
import { Username, Password } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "../../styles/IniciarSesion.css";

export function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRequest = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token;
        localStorage.setItem('token', token);

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/perfil');
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: 'Por favor, verifica tus credenciales e intenta nuevamente.'
        });
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  };

  return (
    <form className="Login bg-green-400" onSubmit={handleSubmit}>
      <div className="formato grid grid-cols-2 bg-gray-100 mx-20">
        <div className="h-full">
          <img
            className="h-full"
            src="https://unsm.edu.pe/wp-content/uploads/2018/05/archivero-unsm-2018.jpg"
            alt="Archivero UNSM"
          />
        </div>
        <div className="form">
          <h2 className="text-center pb-6">ARCHIVERO CENTRAL</h2>
          <Username value={username} onChange={(e) => setUsername(e.target.value)} />
          <Password value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to={"/restore"}>
            <h3 className="text-end pb-5">¿Olvidaste tu contraseña?</h3>
          </Link>
          <div className="px-4">
            <button className="boton bg-green-400 p-5" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
