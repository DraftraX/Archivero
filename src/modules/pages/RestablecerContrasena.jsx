import React from "react";
import '../../styles/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function RestablecerContrasena()
{
  return (
    <div className="vertical-layout 1-column navbar-sticky bg-full-screen-image footer-static blank-page light-layout centered">
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section className="row flexbox-container centered">
              <div className="col-xl-7 col-md-9 col-10 px-100">
                <div className="card bg-authentication mb-0">
                  <div className="row m-0">
                    <div className="col-md-6 col-12 px-0">
                      <div className="card disable-rounded-right mb-0 p-2">
                        <div className="card-header pb-1">
                          <div className="card-title">
                            <h4 className="text-center mb-2">¿Olvidaste tu Contraseña?</h4>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="text-muted text-center mb-2">
                            <small>Ingrese el correo electrónico con el cual te registraste</small>
                          </div>
                          <form className="mb-2" method="POST" action="/password/email">
                            <input type="hidden" name="_token" value="ezJFlViWvl32MiTep9EMLUI5xP7q5fvHoHxd7ZSu" />
                            <div className="form-group mb-2">
                              <label className="text-bold-600" htmlFor="email">Correo electrónico</label>
                              <input id="email" type="email" className="form-control" name="email" autoComplete="email" autoFocus placeholder="Email" />
                            </div>
                            <button type="submit" className="btn btn-primary glow position-relative" style={{ fontSize: '0.775rem' }}>
                              RECUPERAR MI CONTRASEÑA
                            </button>
                          </form>
                          <div className="text-center mb-2">
                            <a href="/login">
                              <small className="text-muted">Recuerdo mi contraseña</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 d-md-block d-none text-center align-self-center">
                      <img className="img-fluid" src="./unsm.png" alt="LOGO UNSM" width="500" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
