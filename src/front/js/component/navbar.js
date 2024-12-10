import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ store }) => {

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
					</ul>

					<Link to="/cart" className="btn btn-outline-dark cart-button">
						<i className="fas fa-shopping-cart"></i>
					</Link>

					<Link to="/login" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
					<Link to="/registro" className="btn btn-outline-secondary ms-2">Registrarse</Link>
				</div>
			</div>
		</nav>
  );
};

export default Navbar;