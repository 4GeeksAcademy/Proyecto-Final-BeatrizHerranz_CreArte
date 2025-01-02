import React from "react";
import { Link } from "react-router-dom";
import '../../styles/footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="contact-info">
					<p>Email: hola@crearte.es</p>
					<p>Teléfono: +34 000 000 000</p>
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
