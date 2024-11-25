import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="contact-info">
					<h5>CreArte</h5>
					<p>Correo: hola@crearte.es</p>
					<p>Teléfono: +34 000 000 000</p>
				</div>

				<div className="social-links">
					<ul>
						<li><a href="#" className="facebook">Facebook</a></li>
						<li><a href="#" className="instagram">Instagram</a></li>
						<li><a href="#" className="twitter">Twitter</a></li>
					</ul>
				</div>

				<div className="legal-info">
					<p>© 2024 CreArte. Todos los derechos reservados.</p>
					<Link to="/politica-de-cookies">Política de cookies</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
