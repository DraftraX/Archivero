import React, { useState } from 'react';
import '../styles/MultiStepForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
    address: '',
    email: '',
    pass: '',
    cpass: '',
    phone: '',
  });
  const navigate = useNavigate();

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    } else if (step === 2 && validateStep2()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const fotoPerfil = files[0];
      setFormValues({ ...formValues, fotoPerfil });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const validateStep1 = () => {
    const { fname, lname, address, phone } = formValues;
    if (!fname || !lname || !address || !phone) {
      Swal.fire('Error', 'Todos los campos son obligatorios en Detalles Personales', 'error');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { email, pass, cpass } = formValues;
    if (!email || !pass || !cpass) {
      Swal.fire('Error', 'Todos los campos son obligatorios en Crear tu cuenta', 'error');
      return false;
    }
    if (pass !== cpass) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(pass)) {
      Swal.fire('Error', 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const UsuarioRequest = {
        name: formValues.fname,
        lastname: formValues.lname,
        address: formValues.address,
        cargoid: 1,
        phone: formValues.phone,
        username: formValues.email,
        password: formValues.pass
      };

      const token = localStorage.getItem('token');

      console.log(UsuarioRequest);

      try {
        const response = await fetch('http://localhost:8080/usuario/nuevousuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(UsuarioRequest)
        });

        if (response.ok) {
          Swal.fire('¡Usuario creado con éxito!', '', 'success');
          navigate('/perfil');
        } else {
          Swal.fire('Error', 'Hubo un problema al crear el usuario', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al crear el usuario', 'error');
        console.error('Error al crear el usuario:', error);
      }
    }
  };

  return (
    <div>
      <form id="msform" onSubmit={handleSubmit}>
        <ul id="progressbar">
          <li className={step === 1 ? 'active' : ''}>Detalles Personales</li>
          <li className={step === 2 ? 'active' : ''}>Crear tu cuenta</li>
        </ul>
        <fieldset style={{ display: step === 1 ? 'block' : 'none' }}>
          <h2 className="fs-title">Detalles Personales</h2>
          <input 
            type="text" 
            name="fname" 
            placeholder="First Name" 
            value={formValues.fname} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="lname" 
            placeholder="Last Name" 
            value={formValues.lname} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            value={formValues.address} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="phone" 
            placeholder="Phone" 
            value={formValues.phone} 
            onChange={handleChange} 
          />
          <input type="button" className="next action-button" value="Next" onClick={nextStep} />
        </fieldset>
        <fieldset style={{ display: step === 2 ? 'block' : 'none' }}>
          <h2 className="fs-title">Crear tu cuenta</h2>
          <input 
            type="text" 
            name="email" 
            placeholder="Email" 
            value={formValues.email} 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="pass" 
            placeholder="Password" 
            value={formValues.pass} 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="cpass" 
            placeholder="Confirm Password" 
            value={formValues.cpass} 
            onChange={handleChange} 
          />
          <input type="button" className="previous action-button" value="Previous" onClick={prevStep} />
          <input type="submit" className="submit action-button" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default MultiStepForm;
