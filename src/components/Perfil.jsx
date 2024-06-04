import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let username;
  if (token) {
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const parsedPayload = JSON.parse(decodedPayload);
    
    username = parsedPayload.sub;
  } else {
    console.log('No se encontró ningún token en el almacenamiento local.');
  }

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    lastname: '',
    address: '',
    phone: '',
    fotoPerfil: '',
    cargoid: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/usuario/verusuarioporusername/${username}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username, token]);

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <div className="image-container">
                  <img 
                    src="https://iconos8.es/icon/Hj21JM30swCm/test-account"
                    alt="avatar"
                    className="rounded-circle img-fluid avatar" 
                  />
                </div>
                <h5 className="my-3">{userData.name}</h5>
                <p className="text-muted mb-1">{userData.cargoid}</p>
                <p className="text-muted mb-4">{userData.address}</p>
                <div className="d-flex justify-content-center mb-1">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/createdocument')}>Agregar documento</button>
                </div>
                <div className="d-flex justify-content-center mb-1">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/create')}>Crear usuario</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">LastName</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.lastname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p> {/* Agregado campo Phone */}
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.phone}</p> {/* Utiliza userData.phone para mostrar el teléfono */}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;
