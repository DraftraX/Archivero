import React, { useState } from 'react';
import '../styles/MultiStepForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FormularioDocumento = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [Request, setRequest] = useState({
    nombreapellido: '',
    dni: '',
    fechaexpedicion: '',
    facultadescuela: '',
    gradotitulo: '',
    idresolucion: '',
    pdf: null,
  });

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pdf' && files) {
      setRequest({ ...Request, pdf: files[0] });
    } else {
      setRequest({ ...Request, [name]: value });
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const { nombreapellido, dni, fechaexpedicion, facultadescuela, gradotitulo, idresolucion } = Request;

    if (!nombreapellido || !dni || !fechaexpedicion || !facultadescuela || !gradotitulo || !idresolucion) {
      Swal.fire("Todos los campos son obligatorios", "", "error");
      return false;
    }

    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('nombreapellido', Request.nombreapellido);
    formData.append('dni', Request.dni);
    formData.append('fechaexpedicion', Request.fechaexpedicion);
    formData.append('facultadescuela', Request.facultadescuela);
    formData.append('gradotitulo', Request.gradotitulo);
    formData.append('idresolucion', Request.idresolucion);
    if (Request.pdf) {
      formData.append('pdf', Request.pdf);
    }

    try {
      const response = await fetch('http://localhost:8080/gradotitulos/nuevogradotitulo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire("¡Documento creado con éxito!", "", "success");
        navigate("/perfil");
      } else {
        Swal.fire("¡Error al crear el documento!", "", "error");
      }
    } catch (error) {
      Swal.fire("¡Error al crear el documento!", "", "error");
      console.error('Error al crear el documento:', error);
    }
  };

  return (
    <div>
      <form id="msform" onSubmit={handleSubmit}>
        <fieldset>
          <h2 className="fs-title">Detalles del Documento</h2>
          <input
            type="text"
            name="nombreapellido"
            placeholder="Nombre y Apellido"
            value={Request.nombreapellido}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={Request.dni}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fechaexpedicion"
            placeholder="Fecha de Expedición"
            value={Request.fechaexpedicion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultadescuela"
            placeholder="Facultad o Escuela"
            value={Request.facultadescuela}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gradotitulo"
            placeholder="Grado o Título"
            value={Request.gradotitulo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="idresolucion"
            placeholder="ID de Resolución"
            value={Request.idresolucion}
            onChange={handleChange}
          />
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleChange}
          />
          <input type="submit" className="submit action-button" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default FormularioDocumento;
