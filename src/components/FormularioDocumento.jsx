import React, { useState, useEffect } from 'react';
import '../styles/MultiStepForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const FormularioDocumento = () => {
  const navigate = useNavigate();

  const [Request, setRequest] = useState({
    nrodoc: '',
    titulo: '',
    estado: '',
    fecha: '',
    duracion: 0,
    vencimiento: '',
    idtipocriterio: 0,
    pdf: null,
  });

  const [criterios, setCriterios] = useState([]);

  useEffect(() => {
    const fetchCriterios = async () => {
      try {
        const response = await fetch('http://localhost:8080/tipocriterio/vercriterio/tipocriterios', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCriterios(data);
        } else {
          console.error('Error al obtener los criterios');
        }
      } catch (error) {
        console.error('Error al obtener los criterios:', error);
      }
    };

    fetchCriterios();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pdf' && files) {
      setRequest({ ...Request, pdf: files[0] });
    } else {
      setRequest({ ...Request, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nrodoc', Request.nrodoc);
    formData.append('titulo', Request.titulo);
    formData.append('estado', Request.estado);
    formData.append('fecha', Request.fecha);
    formData.append('duracion', Request.duracion);
    formData.append('vencimiento', Request.vencimiento);
    formData.append('idtipocriterio', Request.idtipocriterio);
    if (Request.pdf) {
      formData.append('pdf', Request.pdf);
    }

    try {
      const response = await fetch('http://localhost:8080/documentos/nuevodocumento', {
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
            name="nrodoc"
            placeholder="Número de Documento"
            value={Request.nrodoc}
            onChange={handleChange}
          />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={Request.titulo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={Request.estado}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fecha"
            placeholder="Fecha"
            value={Request.fecha}
            onChange={handleChange}
          />
          <input
            type="number"
            name="duracion"
            placeholder="Duración (días)"
            value={Request.duracion}
            onChange={handleChange}
          />
          <input
            type="date"
            name="vencimiento"
            placeholder="Fecha de Vencimiento"
            value={Request.vencimiento}
            onChange={handleChange}
          />
          <select
            name="idtipocriterio"
            value={Request.idtipocriterio}
            onChange={handleChange}
          >
            <option value="">Seleccione Tipo de Criterio</option>
            {criterios.map((criterio) => (
              <option key={criterio.mainid} value={criterio.mainid}>
                {criterio.criteryname}
              </option>
            ))}
          </select>
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
