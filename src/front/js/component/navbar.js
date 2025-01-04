import React from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/navbar.css';

export const Navbar = () => {
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CreArte
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clases">Clases mensuales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bonos">Bonos regalo</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/private">Mi Perfil</Link>
              </li>
            )}
          </ul>

          <Link to="/carrito" className="btn btn-brown ms-2">
            <i className="fas fa-shopping-cart"></i> Carrito
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
              <Link to="/registro" className="btn btn-outline-secondary ms-2">Registrarse</Link>
            </>
          ) : (
            <button
              onClick={() => {
                sessionStorage.removeItem("token");
                window.location.reload(); 
              }}
              className="btn btn-outline-danger ms-2"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
